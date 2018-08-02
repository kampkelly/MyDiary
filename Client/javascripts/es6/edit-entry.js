const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	const pageUrl = window.location.href;
	const url = new URL(pageUrl);
	const entryId = url.searchParams.get('entries');
	if (entryId === null) {
		window.location = 'dashboard.html';
	}
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(`${baseUrl}/entries/${entryId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			document.getElementById('loading').style.display = 'none';
			if (data.status === 'Failed') {
				document.getElementById('flash-message').style.display = 'block';
				document.getElementById('flash-message').style.backgroundColor = 'red';
				if ('one' === 'two') {
					document.querySelector('#flash-message p').textContent = data.message;
				} else {
					document.querySelector('#flash-message p').textContent = 'You have made an invalid request!';
				}
				document.getElementById('add').innerHTML = '<h3 class="text-center white-text">going back to the dashboard in <span id="countdown">3</span> seconds...</h3>';
				let count = 3;
				setInterval(() => {
					document.getElementById('countdown').textContent = count;
					count -= 1;
				}, 1000);
				setTimeout(() => {
					window.location = 'dashboard.html';
				}, 4000);
			} else if (data.status === 'Success') {
				document.querySelector('input[type="text"]').value = data.data.title;
				document.querySelector('textarea').value = data.data.description;
			}
		});
});
