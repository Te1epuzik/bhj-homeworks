"use strict";

class Auth {
	constructor(container) {
		this.signin = container.querySelector('.signin');
		this.form = container.querySelector('#signin__form');
		this.authStatus = null;

		this.login();
	}

	login() {
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			
		});
	}
}

new Auth(document.querySelector('.card'));