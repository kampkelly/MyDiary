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
			document.querySelector('input[type="email"]').value = data.user.user.email;
			document.querySelector('input[type="text"]').value = data.user.user.fullname;
			document.querySelector('input[type="date"]').valueAsDate = new Date(data.user.user.dateofbirth);
		});
});
