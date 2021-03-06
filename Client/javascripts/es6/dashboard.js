const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	fetch(`${baseUrl}/entries?limit=4`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			if (data.entries.length >= 1) {
				const { entries } = data;
				let html = '<li></li>';
				entries.map((entry) => {
					html += `<li><a href="show.html?entries=${entry.id}"><h4 class="title">${entry.title.slice(0, 50)}</h4></a></li>`;
					return entry;
				});
				document.querySelector('aside .no-styling').innerHTML = html;
			} else if (data.entries.length < 1) {
				document.querySelector('aside .no-styling').innerHTML = '<h3 class="text-center">No entries</h3>';
				document.querySelector('aside .no-styling h3').style.color = '#DFAC2C';
			}
		});
});

// eslint-disable-next-line
function viewEntries(offset = 0, limit = 7) {
	document.querySelector('#dashboard').style.display = 'none';
	document.querySelector('#index').style.display = 'block';
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(`${baseUrl}/entries`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			document.getElementById('loading').style.display = 'none';
			if (data.entries.length >= 1) {
				// eslint-disable-next-line
				paginate(data.entries.length, offset, limit, data.entries, true);
				window.en = data.entries;
				// eslint-disable-next-line
				insertEntriesList(offset, limit);
			} else if (data.entries.length < 1) {
				document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center danger-text">You do not have any entries yet..<a href="add.html">Create one now</a></h3>';
			}
		});
}
