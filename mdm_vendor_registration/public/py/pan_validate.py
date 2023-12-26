import frappe
import re

@frappe.whitelist(allow_guest=True)
def isValidPanCardNo(panCardNo):
	regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
	p = re.compile(regex)
	if(panCardNo == None):
		return False
	if(re.search(p, panCardNo) and
	len(panCardNo) == 10):
		return True
	else:
		return False

@frappe.whitelist(allow_guest=True)
def get_data(pan_number):
    print("vAL",pan_number)
    val=isValidPanCardNo(pan_number)
    print(val)
    return val

@frappe.whitelist(allow_guest=True)
def get_check():
    d=frappe.get_doc("MDM Settings")
    print(d.fetch_company_name_based_on_pan,"d")
    return d.fetch_company_name_based_on_pan