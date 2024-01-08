import frappe
import re
import requests
import json
from frappe import _
from .access_token import get_access_token
from .logs import response_logger 

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
	if val==True:
		settings=frappe.get_doc('MDM Settings')
		server_url=settings.host_url
		server_url=server_url+'Sandbox Settings/Sandbox Settings'
		response1 = requests.get(server_url)
		data = response1.json()['data']
		url=data['auth_url']+"kyc/pan"
		x_api_key=data['x_api_key']
		x_api_secret= data['x_api_secret']
		x_api_version=data['x_api_version']
		access_token = get_access_token(x_api_key, x_api_secret,data['auth_url'],x_api_version)
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
		user_name=frappe.session.user
		site_name='demo_com'
		response = requests.post(url, json=data, headers=headers)
		response_logger("Pan Verfication",'Sandbox Api Log',site_name,user_name,data,"Pan",headers, response)
		
		return response.json()
	else:
		return False

@frappe.whitelist(allow_guest=True)
def get_check():
	d = frappe.get_doc("MDM Settings")
	return d.fetch_company_name_based_on_pan