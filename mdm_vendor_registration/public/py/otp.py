import frappe
import re
import json 
import random
import requests

@frappe.whitelist(allow_guest=True)
def send_sms(to):
    twilio_details=frappe.get_doc('Twilio Sms Settings')
    account_sid=twilio_details.account_sid
    auth_token=twilio_details.auth_token
    twilio_phone_number=twilio_details.twilio_phone_number
   
    otp_length = 6
    otp = "".join([f"{random.randint(0, 9)}" for _ in range(otp_length)])
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = {
        'To': to,
        'From': twilio_phone_number,
        'Body': f'Your Otp is {otp}',
    }
    auth = (account_sid, auth_token)

    response = requests.post(twilio_api_url, headers=headers, data=data, auth=auth)

    if response.status_code == 201:
        frappe.msgprint(f"SMS sent: {response.json().get('sid')}")
        return {"OTP":otp}
    else:
        frappe.msgprint(f"Failed to send SMS: {response.status_code}, {response.text}")

@frappe.whitelist(allow_guest=True)
def send_otp(email):
    verify_email= "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
    print("email",email)
    if re.match(verify_email,email):
        data=generate_otp(email)
        return data
    else:
        return "Email Not Valid"
   
   

@frappe.whitelist(allow_guest=True)
def generate_otp(username, otp=None):
    """
    Generate OTP For a user
    """
    try:
        if not otp:
            otp_length = 6
            otp = "".join([f"{random.randint(0, 9)}" for _ in range(otp_length)])
        if not username:
            frappe.throw(frappe._("NOEMAIL"), exc=LookupError)
        key = f"{username}_otp"
        otp_json = {
            "id": key,
            "otp": otp,
            "timestamp": str(frappe.utils.get_datetime().utcnow()),
        }
        rs = frappe.cache()
        rs.set_value(key, json.dumps(otp_json))
        data = send_otp_to_email(username, otp)
        return data
    except Exception as e:
        frappe.logger("otp").exception(e)
        return {"error": e}


@frappe.whitelist(allow_guest=True)
def send_otp_to_email(username, otp):
    # Params For Send Mail- template_name, recipients(list), context(dict)
    return send_mail("Send OTP", [username], {'otp': otp})


@frappe.whitelist(allow_guest=True)
def check_user_exists(email):
    """
    Check if a user with the provied Email. exists
    """
    return frappe.db.exists('User', email)

@frappe.whitelist(allow_guest=True)
def send_mail(template_name, recipients, context):
    frappe.sendmail(
        recipients=recipients,
        subject=frappe.render_template(
            frappe.db.get_value(
                "Email Template", template_name, "subject"
            ),
            context,
        ),
        cc="",
        bcc="",
        delayed=False,
        message=frappe.render_template(
            frappe.db.get_value(
                "Email Template", template_name, "response"
            ),
            context,
        ),
        reference_doctype="",
        reference_name="",
        attachments="",
        print_letterhead=False,
    )
  
    return {"email":recipients,"Context":context}