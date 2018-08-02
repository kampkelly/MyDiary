'use strict';

/* global location */
/* eslint no-restricted-globals: ["off", "location", "event"] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-disable no-unused-vars */
// const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
var baseUrl = 'http://localhost:3000/api/v1';
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
			fetch(baseUrl + '/auth/signup', {
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
		fetch(baseUrl + '/auth/login', {
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

// eslint-disable-next-line
function viewEntries() {
	document.querySelector('#dashboard').style.display = 'none';
	document.querySelector('#index').style.display = 'block';
	fetch(baseUrl + '/entries', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token')
		}
	}).then(function (res) {
		return res.json();
	}).then(function (data) {
		if (data.data.length >= 1) {
			var k = '<li></li>';
			data.data.map(function (d) {
				var date = d.created_at.split('T')[0];
				k += '<li>\n\t\t\t\t\t<h4 class="title"><a href="show.html?entries=' + d.id + '">' + d.title + '</a> <span class="small-text light-text">' + date + '</span></h4>\n\t\t\t\t\t<p class="description">' + d.description + ' <a href="show.html?entries=' + d.id + '">Read more...</a></p>\n\t\t\t\t\t</li>';
				return d;
			});
			document.querySelector('#index .no-styling').innerHTML = k;
		} else if (data.data.length < 1) {
			document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center danger-text">You do not have any entries yet..<a href="add.html">Create one now</a></h3>';
		}
	});
}

function addEntry() {
	var successMessage = 'Entry has been saved!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var title = document.querySelector('form input[type="text"]').value;
		var description = document.querySelector('form textarea').value;
		fetch(baseUrl + '/entries', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token')
			},
			body: window.JSON.stringify({ title: title, description: description })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			if (data.status === 'Failed') {
				document.getElementById('flash-message').style.display = 'block';
				document.getElementById('flash-message').style.backgroundColor = 'red';
				document.querySelector('#flash-message p').textContent = data.message;
			} else if (data.status === 'Success') {
				window.location = 'dashboard.html?notice=' + data.message;
			}
		});
	}
}

function editEntry() {
	var successMessage = 'Entry has been updated!';
	var errorMessage = 'One or more of the required fields is empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var title = document.querySelector('form input[type="text"]').value;
		var description = document.querySelector('form textarea').value;
		var pageUrl = window.location.href;
		var url = new URL(pageUrl);
		var entryId = url.searchParams.get('entries');
		fetch(baseUrl + '/entries/' + entryId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token')
			},
			body: window.JSON.stringify({ title: title, description: description })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			document.querySelector('.form_error_text').style.display = 'none';
			if (data.status === 'Success') {
				window.location = 'show.html?entries=' + entryId + '&notice=' + data.message;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
	}
}

function updateProfile() {
	var successMessage = 'Profile Updated!';
	var errorMessage = 'Please fill the form fields!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var email = document.querySelector('form input[type="email"]').value;
		var fullName = document.querySelector('form input[type="text"]').value;
		var dateOfBirth = document.querySelector('form input[type="date"]').value;
		fetch(baseUrl + '/user/profile', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token')
			},
			body: window.JSON.stringify({ email: email, fullName: fullName, dateOfBirth: dateOfBirth })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			console.log(data);
			document.querySelector('.form_error_text').style.display = 'none';
			if (data.status === 'Success') {
				window.location = 'profile.html?notice=' + data.message;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
	}
}

function saveSettings() {
	var successMessage = 'Settings Saved!';
	var errorMessage = 'Please Enter a Valid Date!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var reminderTime = document.querySelector('form input[type="time"]').value;
		fetch(baseUrl + '/user/notifications', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token')
			},
			body: window.JSON.stringify({ reminderTime: reminderTime })
		}).then(function (res) {
			return res.json();
		}).then(function (data) {
			console.log(data);
			document.querySelector('.form_error_text').style.display = 'none';
			if (data.status === 'Success') {
				document.getElementById('flash-message').style.display = 'block';
				document.querySelector('#flash-message p').textContent = data.message;
				document.querySelector('#settings #notification_time').textContent = reminderTime;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
		//
	}
}

function goToNewEntryPage() {
	window.location = 'add.html';
}

function closeNotification() {
	document.querySelector('#flash-message').style.display = 'none';
}

function checkNotice() {
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
