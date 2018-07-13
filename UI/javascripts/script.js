$(document).ready(function(){
    $('#change_settings').on('click', function(){
        $('#profile #settings form input[type="time"]').attr('disabled', false);
        $('#profile #settings form button').attr('disabled', false);
        $('#profile #settings form input[type="time"]').css('background-color', '#052F60');
        $('#profile #settings form button').css('background-color', '#fafafa');
        $('#profile #settings form button').hover(function(){
            $('#profile #settings form button').css('background-color', '#8c8c8c');
        });
    });
});
function SubmitSignup() {
    var success_message = 'You have been signed up!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty =ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function SubmitSignin() {
    var success_message = 'Sign in successful!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function AddEntry() {
    var success_message = 'Entry has been saved!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function EditEntry() {
    var success_message = 'Entry has been updated!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function UpdateProfile() {
    var success_message = 'Profile Updated!';
    var error_message = 'Please fill the form fields!';
    var none_empty = ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}

function ValidateForm(error_message, success_message, event) {
    event.preventDefault();
    var form = $(event.target).parents('form:first');
    var req = form.find('*[required="true"]');
    var checkedValues = req.map(function() {
        return this.value;
    }).get();
    if ( CheckCheckedValues(checkedValues) === true) { //success
        //form.submit();
        $(event.target).parents('form:first').find('.form_error_text small').text('');
        $(event.target).parents('form:first').find('.form_success_text small').text(success_message);
    }else{
        $(event.target).parents('form:first').find('.form_success_text small').text('');
        $(event.target).parents('form:first').find('.form_error_text small').text(error_message);
    }
    return CheckCheckedValues(checkedValues);
}
function CheckCheckedValues(checkedValues){
   for(var i=0;i<checkedValues.length;i++){
       if(checkedValues[i] === "") {
           return false;
       }
   }
   return true;
}
