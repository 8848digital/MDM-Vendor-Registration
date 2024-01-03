import frappe
import requests
@frappe.whitelist(allow_guest=True)
def get_access_token(x_api_key, x_api_secret,url,x_api_version):
	try:
		key = x_api_key
		secret = x_api_secret
		url=url+'authenticate'
		headers = {
            'accept': 'application/json',
            'x-api-key': key,
            'x-api-secret': secret,
            'x-api-version':x_api_version
			}
		response = requests.request("POST", url, headers=headers)
		data = response.json()
		access_token = data['access_token']
		return {'status': 'success', 'access_token': access_token}
	except Exception as e:
		return {'status': 'error', 'message': str(e)}
