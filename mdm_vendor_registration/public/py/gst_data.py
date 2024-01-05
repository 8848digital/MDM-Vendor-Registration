import frappe
import requests
import re
import json
from .access_token import get_access_token 

@frappe.whitelist()
def get_gst_data(gst_number):
    val = isValidGST(gst_number)
    mdm_setting_doc = frappe.get_doc("MDM Settings")
    
    if val:
        sandbox_settings=frappe.get_doc('Sandbox Settings')
        
        url=sandbox_settings.auth_url+f"gsp/public/gstin/{gst_number}"
        
        x_api_key=sandbox_settings.x_api_key
        x_api_secret=sandbox_settings.x_api_secret
        x_api_version=sandbox_settings.x_api_version
        access_token = get_access_token(x_api_key, x_api_secret,sandbox_settings.auth_url,x_api_version)
        
        headers = {
            'Authorization': access_token["access_token"],
            'x-api-key': x_api_key,
            'x-api-version': x_api_version
        }
        response = requests.request("GET", url, headers=headers)
        print({"setting": mdm_setting_doc, "response" : response.json()})
        return {"setting": mdm_setting_doc, "response" : response.json()}
    else:
        return frappe.throw("Not a Valid GST Number")
    

def isValidGST(gst_number):
    regex = "^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}[CZ]{1}[0-9a-zA-Z]{1}$|^[0-9]{4}[a-zA-Z]{3}[0-9]{5}[uUnN]{2}[0-9a-zA-Z]{1}$"
    gst = re.compile(regex)
    if(re.match(gst, gst_number)):
        return True
    else:
        return False
