const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
document.getElementById('change_settings').addEventListener('click', () => {
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form button')[0].removeAttribute('disabled');
	document.querySelectorAll('#profile #settings form input[type="time"]')[0].style.backgroundColor = 'white';
	document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	document.querySelectorAll('#profile #settings form button')[0].style.color = 'white';
	document.querySelectorAll('#profile #settings form button')[0].innerHTML = 'Save';
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseover', () => {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#8c8c8c';
	});
	document.querySelectorAll('#profile #settings form button')[0].addEventListener('mouseleave', () => {
		document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
	fetch(`${baseUrl}/user/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			document.getElementById('loading').style.display = 'none';
			console.log(data.user);
			let dateofbirth = ' ';
			if (data.user.dateofbirth && data.user.dateofbirth !== ' ') {
				// eslint-disable-next-line
				dateofbirth = data.user.dateofbirth.split('T')[0];
			}
			const createdat = data.user.createdat.split('T')[0];
			const html = `
			<ul class="no-styling">
				<li ><strong>Email:</strong> ${data.user.email}</li>
				<li ><strong>Name:</strong> ${data.user.fullname}</li>
				<li ><strong>Date of birth:</strong> ${dateofbirth}</li>
				<li ><strong>Date Joined:</strong> ${createdat}</li>
			</ul>
			<div class="">
				<a href="edit-profile.html" class="underline"><small>Edit Profile</small></a>
				<p class="light-white-text"><small>Total number of entries in diary: 4</small></p>
			</div>
			`;
			document.querySelector('#insert').innerHTML = html;
			if (data.user.remindertime !== null) document.querySelector('#profile_details #notification_time').textContent = data.user.remindertime;
			document.querySelector('input[type="time"]').value = data.user.remindertime;
			fetch(`${baseUrl}/entries`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: localStorage.getItem('diary_token'),
				},
			})
				.then(res => res.json())
				.then((newData) => {
					document.querySelector('.light-white-text small').textContent = `Total number of entries in diary: ${newData.entries.length}`;
				});
		});
});
