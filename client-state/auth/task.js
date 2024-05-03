"use strict";

class Cookies {
	static set(key, value, days = null) {
		const date = new Date();
		const msInDay = 1000 * 3600 * 24;
		let expires = '';
		if (days && !isNaN(+days)) {
			expires = `;expires=${new Date(+days * msInDay + date.getTime())}`;
		}

		document.cookie = key
			+ '='
			+ encodeURIComponent(value)
			+ expires;
	}

	static get(key) {
		const cookie = document.cookie
			.split('; ')
			.find(cookie => cookie.startsWith(key + '='));

		if (!cookie) {
			return null;
		}

		return cookie.substring(key.length + 1);
	}

	static remove(key) {
		document.cookie = key + `=;expires=${new Date(0)}`;
	}
}

class Auth {
	constructor(container) {
		this.controls = Array.from(container.querySelectorAll('.control'));
		this.errorEmpty = container.querySelector('.signin__error-empty');
		this.errorSuccess = container.querySelector('.signin__error-success');
		this.signin = container.querySelector('.signin');
		this.welcome = container.querySelector('.welcome');
		this.userId = container.querySelector('#user_id');
		this.form = container.querySelector('#signin__form');
		this.signout = container.querySelector('#signout__btn');

		this.login();
	}

	static url = 'https://students.netoservices.ru/nestjs-backend/auth';

	sendRequest(method, url, body = null) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-type', 'application/json');

			xhr.addEventListener('load', event => {
				event.preventDefault();

				if (xhr.status >= 400) {
					reject(xhr.response);
				} else {
					resolve(xhr.response);
				}
			});

			if (!body) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(body));
			}
		});
	}

	isSigned() {
		if (!Cookies.get('id')) {
			this.signin.classList.add('signin_active');
			this.welcome.classList.remove('welcome_active');
			this.userId.textContent = null;
			return;
		}

		this.signin.classList.remove('signin_active');
		this.welcome.classList.add('welcome_active');
		this.userId.textContent = Cookies.get('id');
		this.logout();
	}

	logout() {
		this.signout.addEventListener('click', event => {
			event.preventDefault();

			Cookies.remove('id');
			this.isSigned();
		});
	}

	login() {
		this.isSigned();

		this.form.addEventListener('submit', event => {
			event.preventDefault();
			this.errorSuccess.classList.remove('signin__error_active');

			this.controls.forEach(control => {
				control.addEventListener('input', () => {
					if (!control.value) {
						return;
					}

					this.errorEmpty.classList.remove('signin__error_active');
				});
			});

			const body = {};
			const form = new FormData(this.form);
			for (let data of form) {
				body[data[0]] = encodeURIComponent(data[1]);
			}
			console.log(body);
			this.controls.forEach(control => {
				control.value = null;
			});
			this.sendRequest('POST', Auth.url, body)
				.then(response => {
					console.log(response);
					if (!response.success) {
						this.errorSuccess.classList.add('signin__error_active');
						return;
					}

					Cookies.set('id', response.user_id, 30);
					this.isSigned();
				})
				.catch(error => {
					for (let i = 0; i < error.message.length; i++) {
						console.log(error.message[i]);
					}

					this.errorEmpty.classList.add('signin__error_active');
				});
		});
	}
}

new Auth(document.querySelector('.card'));
