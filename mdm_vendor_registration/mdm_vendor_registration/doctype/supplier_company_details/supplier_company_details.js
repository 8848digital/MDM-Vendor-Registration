// Copyright (c) 2023, chintan and contributors
// For license information, please see license.txt

frappe.ui.form.on('Supplier Company Details', {
	refresh: function(frm) {
        // filter list view based on owner
        frm.fields_dict['items'].grid.get_field('owner').get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'owner': frappe.session.user
                }
            };
        };
    }
});
frappe.ui.form.on('Your Doctype', {
    
});