frappe.ready(function() {
	var customBtn = $('<button class="custom-btn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify PAN</button>');
	var panLabel = $('.label-area:contains("PAN Applicable")');
	var labelContainer = panLabel.parent();
	frappe.web_form.set_value('pan_applicable',1);
	frappe.web_form.set_value('pan_applicable',0);
	labelContainer.append(customBtn);
	$('.custom-btn').on('click', function(event) {
		event.preventDefault();
		var pan_number = frappe.web_form.get_value('pan_number');
		if (pan_number){
			frappe.call({
				method: 'mdm_vendor_registration.public.py.pan_validate.get_pan_data',
				args: {
					pan_number: pan_number
				},
				callback: function(response) {
					from_sandbox = response.message.from_sandbox
					from_transbank = response.message.from_transbank
					settings = response.message.settings
					pan_data = response.message.pan_data
					
					if(from_sandbox){
						if(settings.fetch_company_name_based_on_pan == 1){
							frappe.web_form.set_value('pan_verified',1);
							frappe.web_form.set_value('persons_name', pan_data.full_name);
							frappe.web_form.set_value('company_type_as_per_pan', pan_data.category);
						}
					}
					else if(from_transbank){
						if(settings.fetch_company_name_based_on_pan == 1){
							if (pan_data.data.category === 'person') {
									var category = 'Individual';
								}
							frappe.web_form.set_value('pan_verified',1);
							frappe.web_form.set_value('persons_name', pan_data.data.full_name);
							frappe.web_form.set_value('company_type_as_per_pan', category);
						}
					}
				}
			});
		}
		else{
			frappe.msgprint("PAN number must be entered");
		}
	});


	var verify_gst_btn = $('<button class="verify_gst_btn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify GST</button>');
	var panLabel = $('.label-area:contains("GST Applicable")');
	var labelContainer = panLabel.parent();
	labelContainer.append(verify_gst_btn);
	frappe.web_form.set_value('gst_applicable',1);
	frappe.web_form.set_value('gst_applicable',0);

	$('.verify_gst_btn').on('click', function(event) {
		event.preventDefault();
		var gst_number = frappe.web_form.get_value('gst_number');
		if(gst_number){
			frappe.call({
				method: 'mdm_vendor_registration.public.py.gst_data.get_gst_data',
				args: {
					gst_number: gst_number
				},
				callback: function(response) {
					from_sandbox = response.message.from_sandbox
					from_transbank = response.message.from_transbank
					settings = response.message.settings
					gst_data = response.message.gst_data
					if(from_sandbox){
						if (response.message.response.code == 200) {
							frappe.web_form.set_value('gst_verified',1);
							frappe.web_form.set_value('gst_valid_from', gst_data.rgdt);
							frappe.web_form.set_value('gst_valid_till', gst_data.cxdt);
							frappe.web_form.set_value('gstn_status', gst_data.sts);
							frappe.web_form.set_value('gst_verified',1);
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
								frappe.web_form.set_value('address_line_1', gst_data.pradr.addr.bno.concat(", ", 
															gst_data.pradr.addr.flno, ", ", 
															gst_data.pradr.addr.bnm))
								frappe.web_form.set_value('address_line_2', gst_data.pradr.addr.st.concat(" ", 
															gst_data.pradr.addr.flno, " ", 
															gst_data.pradr.addr.loc))
								frappe.web_form.set_value('district', gst_data.pradr.addr.dst)
								frappe.web_form.set_value('state', gst_data.pradr.addr.stcd)
								frappe.web_form.set_value('pincode', gst_data.pradr.addr.pncd)
							}	
						}
						else{
							frappe.msgprint(response.message.response.message)
						}
					}
					else if(from_transbank){
						console.log(response.message)
						var basic_gst_data = gst_data.result.taxpayerDetails
						// var inputDate = basic_gst_data.rgdt;
						// console.log(typeof(inputDate))
						// // Split the date string into day, month, and year
						// var parts = inputDate.split('/');
						// var day = parts[1];
						// var month = parts[0];
						// var year = parts[2];

						// // Create a new formatted date string
						// var formattedDate = day + '-' + month + '-' + year;
						// // Formatted date string
						// // var formattedDate = "07-01-2017";

						// // Split the formatted date string into day, month, and year
						// var parts = formattedDate.split('-');
						// var day = parts[0];
						// var month = parts[1] - 1; // Month in JavaScript Date object is zero-indexed
						// var year = parts[2];

						// // Create a new Date object
						// var dateObject = new Date(year, month, day);

						// console.log(dateObject);
						// console.log(formattedDate);
						// frappe.web_form.set_value('gst_valid_from', dateObject);
						// frappe.web_form.set_value('gst_valid_till', basic_gst_data.cxdt);
						frappe.web_form.set_value('gstn_status', basic_gst_data.sts);
						frappe.web_form.set_value('gst_verified',1);

						if(settings.fetch_party_name_based_on_gstin){
							frappe.web_form.set_value('name_of_business', basic_gst_data.lgnm);
							frappe.web_form.set_value('gst_category', basic_gst_data.dty);
						}	
						// if(setting.fetch_address_based_on_gstin){
						// 	frappe.web_form.set_value('regd_address_as_per_gstin', gst_data.pradr.addr.bno.concat(" ", 
						// 								gst_data.pradr.addr.flno, " ", 
						// 								gst_data.pradr.addr.bnm, "\n",
						// 								gst_data.pradr.addr.st, "\n",
						// 								gst_data.pradr.addr.loc, "\n",
						// 								gst_data.pradr.addr.dst, "\n",
						// 								gst_data.pradr.addr.stcd, "\n",
						// 								gst_data.pradr.addr.pncd, "\n"))
						// 	frappe.web_form.set_value('address_line_1', gst_data.pradr.addr.bno.concat(", ", 
						// 								gst_data.pradr.addr.flno, ", ", 
						// 								gst_data.pradr.addr.bnm))
						// 	frappe.web_form.set_value('address_line_2', gst_data.pradr.addr.st.concat(" ", 
						// 								gst_data.pradr.addr.flno, " ", 
						// 								gst_data.pradr.addr.loc))
						// 	frappe.web_form.set_value('district', gst_data.pradr.addr.dst)
						// 	frappe.web_form.set_value('state', gst_data.pradr.addr.stcd)
						// 	frappe.web_form.set_value('pincode', gst_data.pradr.addr.pncd)
						// }
					}
				}
			});
		}
		else{
			frappe.throw("GST Number must be Entered")
		}
	});
});
