'use strict';

/* global location */
/* eslint no-restricted-globals: ["off", "location", "event"] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-disable no-unused-vars */
var baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', function () {
	var signupLink = document.querySelectorAll('a[href="signup.html"]');
	var signinLink = document.querySelectorAll('a[href="signin.html"]');
	var dashboardLink = document.querySelectorAll('a[href="dashboard.html"]');
	var profileLink = document.querySelectorAll('a[href="profile.html"]');
	var logoutLink = document.querySelectorAll('a[href="#logout"]');
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

function logout() {
	localStorage.removeItem('diary_token');
	window.location = 'signin.html';
}

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
	var errorMessage = 'One or more required fields are empty!';
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
					localStorage.setItem('diary_token', data.token);
					window.location = 'dashboard.html?notice=' + data.message;
				} else {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
				}
			});
		}
	}
}

function submitSignin() {
	var successMessage = 'You have successfully signed in!';
	var errorMessage = 'One or more of the required fields are empty!';
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
				localStorage.setItem('diary_token', data.token);
				window.location = 'dashboard.html?notice=' + data.message;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
	}
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
	var errorMessage = 'One or more of the required fields are empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var title = document.querySelector('form input[type="text"]').value;
		var description = document.querySelector('form textarea').value;
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
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
			document.getElementById('loading').style.display = 'none';
			if (data.status === 'Failed') {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
				// document.getElementById('flash-message').style.display = 'block';
				// document.getElementById('flash-message').style.backgroundColor = 'red';
				// document.querySelector('#flash-message p').textContent = data.message;
			} else if (data.status === 'Success') {
				window.location = 'dashboard.html?notice=' + data.message;
			}
		});
	}
}

function editEntry() {
	var successMessage = 'Entry has been updated!';
	var errorMessage = 'One or more of the required fields are empty!';
	var noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) {
		// validation was successful
		var title = document.querySelector('form input[type="text"]').value;
		var description = document.querySelector('form textarea').value;
		var pageUrl = window.location.href;
		var url = new URL(pageUrl);
		var entryId = url.searchParams.get('entries');
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
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
			document.getElementById('loading').style.display = 'none';
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
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
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
			document.getElementById('loading').style.display = 'none';
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
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
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
			document.getElementById('loading').style.display = 'none';
			document.querySelector('.form_error_text').style.display = 'none';
			if (data.status === 'Success') {
				document.getElementById('flash-message').style.display = 'block';
				document.querySelector('#flash-message p').textContent = data.message;
				document.querySelector('#profile_details  #notification_time').textContent = reminderTime;
			} else {
				document.querySelector('.form_error_text').style.display = 'block';
				document.querySelector('.form_error_text small').textContent = data.message;
			}
		});
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
	if (notice) {
		if (notice.length >= 1) {
			document.querySelector('#flash-message').style.display = 'block';
			document.querySelector('#flash-message p').textContent = notice;
			if (url.searchParams.get('warning')) {
				document.querySelector('#flash-message').style.backgroundColor = '#e00a1e';
			}
		}
	}
}
checkNotice();

// eslint-disable-next-line
function insertEntriesList(offset, limit) {
	var allEntries = window.en;
	allEntries = window.en.slice(offset, offset + limit);
	var html = '<li></li>';
	allEntries.map(function (entry) {
		var date = entry.createdat.split('T')[0];
		html += '<li>\n\t\t<h4 class="title"><a href="show.html?entries=' + entry.id + '">' + entry.title + '</a> <span class="small-text light-text">' + date + '</span></h4>\n\t\t<p class="description">' + entry.description.slice(0, 150) + ' <a href="show.html?entries=' + entry.id + '">Read more...</a></p>\n\t\t</li>';
		return entry;
	});
	document.querySelector('#index .no-styling').innerHTML = html;
}

function searchEntries(id) {
	event.preventDefault();
	var searchQuery = document.getElementById(id).value;
	window.location = 'search.html?query=' + searchQuery;
}
//# sourceMappingURL=script.js.map
