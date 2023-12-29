import frappe
import re
import json 
import random
@frappe.whitelist(allow_guest=True)
def send_otp(email):
    data=generate_otp(email)
    return data

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