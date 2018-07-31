'use strict';

require('babel-polyfill');

/* global location */
/* eslint no-restricted-globals: ["off", "location", "event"] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', function () {
	// slider animations
	document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
	$('#carousel > ul li:nth-child(1)').on('click', function () {
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img1-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(2)').on('click', function () {
		$('.img1-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img2-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(3)').on('click', function () {
		$('.img1-container').fadeOut('fast');
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
	});
	setInterval(function () {
		setTimeout(function () {
			$('.img1-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img2-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 3000);
		setTimeout(function () {
			$('.img1-container').fadeOut('fast');
			$('.img2-container').fadeOut('fast');
			$('.img3-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		}, 7000);
		setTimeout(function () {
			$('.img2-container').fadeOut('fast');
			$('.img3-container').fadeOut('fast');
			$('.img1-container').fadeIn('fast');
			document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
			document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
			document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
		}, 11000);
	}, 11000);
	// slider animations
});

document.getElementById('change_settings').addEventListener('click', function () {
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form button')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].style.backgroundColor = 'white';
	document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	document.querySelectorAll('#profile #settings form button')[0].style.color = 'white';
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseover', function () {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#8c8c8c';
	});
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseleave', function () {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	});
});

function checkCheckedValues(checkedValues) {
	// eslint-disable-next-line
	for (var i = 0; i < checkedValues.length; i++) {
		if (checkedValues[i].value === '') {
			return false;
		}
	}
	return true;
}

function validateForm(errorMessage, successMessage, event) {
	event.preventDefault();
	var req = document.querySelectorAll('form *[required="true"]');
	var checkedValues = req;
	if (checkCheckedValues(checkedValues) === true) {// success

	} else {
		document.querySelector('.form_error_text').style.display = 'block';
		document.querySelector('.form_error_text small').textContent = errorMessage;
	}
	return checkCheckedValues(checkedValues);
}

function submitSignup() {
	var successMessage = 'You have been signed up!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var fullName = document.querySelector('form input[id="signup_fullname"]').value;
		var dateOfBirth = document.querySelector('form input[id="date_of_birth"]').value;
		var email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		var password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
		var confirmPassword = document.querySelectorAll('form input[type="password"]')[1].value.toLowerCase();
		if (password !== confirmPassword) {
			document.querySelector('.form_error_text').style.display = 'block';
			document.querySelector('.form_error_text small').textContent = 'Your Passwords do not match';
		} else {
			document.querySelector('.form_error_text').style.display = 'none';
			fetch('https://kampkelly-mydiary-api.herokuapp.com/api/v1/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: window.JSON.stringify({
					email: email, password: password, confirmPassword: confirmPassword, dateOfBirth: dateOfBirth, fullName: fullName
				})
			}).then(function (res) {
				return res.json();
			}).then(function (data) {
				if (data.status === 'Success') {
					window.location = 'signin.html?notice=' + data.message;
				} else {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
				}
			});
		}
	}
	validateForm();
}

function submitSignin() {
	var successMessage = 'You have successfully signed in!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		var password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
		fetch('https://kampkelly-mydiary-api.herokuapp.com/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: window.JSON.stringify({ email: email, password: password })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			document.querySelector('.form_error_text').style.display = 'none';
			if (data.status === 'Success') {
				localStorage.setItem('diary_token', data.data.token);
				window.location = 'dashboard.html?notice=' + data.message;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
	}
	validateForm();
}

function forgotPassword() {
	var successMessage = 'Your password has been sent to the email if it exists!';
	var errorMessage = 'Please enter a valid email!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
	}
}

function addEntry() {
	var successMessage = 'Entry has been saved!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {// validation was successful

	}
}

function editEntry() {
	var successMessage = 'Entry has been updated!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {// validation was successful

	}
}

function updateProfile() {
	var successMessage = 'Profile Updated!';
	var errorMessage = 'Please fill the form fields!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {// validation was successful

	}
}

function saveSettings() {
	var successMessage = 'Settings Saved!';
	var errorMessage = 'Please Enter a Valid Date!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var time = document.querySelector('form input[type="time"]').value;
		document.querySelector('.success-text #notification_time').textContent = time;
	}
}

function goToNewEntryPage() {
	window.location = 'add.html';
}

function viewEntries() {
	document.querySelector('#dashboard').style.display = 'none';
	document.querySelector('#index').style.display = 'block';
}

function closeNotification() {
	document.querySelector('#flash-message').style.display = 'none';
}

function checkNotice() {
	console.log(window.location.href);
	console.log('ddlmd');
	var pageUrl = window.location.href;
	var url = new URL(pageUrl);
	var notice = url.searchParams.get('notice');
	console.log(notice);
	if (notice) {
		if (notice.length >= 1) {
			document.querySelector('#flash-message').style.display = 'block';
			document.querySelector('#flash-message p').textContent = notice;
		}
	}
}
checkNotice();
//# sourceMappingURL=script.js.map
