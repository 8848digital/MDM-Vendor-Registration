# Copyright (c) 2024, chintan and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries
import requests
class SMSGatewayProvider(Document):
    def validate(self):
        print(self.sms_provider)
        if self.sms_provider=="Twilio":
            print("Twilio")
            settings=frappe.get_doc('MDM Settings')
            api_url=settings.host_url+'Sms Gateway Provider'
            post_data={
            "customer_name":self.customer_name,
            "account_sid":self.account_sid,
            "auth_token":self.auth_token,
            "twilio_phone_number":self.twilio_phone_number,
            "twilio_api_url":self.twilio_api_url,
        }
        print(post_data)
        server_url='http://172.24.141.217:8001/api/resource/Access Token/Access Token'
        response=requests.get(server_url)
        data = response.json()['data']
        key=data['api_key']
        token1=data['api_token']
        headers={
            'Authorization': f'token {key}:{token1}'
        }
        print(headers)
        post_response = requests.post(api_url, json=post_data,headers=headers)
        print(post_response)
    

