frappe.ready(function() {
var customBtn = $('<button class="custom-btn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify PAN</button>');
var panLabel = $('.label-area:contains("PAN Applicable")');
var labelContainer = panLabel.parent();
labelContainer.append(customBtn);
$('.custom-btn').on('click', function(event) {
	event.preventDefault();
	frappe.call({
		method: 'mdm_vendor_registration.public.py.pan_validate.get_check',
		callback: function(response) {
			var fetchCompanyNameBasedOnPan = response.message;
			if (fetchCompanyNameBasedOnPan == 1) {
				var pan_number = frappe.web_form.get_value('pan_number');
				if (pan_number) {
					frappe.call({
						method: 'mdm_vendor_registration.public.py.pan_validate.get_data',
						args: {
							pan_number: pan_number
						},
						callback: function(response) {
							if (response.message === false) {
								frappe.msgprint("PAN number not valid");
							} 
							else {
								var data= response.message.data;
								frappe.web_form.set_value('persons_name', data.full_name);
								frappe.web_form.set_value('company_type_as_per_pan', data.category);
							}
						}
					});
				} 
				else {
					frappe.msgprint("PAN number must be entered");
				}
			} 
			else {
				frappe.msgprint("Please tick the checkbox to verify PAN details");
			}
		}
	});
});


var verify_gst_btn = $('<button class="verify_gst_btn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify GST</button>');
var panLabel = $('.label-area:contains("GST Applicable")');
var labelContainer = panLabel.parent();
labelContainer.append(verify_gst_btn);

$('.verify_gst_btn').on('click', function(event) {
	event.preventDefault();
	var gst_number = frappe.web_form.get_value('gst_number');
	console.log(gst_number)
	frappe.call({
		method: 'mdm_vendor_registration.public.py.gst_data.get_gst_data',
		args: {
			gst_number: gst_number
		},
		callback: function(response) {
			console.log(response.message.setting)
			console.log(response.message.response)

			if (response.message.response.code == 200) {
				var setting = response.message.setting
				var gst_data = response.message.response.data
				console.log("hello")
				if (setting.validate_gst_number){
					frappe.web_form.set_value('gst_valid_from', gst_data.rgdt);
					frappe.web_form.set_value('gst_valid_till', gst_data.cxdt);
					frappe.web_form.set_value('gstn_status', gst_data.sts);
					if(setting.fetch_party_name_based_on_gstin){
						frappe.web_form.set_value('name_of_business', gst_data.lgnm);
						frappe.web_form.set_value('gst_category', gst_data.dty);
					}	
					if(setting.fetch_address_based_on_gstin){
						frappe.web_form.set_value('regd_address_as_per_gstin', gst_data.pradr.addr.bno.concat(" ", 
						gst_data.pradr.addr.flno, " ", 
						gst_data.pradr.addr.bnm, "\n",
						gst_data.pradr.addr.st, "\n",
						gst_data.pradr.addr.loc, "\n",
						gst_data.pradr.addr.dst, "\n",
						gst_data.pradr.addr.stcd, "\n",
						gst_data.pradr.addr.pncd, "\n"))
					}
				}
			}
			else{
				frappe.msgprint(response.message.response.message)
			}
			

			// var fetchCompanyNameBasedOnPan = response.message;
			// if (fetchCompanyNameBasedOnPan == 1) {
			// 	var pan_number = frappe.web_form.get_value('pan_number');
			// 	if (pan_number) {
			// 		frappe.call({
			// 			method: 'mdm_vendor_registration.public.py.gst_data.get_data',
			// 			args: {
			// 				pan_number: pan_number
			// 			},
			// 			callback: function(response) {
			// 				if (response.message === false) {
			// 					frappe.msgprint("PAN number not valid");
			// 				} 
			// 				else {
			// 					var data= response.message.data;
			// 					frappe.web_form.set_value('persons_name', data.full_name);
			// 					frappe.web_form.set_value('company_type_as_per_pan', data.category);
			// 				}
			// 			}
			// 		});
			// 	} 
			// 	else {
			// 		frappe.msgprint("PAN number must be entered");
			// 	}
			// } 
			// else {
			// 	frappe.msgprint("Please tick the checkbox to verify PAN details");
			// }
		}
	});
});


});
