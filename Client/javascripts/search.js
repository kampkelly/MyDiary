'use strict';

var baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', function () {
	var pageUrl = window.location.href;
	var url = new URL(pageUrl);
	var searchQuery = url.searchParams.get('query');
	console.log(searchQuery);
	if (searchQuery === null) {
		window.location = 'dashboard.html';
	}
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(baseUrl + '/entries?query=' + searchQuery, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token')
		}
	}).then(function (res) {
		return res.json();
	}).then(function (data) {
		document.getElementById('loading').style.display = 'none';
		if (data.entries.length >= 1) {
			// eslint-disable-next-line
			paginate(data.entries.length, 0, 7, data.entries, true);
			window.en = data.entries;
			// eslint-disable-next-line
			insertEntriesList(0, 7);
		} else if (data.entries.length < 1) {
			document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center success-text">No entries found!</h3>';
		}
	});
});
//# sourceMappingURL=search.js.map
