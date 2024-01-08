import frappe
import requests
import re
from .access_token import get_access_token 

@frappe.whitelist()
def get_gst_data(gst_number):
    val = isValidGST(gst_number)
    mdm_setting_doc = frappe.get_doc("MDM Settings")
    if val:
        if mdm_setting_doc.validate_gst_from_sandbox:
            gst_data = get_gst_data_from_sandbox(gst_number,mdm_setting_doc)
            return {"from_sandbox": 1, "settings":mdm_setting_doc, 'gst_data' : gst_data}
        elif mdm_setting_doc.validate_gst_from_transbank:
            gst_data = get_gst_data_from_transbank(gst_number)
            return {"from_transbank": 1, "settings":mdm_setting_doc, 'gst_data' : gst_data}
        else:
            frappe.throw("Please tick the checkbox to verify GST details in MDM Settings")
    else:
        return frappe.throw("Not a Valid GST Number")	

def get_gst_data_from_sandbox(gst_number,mdm_setting_doc):
    server_url=mdm_setting_doc.host_url
    server_url=server_url+'Sandbox Settings/Sandbox Settings'
    response = requests.get(server_url)
    data = response.json()['data']
    url=data['auth_url']+"gsp/public/gstin/{gst_number}"
    x_api_key=data['x_api_key']
    x_api_secret= data['x_api_secret']
    x_api_version=data['x_api_version']
    access_token = get_access_token(x_api_key, x_api_secret,data['auth_url'],x_api_version)
    
    headers = {
        'Authorization': access_token["access_token"],
        'x-api-key': x_api_key,
        'x-api-version': x_api_version
    }
    response = requests.request("GET", url, headers=headers)
    return response.json()

@frappe.whitelist()
def get_gst_data_from_transbank(gst_number):
	url = 'https://apihub-api.trusthub.in/gstin-validation'
	headers = {
		'accept': 'application/json',
		'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
		'Content-Type': 'application/json',
	}
	data = {
		"client_ref_num": "123",
        "gstin": "27AAACR5055K1Z7"
	}
	response = requests.post(url, headers=headers, json=data)
	return response.json()
   

def isValidGST(gst_number):
    regex = "^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[CZ]{1}[0-9a-zA-Z]{1}$|^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[uUnN]{2}[0-9a-zA-Z]{1}$"
    gst = re.compile(regex)
    if(re.match(gst, gst_number)):
        return True
    else:
        return False
