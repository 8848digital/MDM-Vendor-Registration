import frappe
import requests
@frappe.whitelist(allow_guest=True)
def get_data(cin_number):
    url = 'https://apihub-api.trusthub.in/cin-validation'
    headers = {
		'accept': 'application/json',
		'x-api-key': '9LiSSYRnzkac4UMy5PepF7TjXiUE0E9M4aD4orIR',
		'Content-Type': 'application/json',
    }
    data = {
		'cin': cin_number,
        "client_ref_num": "129",
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()