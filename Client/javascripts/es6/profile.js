const baseUrl = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
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
			const dateofbirth = data.user.user.dateofbirth.split('T')[0];
			const createdAt = data.user.user.created_at.split('T')[0];
			const html = `
			<ul class="no-styling">
				<li ><strong>Email:</strong> ${data.user.user.email}</li>
				<li ><strong>Name:</strong> ${data.user.user.fullname}</li>
				<li ><strong>Date of birth:</strong> ${dateofbirth}</li>
				<li ><strong>Date Joined:</strong> ${createdAt}</li>
			</ul>
			<div class="">
				<a href="edit-profile.html" class="underline"><small>Edit Profile</small></a>
				<p class="light-white-text"><small>Total number of entries in diary: 4</small></p>
			</div>
			`;
			document.querySelector('#insert').innerHTML = html;
			if (data.user.user.remindertime !== null) document.querySelector('#profile_details #notification_time').textContent = data.user.user.remindertime;
			document.querySelector('input[type="time"]').value = data.user.user.remindertime;
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
