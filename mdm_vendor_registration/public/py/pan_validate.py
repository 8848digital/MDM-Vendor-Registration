import frappe
import re
import requests
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
def get_pan_data(pan_number):
    val = isValidPanCardNo(pan_number)
    mdm_settings_doc = frappe.get_doc("MDM Settings")
    if val:
        if mdm_settings_doc.validate_pan_from_sandbox:
            pan_data = get_pan_data_from_sandbox(pan_number)
            return {"from_sandbox": 1, "settings":mdm_settings_doc, 'pan_data' : pan_data}
        elif mdm_settings_doc.validate_pan_from_transbank:
            pan_data = get_pan_data_from_transbank(pan_number)
            return {"from_transbank": 1, "settings":mdm_settings_doc, 'pan_data' : pan_data}
        else:
            frappe.throw("Please tick the checkbox to verify PAN details in MDM Settings");
    else:
        return frappe.throw("Not a Valid PAN Number")		



@frappe.whitelist()
def get_pan_data_from_sandbox(pan_number):
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

@frappe.whitelist()
def get_pan_data_from_transbank(pan_number):
	url = 'https://apihub-api.trusthub.in/pan-details'
	headers = {
		'accept': 'application/json',
		'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
		'Content-Type': 'application/json',
	}
	data = {
		'isUserConsent': 'y',
		'panId': 'AOBBN3836L',
	}
	response = requests.post(url, headers=headers, json=data)
	return response.json()
