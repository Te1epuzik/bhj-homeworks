"use strict";

class Cookies {
	static set(key, value, options = {
		expires: null,
		secure: false,
		path: null,
		domain: null,
	}) {

		document.cookie = key
			+ '='
			+ encodeURIComponent(value)
			+ Cookies.paryOptions(options);
	}

	static paryOptions(options) {
		const date = new Date();
		const msInDay = 1000 * 3600 * 24;
		let expiresInner = '';
		let secureInner = '';
		let pathInner = '';
		let domainInner = '';
		if (options.expires && !isNaN(+options.expires)) {
			expiresInner = `;expires=${new Date(+options.expires * msInDay + date.getTime())}`;
		}
		if (options.secure) { secureInner = ';secure' }
		if (options.path && options.path instanceof String) { pathInner = `;path=${options.path}` }
		if (options.domain && options.domain instanceof String) { domainInner = `;domain=${options.domain}` }
		return expiresInner + secureInner + pathInner + domainInner;
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

		this.startlogin();
	}

	static url = 'https://students.netoservices.ru/nestjs-backend/auth';

	startlogin() {
		this.isSigned();

		this.form.addEventListener('submit', event => {
			event.preventDefault();

			this.removeErrors();
			this.sendRequest('POST', Auth.url, this.getFormData())
				.then(response => {
					this.clearForm();
					console.log(response);
					if (!response.success) {
						this.errorSuccess.classList.add('signin__error_active');
						return;
					}

					Cookies.set('id', response.user_id, { expires: 30 });
					this.isSigned();
				})
				.catch(error => {
					this.clearForm();
					for (let i = 0; i < error.message.length; i++) {
						console.log(error.message[i]);
					}

					this.errorEmpty.classList.add('signin__error_active');
				});
		});
	}

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

	removeErrors() {
		this.errorSuccess.classList.remove('signin__error_active');
		this.controls.forEach(control => {
			control.addEventListener('input', () => {
				if (!control.value) {
					return;
				}

				this.errorEmpty.classList.remove('signin__error_active');
			});
		});
	}

	clearForm() {
		this.controls.forEach(control => {
			control.value = null;
		});
	}

	getFormData() {
		const body = {};
		const form = new FormData(this.form);
		for (let data of form) {
			body[data[0]] = encodeURIComponent(data[1]);
		}
		return body;
	}
}

new Auth(document.querySelector('.card'));
