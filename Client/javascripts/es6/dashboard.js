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
				const k = `<li>
				<li><a href="show.html?entries=${data.data[0].id}"><h4 class="title">${data.data[0].title}</h4></a></li>
				<li><a href="show.html?entries=${data.data[1].id}"><h4 class="title">${data.data[1].title}</h4></a></li>
				<li><a href="show.html?entries=${data.data[2].id}"><h4 class="title">${data.data[2].title}</h4></a></li>
				<li><a href="show.html?entries=${data.data[3]}"><h4 class="title">${data.data[3].title}</h4></a></li>
				`;
				document.querySelector('aside .no-styling').innerHTML = k;
			} else if (data.data.length < 1) {
				document.querySelector('aside .no-styling').innerHTML = '<h3 class="text-center danger-text">No entries</h3>';
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
				let k = '<li></li>';
				data.data.map((d) => {
					const date = d.created_at.split('T')[0];
					k += `<li>
					<h4 class="title"><a href="show.html?entries=${d.id}">${d.title}</a> <span class="small-text light-text">${date}</span></h4>
					<p class="description">${d.description} <a href="show.html?entries=${d.id}">Read more...</a></p>
					</li>`;
					return d;
				});
				document.querySelector('#index .no-styling').innerHTML = k;
			} else if (data.data.length < 1) {
				document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center danger-text">You do not have any entries yet..<a href="add.html">Create one now</a></h3>';
			}
		});
}
