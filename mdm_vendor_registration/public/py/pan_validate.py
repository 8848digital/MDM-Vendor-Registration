import frappe
import re
import requests
import json
from frappe import _
from .access_token import get_access_token 

@frappe.whitelist(allow_guest=True)
def isValidPanCardNo(panCardNo):
	regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}"
	p = re.compile(regex)
	if panCardNo is None:
		return False
	if re.search(p, panCardNo) and len(panCardNo) == 10:
		return True
	else:
		return False

@frappe.whitelist(allow_guest=True)
def get_data(pan_number):
	val = isValidPanCardNo(pan_number)
	if val:
		sandbox_settings=frappe.get_doc('Sandbox Settings')
		url=sandbox_settings.auth_url+"kyc/pan"
		x_api_key=sandbox_settings.x_api_key
		x_api_secret=sandbox_settings.x_api_secret
		x_api_version=sandbox_settings.x_api_version
		access_token = get_access_token(x_api_key, x_api_secret,sandbox_settings.auth_url,x_api_version)
		headers = {
            'Authorization': access_token['access_token'],
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-api-key': x_api_key,
            'x-api-version': x_api_version
			}
		data = {
            "pan": pan_number,
            "consent": "y",
            "reason": "For Validation"
			}
		response = requests.post(url, json=data, headers=headers)
		return response.json()

@frappe.whitelist(allow_guest=True)
def get_check():
	d = frappe.get_doc("MDM Settings")
	return d.fetch_company_name_based_on_pan