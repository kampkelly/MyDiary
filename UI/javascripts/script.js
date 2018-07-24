$(document).ready(function(){
	document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
	$('#carousel > ul li:nth-child(1)').on("click", function() {
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img1-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(2)').on("click", function() {
		$('.img1-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img2-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(3)').on("click", function() {
		$('.img1-container').fadeOut('fast');
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
	});
	setInterval(function() {
		setTimeout(function() {
			$('.img1-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img2-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 0);
		setTimeout(function() {
			$('.img1-container').fadeOut('fast');
			$('.img2-container').fadeOut('fast');
			$('.img3-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		}, 6000);
		setTimeout(function() {
			$('.img1-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img2-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 9000);
		console.log('some');
	}, 12000);
	
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
function submitSignup() {
    var success_message = 'You have been signed up!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty =validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function submitSignin() {
    var success_message = 'Sign in successful!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function forgotPassword() {
    var success_message = 'Your password has been sent to the email if it exists!';
    var error_message = 'Please enter a valid email!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function addEntry() {
    var success_message = 'Entry has been saved!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function editEntry() {
    var success_message = 'Entry has been updated!';
    var error_message = 'One or more of the required fields is empty!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function updateProfile() {
    var success_message = 'Profile Updated!';
    var error_message = 'Please fill the form fields!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function saveSettings() {
    var success_message = 'Settings Saved!';
    var error_message = 'Please Enter a Valid Date!';
    var none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful
        var time = $(event.target).parents('form:first').find('input[type="time"]').val();
        $('.success-text #notification_time').text(time);
    }
}

function validateForm(error_message, success_message, event) {
    event.preventDefault();
    var form = $(event.target).parents('form:first');
    var req = form.find('*[required="true"]');
    var checkedValues = req.map(function() {
        return this.value;
    }).get();
    if ( checkCheckedValues(checkedValues) === true) { //success
        //form.submit();
        $(event.target).parents('form:first').find('.form_error_text small').text('');
        $(event.target).parents('form:first').find('.form_success_text small').text(success_message);
    }else{
        $(event.target).parents('form:first').find('.form_success_text small').text('');
        $(event.target).parents('form:first').find('.form_error_text small').text(error_message);
    }
    return checkCheckedValues(checkedValues);
}
function checkCheckedValues(checkedValues){
   for(var i=0;i<checkedValues.length;i++){
       if(checkedValues[i] === "") {
           return false;
       }
   }
   return true;
}
