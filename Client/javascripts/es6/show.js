const baseUrl = 'http://localhost:3000/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	const pageUrl = window.location.href;
	const url = new URL(pageUrl);
	const entryId = url.searchParams.get('entries');
	fetch(`${baseUrl}/entries/${entryId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			console.log(data);
			document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
			if (data.status === 'Failed') {
				document.getElementById('loading').style.display = 'none';
				document.getElementById('flash-message').style.display = 'block';
				document.getElementById('flash-message').style.backgroundColor = 'red';
				document.querySelector('#flash-message p').textContent = data.message;
				document.getElementById('show').innerHTML = '<h3 class="text-center white-text">going back to index page in <span id="countdown">3</span> seconds...</h3>';
				let count = 3;
				setInterval(() => {
					document.getElementById('countdown').textContent = count;
					count -= 1;
				}, 1000);
				setTimeout(() => {
					window.location = 'dashboard.html';
				}, 4000);
			} else if (data.status === 'Success') {
				document.getElementById('loading').style.display = 'none';
				const date = data.data.created_at.split('T')[0];
				const html = `
				<article>
					<h3 class="title text-center white-text">${data.data.title}</h3>
					<span class="small-text light-text primary-text"><b>${date}</b></span>
					<div>
						<small><a href="edit.html?entries=${data.data.id}" class="">Modify</a> <a href="delete" class="danger-text delete-entry">Delete</a></small>
					</div>
					<p class="description white-text">
						${data.data.description}
					</p>
				</article>
				`;
				document.getElementById('show').innerHTML = html;
				document.querySelector('.delete-entry').addEventListener('click', (event) => {
					event.preventDefault();
					fetch(`${baseUrl}/entries/${entryId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							token: localStorage.getItem('diary_token'),
						},
					})
						.then(res => res.json())
						.then((newData) => {
							console.log(newData);
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
