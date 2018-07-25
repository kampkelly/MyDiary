document.addEventListener("DOMContentLoaded",()=>{
	//slider animations
	document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
	$('#carousel > ul li:nth-child(1)').on("click", () => {
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img1-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(2)').on("click", () => {
		$('.img1-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img2-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(3)').on("click", () => {
		$('.img1-container').fadeOut('fast');
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
	});
	setInterval(() => {
		setTimeout(() => {
			$('.img1-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img2-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 3000);
		setTimeout(() => {
			$('.img1-container').fadeOut('fast');
			$('.img2-container').fadeOut('fast');
			$('.img3-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		}, 7000);
		setTimeout(() => {
			$('.img2-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img1-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 11000);
	}, 11000);
	//slider animations
});
document.getElementById("change_settings").addEventListener("click", () => {
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].removeAttribute("disabled");
	document.querySelectorAll('#profile #settings form button')[0].removeAttribute("disabled");
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].style.backgroundColor = 'white';
	document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	document.querySelectorAll('#profile #settings form button')[0].style.color = 'white';
	document.querySelectorAll('#profile #settings form button')[0].addEventListener("mouseover", () => {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#8c8c8c';
	});
	document.querySelectorAll('#profile #settings form button')[0].addEventListener("mouseleave", () =>{
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	});
});


function submitSignup() {
    const success_message = 'You have been signed up!';
    const error_message = 'One or more of the required fields is empty!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		const password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
		const confirm_password = document.querySelectorAll('form input[type="password"]')[1].value.toLowerCase();
		if (password !== confirm_password) {
			document.querySelector('.form_success_text small').textContent = '';
			document.querySelector('.form_error_text small').textContent = 'Your Passwords do not match';
		} else {
			document.querySelector('.form_error_text small').textContent = '';
		}
    }
	validateForm();
}

function submitSignin() {
    const success_message = 'You have successfully signed in!';
    const error_message = 'One or more of the required fields is empty!';
    const none_empty =validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		const password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
    }
	validateForm();
}

function forgotPassword() {
    const success_message = 'Your password has been sent to the email if it exists!';
    const error_message = 'Please enter a valid email!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
    }
}
function addEntry() {
    const success_message = 'Entry has been saved!';
    const error_message = 'One or more of the required fields is empty!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function editEntry() {
    const success_message = 'Entry has been updated!';
    const error_message = 'One or more of the required fields is empty!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function updateProfile() {
    const success_message = 'Profile Updated!';
    const error_message = 'Please fill the form fields!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful

    }
}
function saveSettings() {
    const success_message = 'Settings Saved!';
    const error_message = 'Please Enter a Valid Date!';
    const none_empty = validateForm(error_message, success_message, event);
    if ( none_empty === true) { //validation was successful
        const time = document.querySelector('form input[type="time"]').value;
		document.querySelector('.success-text #notification_time').textContent = time;
    }
}
function validateForm(error_message, success_message, event) {
	event.preventDefault();
	const target = event.target || event.srcElement;
    const req = document.querySelectorAll('form *[required="true"]');
	const checkedValues = req;
    if ( checkCheckedValues(checkedValues) === true) { //success
		document.querySelector('.form_error_text small').textContent = '';
		document.querySelector('.form_success_text small').textContent = success_message;
    }else{
		document.querySelector('.form_success_text small').textContent = '';
		document.querySelector('.form_error_text small').textContent = error_message;
    }
    return checkCheckedValues(checkedValues);
}
function checkCheckedValues(checkedValues){
   for(let i=0;i<checkedValues.length;i++){
       if(checkedValues[i].value === "") {
           return false;
       }
   }
   return true;
}

function goToNewEntryPage() {
	window.location = 'add.html';
}

function viewEntries() {
	document.querySelector('#dashboard').style.display = 'none';
	document.querySelector('#index').style.display = 'block';
}
