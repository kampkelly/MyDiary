'use strict';

var baseUrl = 'http://localhost:3000/api/v1';
document.addEventListener('DOMContentLoaded', function () {
	var pageUrl = window.location.href;
	var url = new URL(pageUrl);
	var entryId = url.searchParams.get('entries');
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(baseUrl + '/entries/' + entryId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token')
		}
	}).then(function (res) {
		return res.json();
	}).then(function (data) {
		document.getElementById('loading').style.display = 'none';
		if (data.status === 'Failed') {
			document.getElementById('flash-message').style.display = 'block';
			document.getElementById('flash-message').style.backgroundColor = 'red';
			document.querySelector('#flash-message p').textContent = data.message;
			document.getElementById('add').innerHTML = '<h3 class="text-center white-text">going back to the dashboard in <span id="countdown">3</span> seconds...</h3>';
			var count = 3;
			setInterval(function () {
				document.getElementById('countdown').textContent = count;
				count -= 1;
			}, 1000);
			setTimeout(function () {
				window.location = 'dashboard.html';
			}, 4000);
		} else if (data.status === 'Success') {
			document.querySelector('input[type="text"]').value = data.data.title;
			document.querySelector('textarea').value = data.data.description;
		}
	});
});
//# sourceMappingURL=edit-entry.js.map
