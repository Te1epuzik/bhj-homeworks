"use strict";

class Cookies {
	static set(key, value, days = null) {
		const date = new Date();
		const msInDay = 1000 * 3600 * 24;
		let expires = '';
		if (expires && !isNaN(+expires)) {
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

class Popup {
	constructor(container) {
		this.modal = container;

		this.showModal();
	}

	static isActive() {
		return Boolean(Cookies.get('modalStatus'));
	}

	showModal() {
		if (Popup.isActive()) {
			return;
		}

		this.modal.classList.add('modal_active');
		this.modal.addEventListener('click', event => {
			if (!event.target.closest('.modal__close')) {
				return;
			}

			event.target.closest('.modal').classList.remove('modal_active');
			Cookies.set('modalStatus', 'true', 90);
		});
	}
}

new Popup(document.querySelector('.modal'));
