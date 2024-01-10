import frappe
import re


@frappe.whitelist(allow_guest=True)
def register_user(email,name,mobile_no,new_password):
    doc=frappe.new_doc("User")
    doc.email=email
    doc.first_name=name
    doc.mobile_no=mobile_no
    doc.new_password=new_password
    doc.insert(ignore_permissions=True)
