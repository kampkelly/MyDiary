const baseUrl = 'http://localhost:3000/api/v1';
document.addEventListener('DOMContentLoaded', () => {
	fetch(`${baseUrl}/user/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			token: localStorage.getItem('diary_token'),
		},
	})
		.then(res => res.json())
		.then((data) => {
			console.log(data);
			console.log(data.data.user);
			const dateofbirth = data.data.user.dateofbirth.split('T')[0];
			const createdAt = data.data.user.created_at.split('T')[0];
			const html = `
			<ul class="no-styling">
				<li ><strong>Email:</strong> ${data.data.user.email}</li>
				<li ><strong>Name:</strong> ${data.data.user.fullname}</li>
				<li ><strong>Date of birth:</strong> ${dateofbirth}</li>
				<li ><strong>Date Joined:</strong> ${createdAt}</li>
			</ul>
			<div class="text-center">
				<a href="edit-profile.html" class="underline"><small>Edit Profile</small></a>
				<p class="light-white-text text-center"><small>Total number of entries in diary: 4</small></p>
			</div>
			`;
			document.querySelector('#insert').innerHTML = html;
			fetch(`${baseUrl}/entries`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: localStorage.getItem('diary_token'),
				},
			})
				.then(res => res.json())
				.then((newData) => {
					document.querySelector('.light-white-text small').textContent = `Total number of entries in diary: ${newData.data.length}`;
				});
		});
});
