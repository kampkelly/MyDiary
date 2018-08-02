'use strict';

var baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(baseUrl + '/user/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token')
		}
	}).then(function (res) {
		return res.json();
	}).then(function (data) {
		document.getElementById('loading').style.display = 'none';
		console.log(data);
		console.log(data.data.user);
		var dateofbirth = data.data.user.dateofbirth.split('T')[0];
		var createdAt = data.data.user.created_at.split('T')[0];
		var html = '\n\t\t\t<ul class="no-styling">\n\t\t\t\t<li ><strong>Email:</strong> ' + data.data.user.email + '</li>\n\t\t\t\t<li ><strong>Name:</strong> ' + data.data.user.fullname + '</li>\n\t\t\t\t<li ><strong>Date of birth:</strong> ' + dateofbirth + '</li>\n\t\t\t\t<li ><strong>Date Joined:</strong> ' + createdAt + '</li>\n\t\t\t</ul>\n\t\t\t<div class="text-center">\n\t\t\t\t<a href="edit-profile.html" class="underline"><small>Edit Profile</small></a>\n\t\t\t\t<p class="light-white-text text-center"><small>Total number of entries in diary: 4</small></p>\n\t\t\t</div>\n\t\t\t';
		document.querySelector('#insert').innerHTML = html;
		if (data.data.user.remindertime !== null) document.querySelector('#settings #notification_time').textContent = data.data.user.remindertime;
		document.querySelector('input[type="time"]').value = data.data.user.remindertime;
		fetch(baseUrl + '/entries', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('diary_token')
			}
		}).then(function (res) {
			return res.json();
		}).then(function (newData) {
			document.querySelector('.light-white-text small').textContent = 'Total number of entries in diary: ' + newData.data.length;
		});
	});
});
//# sourceMappingURL=profile.js.map
