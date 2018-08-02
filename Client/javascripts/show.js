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
		if (data.status === 'Failed') {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('flash-message').style.display = 'block';
			document.getElementById('flash-message').style.backgroundColor = 'red';
			document.querySelector('#flash-message p').textContent = data.message;
			document.getElementById('show').innerHTML = '<h3 class="text-center white-text">going back to the dashboard in <span id="countdown">3</span> seconds...</h3>';
			var count = 3;
			setInterval(function () {
				document.getElementById('countdown').textContent = count;
				count -= 1;
			}, 1000);
			setTimeout(function () {
				window.location = 'dashboard.html';
			}, 4000);
		} else if (data.status === 'Success') {
			document.getElementById('loading').style.display = 'none';
			var date = data.data.created_at.split('T')[0];
			var html = '\n\t\t\t\t<article>\n\t\t\t\t\t<h3 class="title text-center white-text">' + data.data.title + '</h3>\n\t\t\t\t\t<span class="small-text light-text primary-text"><b>' + date + '</b></span>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<small><a href="edit.html?entries=' + data.data.id + '" class="">Update</a> <a href="delete" class="danger-text delete-entry">Delete</a></small>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class="description white-text">\n\t\t\t\t\t\t' + data.data.description + '\n\t\t\t\t\t</p>\n\t\t\t\t</article>\n\t\t\t\t';
			document.getElementById('show').innerHTML = html;
			document.querySelector('.delete-entry').addEventListener('click', function (event) {
				event.preventDefault();
				fetch(baseUrl + '/entries/' + entryId, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						token: localStorage.getItem('diary_token')
					}
				}).then(function (res) {
					return res.json();
				}).then(function (newData) {
					if (newData.status === 'Failed') {
						document.getElementById('flash-message').style.display = 'block';
						document.getElementById('flash-message').style.backgroundColor = 'red';
						document.querySelector('#flash-message p').textContent = newData.message;
					} else if (data.status === 'Success') {
						window.location = 'dashboard.html?notice=Entry has been deleted';
					}
				});
				window.location = 'dashboard.html?notice=Entry has been deleted';
			});
		}
	});
});
//# sourceMappingURL=show.js.map
