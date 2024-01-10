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
					if (response.message.response.code == 200) {
						var setting = response.message.setting
						var gst_data = response.message.response.data
						if (setting.validate_gst_number){
							frappe.web_form.set_value('gst_verified',1);
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
					}
					else{
						frappe.msgprint(response.message.response.message)
					}
				}
			});
		}
		else{
			frappe.msgprint("GST Number must be Entered")
		}
	});
	var cinbtn = $('<button class="cinbtn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify Cin</button>');
	var cin = $('.control-label:contains("Company Registration Number")');
	var labelContainer = cin.parent();
	labelContainer.append(cinbtn);
	$('.cinbtn').on('click',function(event){
		event.preventDefault();
		var cin_number = frappe.web_form.get_value('company_registration_number');
		console.log(cin_number);
		frappe.call({
			method: 'mdm_vendor_registration.public.py.cin_data.get_data',
			args: {
				cin_number: cin_number
			},
			callback(response){
				var data=response.message.result.data.company_master_data;
				console.log(data)
				if (data.class_of_company=='Private'){
					frappe.web_form.set_value('company_type','Private Limited')
				}
				var inputdate="01/08/2012";
				console.log(inputdate)
				var dateParts = inputdate.split("/");
				console.log(dateParts)
				var inputDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
				var day = inputDate.getDate().toString().padStart(2, '0');
				var month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
				var year = inputDate.getFullYear();
				console.log(day,month,year)
				var formattedDateString = `${day}-${month}-${year}`;
				console.log(formattedDateString)
				frappe.web_form.set_value('date_of_establishment',formattedDateString)
				frappe.web_form.set_value('Company Name',data.company_llp_name)
				var x=frappe.web_form.get_value('company_type')
				console.log("ffsff",x)

			}
		})
	})

});
