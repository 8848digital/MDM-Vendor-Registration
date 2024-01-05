# # Copyright (c) 2024, chintan and contributors
# # For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SupplierInvitation(Document):
	pass

# def on_save():
#     pass

@frappe.whitelist(allow_guest=True)
def send_inv_to_email(username):
    data = send_mail("Email Invitation", [username], {'email': username})
    print("generate otp    ",data)
    return data


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