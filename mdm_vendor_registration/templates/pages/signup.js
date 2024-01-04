$(document).ready(function () {
    var emailotp='';
  var phoneotp='';
  var flag=false;
     $(".eye-icon1").click(function () {
    const passwordInput = $("#password");
    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);
    const eyeIcon = $(passwordInput).next(".eye-icon");
    eyeIcon.toggleClass("fa-eye fa-eye-slash");
  });
  $(".eye-icon2").click(function () {
    const passwordInput = $("#password1");
    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);
     const eyeIcon = $(passwordInput).next(".eye-icon");
    eyeIcon.toggleClass("fa-eye fa-eye-slash");
  });
     $(".verify-phone").click(() => {
        const phoneNumber  = $("#phone").val().trim();
        if (phoneNumber.length!=10){
            frappe.msgprint("Mobile Number Not Valid")
        }
        else{
        const countryCode = $("#country-code").val().trim();
        const phone = countryCode + phoneNumber;
        frappe.call({
            method: 'mdm_vendor_registration.public.py.otp.send_sms',
            args: {
                "to": phone
            },
            callback: function(r) {
              $("#otpModalPhone").css("display", "block")
              phoneotp=r.message.OTP
               
            }
        })
   

        }
        
    });
    $(".btn-verify-email").click(() => {
        const email = $("#email").val().trim();
        frappe.call({
            method: 'mdm_vendor_registration.public.py.otp.send_otp',
            args: {
                "email": email
            },
            callback: function(r) {
                if (r.message=='Email Not Valid')
                {
                    frappe.msgprint('Email Not Valid')
                }
                else{
                  $("#otpModalEmail").css("display", "block");
                  emailotp=r.message.Context.otp   
            }
        }
        })
       
    });
    $(".btn-register").click(() => {
        const email = $("#email").val().trim();
        const name=$('#name').val().trim();
        const pwd=$('#password').val().trim();
        const pwd1=$('#password1').val().trim();
        const phone=$('#phone').val().trim();

        if (pwd!=pwd1){
          frappe.msgprint("Check Password again password not matching")
        }
        else{
          frappe.call({
            method: 'mdm_vendor_registration.public.py.register.register_user',
            args: {
                "email": email,
                "name":name,
                "mobile_no":phone,
                "new_password":pwd,
            },
            callback: function(r) {
            }
        })
        }   
    });
    $(".submitOTPEmail").click(() => {
    const otp = $("#otpInputEmail").val().trim();
    if (otp == emailotp) {
      flag = true;
      frappe.msgprint("Email Validated");
      $("#otpModalEmail").css("display", "none");
    
    } else if (otp != emailotp) {
      frappe.msgprint("Otp Invalid");
    } else {
      frappe.msgprint("Some error Occured");
    }
  });

  $(".submitOTPPhone").click(() => {
    const otp = $("#otpInputPhone").val().trim();
    if (otp == phoneotp) {
      flag = true;
      frappe.msgprint("Phone validated");
      $("#otpModalPhone").css("display", "none");
    } else if (otp != phoneotp) {
      frappe.msgprint("Otp Invalid");
    } else {
      frappe.msgprint("Some error Occured");
    }
  });
  $(".closeEmail").click(() => {
    $("#otpModalEmail").css("display", "none");
  });

  $(".closePhone").click(() => {
    $("#otpModalPhone").css("display", "none");
  });
  $(".flag-check").click(() => {
      if (flag==false){
        frappe.msgprint("Cant Register")  
      } 
  
  });
   

  });
  