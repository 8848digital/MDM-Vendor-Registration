# Copyright (c) 2024, chintan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries
import requests
class SMSGatewayProvider(Document):
    def validate(self):
        settings=frappe.get_doc('MDM Settings')
        if self.sms_provider=="Twilio":
            api_url=settings.host_url+'Sms Gateway Provider'
            post_data={
            "customer_name":self.customer_name,
            "account_sid":self.account_sid,
            "auth_token":self.auth_token,
            "twilio_phone_number":self.twilio_phone_number,
            "twilio_api_url":self.twilio_api_url,
        }
        server_url=settings.host_url+'Access Token/Access Token'
        response=requests.get(server_url)
        data = response.json()['data']
        key=data['api_key']
        token1=data['api_token']
        headers={
            'Authorization': f'token {key}:{token1}'
        }
        post_response = requests.post(api_url, json=post_data,headers=headers)
    

