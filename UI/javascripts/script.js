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
function UpdateProfile() {
    var success_message = 'Profile Updated!';
    var error_message = 'Please fill the form fields!';
    var none_empty = ValidateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
