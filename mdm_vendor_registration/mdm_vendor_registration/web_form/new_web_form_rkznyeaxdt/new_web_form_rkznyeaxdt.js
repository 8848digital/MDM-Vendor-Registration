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
                console.log(fetchCompanyNameBasedOnPan);
                if (fetchCompanyNameBasedOnPan == 1) {
                    var pan_number = frappe.web_form.get_value('pan_number');
                    console.log('pan', pan_number);

                    if (pan_number) {
                        frappe.call({
                            method: 'mdm_vendor_registration.public.py.pan_validate.get_data',
                            args: {
                                pan_number: pan_number
                            },
                            callback: function(response) {
                                console.log("response", response);
                                if (response.message === false) {
                                    frappe.msgprint("PAN number not valid");
                                } else {
                                    var personName = findPersonName(pan_number);
                                    if (personName) {
                                        frappe.web_form.set_value('persons_name', personName.name);
                                        frappe.web_form.set_value('name_of_the_company_fetched_as_per_pan', personName.company);
                                    } else {
                                        frappe.msgprint("PAN details not found");
                                    }
                                }
                            }
                        });
                    } else {
                        frappe.msgprint("PAN number must be entered");
                    }
                } else {
                    frappe.msgprint("Please tick the checkbox to verify PAN details");
                }
            }
        });
    });

    function findPersonName(panNumber) {
        var jsonData=[
			{
			  "client_id": "pan_comprehensive_bdNzhdLMVpxGHkfwkhGl",
			  "company_name":"8848 digital",
			  "pan_number": "ABCPD9716F",
			  "full_name": "JOHN DOE",
			  "full_name_split": ["JOHN", "", "DOE"],
			  "fathers_name": "JAMES DOE",
			  "masked_aadhaar": "XXXXXXXX0617",
			  "address": {
				"line_1": "21 KEHNA KING MARKET",
				"line_2": "PURANA GANJ",
				"street_name": "",
				"zip": "110072",
				"city": "DELHI",
				"state": "",
				"country": "",
				"full": "21 KEHNA KING MARKET PURANA GANJ 110072 DELHI"
			  },
			  "email": "JOHNDOE@GMAIL.COM",
			  "phone_number": "9999955555",
			  "gender": "M",
			  "dob": "1996-01-01",
			  "input_dob": null,
			  "aadhaar_linked": true,
			  "dob_verified": false,
			  "dob_check": false,
			  "category": "person",
			  "less_info": false
			},
			{
			  "client_id": "another_client_id_123",
			  "company_name":" Ascra Tech",
			  "pan_number": "XYZAB5678H",
			  "full_name": "Jane Doe",
			  "full_name_split": ["Jane", "", "Doe"],
			  "fathers_name": "Robert Doe",
			  "masked_aadhaar": "XXXXXXXX7890",
			  "address": {
				"line_1": "456 Oak Street",
				"line_2": "Apt 7C",
				"street_name": "",
				"zip": "54321",
				"city": "Metropolis",
				"state": "CA",
				"country": "",
				"full": "456 Oak Street Apt 7C 54321 Metropolis, CA"
			  },
			  "email": "janedoe@email.com",
			  "phone_number": "777-777-7777",
			  "gender": "F",
			  "dob": "1985-08-20",
			  "input_dob": null,
			  "aadhaar_linked": true,
			  "dob_verified": false,
			  "dob_check": false,
			  "category": "individual",
			  "less_info": false
			},
			{
			  "client_id": "unique_client_abc",
			  "company_name":"Micro soft",
			  "pan_number": "LMNOP1234K",
			  "full_name": "Emily White",
			  "full_name_split": ["Emily", "", "White"],
			  "fathers_name": "Daniel White",
			  "masked_aadhaar": "XXXXXXXX2345",
			  "address": {
				"line_1": "321 Maple Avenue",
				"line_2": "Apt 5B",
				"street_name": "",
				"zip": "54321",
				"city": "Mapletown",
				"state": "TX",
				"country": "USA",
				"full": "321 Maple Avenue Apt 5B 54321 Mapletown, TX"
			  },
			  "email": "emilyw@email.com",
			  "phone_number": "666-666-6666",
			  "gender": "F",
			  "dob": "1990-12-05",
			  "input_dob": null,
			  "aadhaar_linked": true,
			  "dob_verified": false,
			  "dob_check": false,
			  "category": "individual",
			  "less_info": false
			}
		  ]
		  

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].pan_number == panNumber) {
                console.log(jsonData[i].company_name);
                return { "name": jsonData[i].full_name, "company": jsonData[i].company_name };
            }
        }

        return null;
    }
});
