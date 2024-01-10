import frappe
import json
import requests
@frappe.whitelist(allow_guest=True)
def response_logger(doc_type, doc_name, site_name, user_name, payload, api, headers, response_data):
        response = json.dumps(response_data, indent=4, sort_keys=False, default=str)
        headers_data = json.dumps(headers, indent=4, sort_keys=False, default=str)
        payload_data = json.dumps(payload, indent=4, sort_keys=False, default=str)  
        post_data = {
            "document_type": doc_type,
            "document_name": doc_name,
            "site_name": site_name,
            "user_name": user_name,
            "parameters":payload_data,
            "api": api,
            "request":headers_data,
            "response": response
            }
        settings=frappe.get_doc('MDM Settings')
        server_url=settings.host_url
        api_url = server_url+'Sandbox Api Log'
        post_response = requests.post(api_url, json=post_data)