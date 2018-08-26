/* global location */
/* eslint no-restricted-globals: ["off", "location", "event"] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
/* eslint-disable no-unused-vars */
// document.addEventListener('DOMContentLoaded', () => {
// 	const signupLink = document.querySelectorAll('a[href="signup.html"]');
// 	const signinLink = document.querySelectorAll('a[href="signin.html"]');
// 	const dashboardLink = document.querySelectorAll('a[href="dashboard.html"]');
// 	const profileLink = document.querySelectorAll('a[href="profile.html"]');
// 	const logoutLink = document.querySelectorAll('a[href="#logout"]');
// });
function authenticate() {
	if (localStorage.getItem('diary_token')) { // authenticated
		document.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll('a[href="signup.html"]')[0].parentNode.style.display = 'none';
			document.querySelectorAll('a[href="signup.html"]')[1].parentNode.style.display = 'none';
			document.querySelectorAll('a[href="signin.html"]')[0].parentNode.style.display = 'none';
			document.querySelectorAll('a[href="signin.html"]')[1].parentNode.style.display = 'none';
		});
	} else {
		// eslint-disable-next-line
		// document.addEventListener('DOMContentLoaded', () => {
		// 	document.querySelector('a[href="#logout"]').style.display = 'none';
		// });
		// eslint-disable-next-line
		if (location.href.includes('/signup.html') || location.href.includes('/signin.html') || location.href.includes('/forgot_password.html') || location.href.includes('/about.html')) {
			document.addEventListener('DOMContentLoaded', () => {
				document.querySelector('a[href="#logout"]').style.display = 'none';
				document.querySelectorAll('a[href="dashboard.html"]')[1].parentNode.style.display = 'none';
				document.querySelectorAll('a[href="dashboard.html"]')[3].parentNode.style.display = 'none';
				document.querySelectorAll('a[href="profile.html"]')[0].parentNode.style.display = 'none';
				document.querySelectorAll('a[href="profile.html"]')[1].parentNode.style.display = 'none';
				document.querySelectorAll('a[href="#logout"]')[0].parentNode.style.display = 'none';
				document.querySelectorAll('a[href="#logout"]')[1].parentNode.style.display = 'none';
			});
		} else {
			window.location = 'signin.html?notice=You are not logged in!&warning=red';
		}
	}
}
authenticate();
