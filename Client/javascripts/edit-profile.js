'use strict';

var baseUrl = 'http://localhost:3000/api/v1';
document.addEventListener('DOMContentLoaded', function () {
	fetch(baseUrl + '/user/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token')
		}
	}).then(function (res) {
		return res.json();
	}).then(function (data) {
		document.querySelector('input[type="email"]').value = data.data.user.email;
		document.querySelector('input[type="text"]').value = data.data.user.fullname;
		document.querySelector('input[type="date"]').valueAsDate = new Date(data.data.user.dateofbirth);
	});
});
//# sourceMappingURL=edit-profile.js.map
