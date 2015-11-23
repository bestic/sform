$(function() {

  var timeOut;

  function validateFullName(value) {
    if (!value) {
      return 'Full Name is required'
    }

    if (value.length < 2) {
      return 'Full Name should contain at least 2 symbols'
    }

    if (value.length > 200) {
      return 'Full Name is too long';
    }
  }

  function validateMessage(value) {
    if (!value) {
      return 'Message is required'
    }

    if (value.length < 2) {
      return 'Message should contain at least 2 symbols'
    }

    if (value.length > 200) {
      return 'Message is too long';
    }
  }

  function validateEmail(value) {

    var E_REGEXP = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;

    if (!value) {
      return 'Email is required'
    }

    if (!E_REGEXP.test(value)) {
      return 'Email is invalid';
    }

  }

  function validatePhone(value) {

    var P_REGEXP = /^\+971(50|51|52|55|56|2|3|4|6|7|9)\d{7}$/;

    if (!value) {
      return 'Phone is required'
    }

    if (!P_REGEXP.test(value)) {
      return 'Phone is invalid';
    }

  }



  function checkValidation(id, message) {

    var formGroup = $(id).closest('.form-group');
    formGroup.removeClass('has-error');
    formGroup.find('.help-block').html('');

    if (message) {
      formGroup.addClass('has-error');
      formGroup.find('.help-block').html(message);
      return false;
    }

    return true;

  }

  function validateAll() {

    return checkValidation('#message', validateMessage($('#message').val()))
         | checkValidation('#fullName', validateFullName($('#fullName').val()))
         | checkValidation('#email', validateEmail($('#email').val()))
         | checkValidation('#phone', validatePhone($('#phone').val()));

  }



  $('#message').on("blur", function() {
    var value = $(this).val();
    checkValidation('#message', validateMessage(value));
  });

  $('#fullName').on("blur", function() {
    var value = $(this).val();
    checkValidation('#fullName', validateFullName(value));
  });

  $('#email').on("blur", function() {
    var value = $(this).val();
    checkValidation('#email', validateEmail(value));
  });

  $('#phone').on("blur", function() {
    var value = $(this).val();
    checkValidation('#phone', validatePhone(value));
  });

  $('.btn-submit').on("click", function(e) {
    e.preventDefault();

    if (timeOut) {
      clearTimeout(timeOut);
    }

    $('.alert').hide();
    if (validateAll()) {
      $('.alert.alert-success').show();

    } else {
      $('.alert.alert-danger').show();
    }

    timeOut = setTimeout(function() {
      $('.alert').fadeOut("slow");
    }, 3000);


  });


});