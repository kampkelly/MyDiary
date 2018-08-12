/* global location */
/* eslint no-restricted-globals: ["off", "location", "event"] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-disable no-unused-vars */
const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	const signupLink = document.querySelectorAll('a[href="signup.html"]');
	const signinLink = document.querySelectorAll('a[href="signin.html"]');
	const dashboardLink = document.querySelectorAll('a[href="dashboard.html"]');
	const profileLink = document.querySelectorAll('a[href="profile.html"]');
	const logoutLink = document.querySelectorAll('a[href="#logout"]');
	// slider animations
	document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
	$('#carousel > ul li:nth-child(1)').on('click', () => {
		$('.img2-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img1-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(2)').on('click', () => {
		$('.img1-container').fadeOut('fast');
		$('.img3-container').fadeOut('fast');
		$('.img2-container').fadeIn('fast');
		document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
		document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
		document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
	});
	$('#carousel > ul li:nth-child(3)').on('click', () => {
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
	// slider animations
});

document.getElementById('change_settings').addEventListener('click', () => {
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form button')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].style.backgroundColor = 'white';
	document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	document.querySelectorAll('#profile #settings form button')[0].style.color = 'white';
	document.querySelectorAll('#profile #settings form button')[0].innerHTML = 'Save';
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseover', () => {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#8c8c8c';
	});
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseleave', () => {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	});
});

function logout() {
	localStorage.removeItem('diary_token');
	window.location = 'signin.html';
}

function checkCheckedValues(checkedValues) {
	// eslint-disable-next-line
	for (let i = 0; i < checkedValues.length; i++) {
		if (checkedValues[i].value === '') {
			return false;
		}
	}
	return true;
}

function validateForm(errorMessage, successMessage, event) {
	event.preventDefault();
	const req = document.querySelectorAll('form *[required="true"]');
	const checkedValues = req;
	if (checkCheckedValues(checkedValues) === true) { // success

	} else {
		document.querySelector('.form_error_text').style.display = 'block';
		document.querySelector('.form_error_text small').textContent = errorMessage;
	}
	return checkCheckedValues(checkedValues);
}

function submitSignup() {
	const successMessage = 'You have been signed up!';
	const errorMessage = 'One or more required fields are empty!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const fullName = document.querySelector('form input[id="signup_fullname"]').value;
		const dateOfBirth = document.querySelector('form input[id="date_of_birth"]').value;
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		const password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
		const confirmPassword = document.querySelectorAll('form input[type="password"]')[1].value.toLowerCase();
		if (password !== confirmPassword) {
			document.querySelector('.form_error_text').style.display = 'block';
			document.querySelector('.form_error_text small').textContent = 'Your Passwords do not match';
		} else {
			document.querySelector('.form_error_text').style.display = 'none';
			fetch(`${baseUrl}/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: window.JSON.stringify({
					email, password, confirmPassword, dateOfBirth, fullName,
				}),
			})
				.then(res => res.json())
				.then((data) => {
					if (data.status === 'Success') {
						localStorage.setItem('diary_token', data.token);
						window.location = `dashboard.html?notice=${data.message}`;
					} else {
						document.querySelector('.form_error_text').style.display = 'block';
						document.querySelector('.form_error_text small').textContent = data.message;
					}
				});
		}
	}
}

function submitSignin() {
	const successMessage = 'You have successfully signed in!';
	const errorMessage = 'One or more of the required fields are empty!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
		const password = document.querySelectorAll('form input[type="password"]')[0].value.toLowerCase();
		fetch(`${baseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: window.JSON.stringify({ email, password }),
		})
			.then(res => res.json())
			.then((data) => {
				document.querySelector('.form_error_text').style.display = 'none';
				if (data.status === 'Success') {
					localStorage.setItem('diary_token', data.token);
					window.location = `dashboard.html?notice=${data.message}`;
				} else {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
				}
			});
	}
}

function forgotPassword() {
	const successMessage = 'Your password has been sent to the email if it exists!';
	const errorMessage = 'Please enter a valid email!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const email = document.querySelector('form input[type="email"]').value.toLowerCase().replace(/\s+/g, '');
	}
}

function addEntry() {
	const successMessage = 'Entry has been saved!';
	const errorMessage = 'One or more of the required fields are empty!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const title = document.querySelector('form input[type="text"]').value;
		const description = document.querySelector('form textarea').value;
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
		fetch(`${baseUrl}/entries`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token'),
			},
			body: window.JSON.stringify({ title, description }),
		})
			.then(res => res.json())
			.then((data) => {
				document.getElementById('loading').style.display = 'none';
				if (data.status === 'Failed') {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
					// document.getElementById('flash-message').style.display = 'block';
					// document.getElementById('flash-message').style.backgroundColor = 'red';
					// document.querySelector('#flash-message p').textContent = data.message;
				} else if (data.status === 'Success') {
					window.location = `dashboard.html?notice=${data.message}`;
				}
			});
	}
}

function editEntry() {
	const successMessage = 'Entry has been updated!';
	const errorMessage = 'One or more of the required fields are empty!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const title = document.querySelector('form input[type="text"]').value;
		const description = document.querySelector('form textarea').value;
		const pageUrl = window.location.href;
		const url = new URL(pageUrl);
		const entryId = url.searchParams.get('entries');
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
		fetch(`${baseUrl}/entries/${entryId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token'),
			},
			body: window.JSON.stringify({ title, description }),
		})
			.then(res => res.json())
			.then((data) => {
				document.getElementById('loading').style.display = 'none';
				document.querySelector('.form_error_text').style.display = 'none';
				if (data.status === 'Success') {
					window.location = `show.html?entries=${entryId}&notice=${data.message}`;
				} else {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
				}
			});
	}
}

function updateProfile() {
	const successMessage = 'Profile Updated!';
	const errorMessage = 'Please fill the form fields!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const email = document.querySelector('form input[type="email"]').value;
		const fullName = document.querySelector('form input[type="text"]').value;
		const dateOfBirth = document.querySelector('form input[type="date"]').value;
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
		fetch(`${baseUrl}/user/profile`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token'),
			},
			body: window.JSON.stringify({ email, fullName, dateOfBirth }),
		})
			.then(res => res.json())
			.then((data) => {
				document.getElementById('loading').style.display = 'none';
				console.log(data);
				document.querySelector('.form_error_text').style.display = 'none';
				if (data.status === 'Success') {
					window.location = `profile.html?notice=${data.message}`;
				} else {
					document.querySelector('.form_error_text').style.display = 'block';
					document.querySelector('.form_error_text small').textContent = data.message;
				}
			});
	}
}

function saveSettings() {
	const successMessage = 'Settings Saved!';
	const errorMessage = 'Please Enter a Valid Date!';
	const noneEmpty = validateForm(errorMessage, successMessage, event);
	if (noneEmpty === true) { // validation was successful
		const reminderTime = document.querySelector('form input[type="time"]').value;
		document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
		fetch(`${baseUrl}/user/notifications`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token'),
			},
			body: window.JSON.stringify({ reminderTime }),
		})
			.then(res => res.json())
			.then((data) => {
				document.getElementById('loading').style.display = 'none';
				console.log(data);
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
	const pageUrl = window.location.href;
	const url = new URL(pageUrl);
	const notice = url.searchParams.get('notice');
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
