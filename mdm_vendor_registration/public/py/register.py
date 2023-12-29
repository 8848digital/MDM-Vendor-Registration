import frappe
import re

@frappe.whitelist(allow_guest=True)
def register_user(email,name):
    doc=frappe.new_doc("User")
    doc.email=email
    doc.first_name=name
    doc.save()