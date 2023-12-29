

$(document).ready(function () {
    $('.btn-verify-email').click(function () {
      
        email = ($("email").val() || "").trim();
        console.log(email)
        frappe.call({
            method: 'mdm_vendor_registration.public.py.otp.send_otp',
            args:{
                "email":email
            },
            callback: function (r) {
                console.log(r.message);
             
                
            },
            error: function (err) {
                // Handle the error as needed
                console.log(err);
            }
        });
     });
});
    
function verifyPhone() {
    const phone = document.getElementById('phone').value;
    // Add phone verification logic here
    alert(`Phone verification sent for: ${phone}`);
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    // Add registration logic here
    alert(`Registration successful!\nEmail: ${email}\nPassword: ${password}\nPhone: ${phone}`);
}
