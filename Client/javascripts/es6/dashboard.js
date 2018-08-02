const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	fetch(`${baseUrl}/entries`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			if (data.data.length >= 1) {
				const entries = data.data.filter((da, index) => data.data.indexOf(da)
				<= (data.data.length - 4) && index < 4);
				let html = '<li></li>';
				entries.map((entry) => {
					html += `<li><a href="show.html?entries=${entry.id}"><h4 class="title">${entry.title}</h4></a></li>`;
					return entry;
				});
				document.querySelector('aside .no-styling').innerHTML = html;
			} else if (data.data.length < 1) {
				document.querySelector('aside .no-styling').innerHTML = '<h3 class="text-center">No entries</h3>';
				document.querySelector('aside .no-styling h3').style.color = '#DFAC2C';
			}
		});
});

// eslint-disable-next-line
function viewEntries() {
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
			if (data.data.length >= 1) {
				let html = '<li></li>';
				data.data.map((entry) => {
					const date = entry.created_at.split('T')[0];
					html += `<li>
					<h4 class="title"><a href="show.html?entries=${entry.id}">${entry.title}</a> <span class="small-text light-text">${date}</span></h4>
					<p class="description">${entry.description.slice(0, 150)} <a href="show.html?entries=${entry.id}">Read more...</a></p>
					</li>`;
					return entry;
				});
				document.querySelector('#index .no-styling').innerHTML = html;
			} else if (data.data.length < 1) {
				document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center danger-text">You do not have any entries yet..<a href="add.html">Create one now</a></h3>';
			}
		});
}
