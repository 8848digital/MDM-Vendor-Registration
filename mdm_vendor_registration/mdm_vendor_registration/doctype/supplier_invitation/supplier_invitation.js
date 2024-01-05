// Copyright (c) 2024, chintan and contributors
// For license information, please see license.txt

frappe.ui.form.on("Supplier Invitation", {
	validate: function(frm) {
        frappe.call({
			method: "mdm_vendor_registration.mdm_vendor_registration.doctype.supplier_invitation.supplier_invitation.send_inv_to_email",
			args: {
				username : frm.doc.email_address_of_the_primary_contact,
			},	
			callback: (response) => {
				console.log(response)
			},
		})
	},
});