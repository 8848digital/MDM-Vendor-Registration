frappe.ready(function() {

var customBtn = $('<button class="custom-btn btn btn-default" style="font-size: small;margin-left:10px; padding-left: 5px; padding-right: 5px;">Verify PAN</button>');
var panLabel = $('.label-area:contains("PAN Applicable")');
var labelContainer = panLabel.parent();
labelContainer.append(customBtn);
frappe.web_form.set_value('pan_applicable',1);
frappe.web_form.set_value('pan_applicable',0);

$('.custom-btn').on('click', function(event) {
	event.preventDefault();
	frappe.call({
		method: 'mdm_vendor_registration.public.py.pan_validate.get_check',
		callback: function(response) {
			var fetchCompanyNameBasedOnPan = response.message;
			if (fetchCompanyNameBasedOnPan == 1) {
				frappe.web_form.set_value('pan_verified',1);

				var pan_number = frappe.web_form.get_value('pan_number');
				if (pan_number) {
					frappe.call({
						method: 'mdm_vendor_registration.public.py.pan_validate.get_data',
						args: {
							pan_number: pan_number
						},
						callback: function(response) {
							console.log(response.message)
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

});
