"use strict"; 

class Popup {
	constructor(container) {
		this.modal = container;
		this.status = false;

		this.showModal();
	}
	
	checkStatus() {
		this.status = Boolean(localStorage.getItem('popup'));
	}
	
	showModal() {
		this.checkStatus();
		
		if (this.status) {
			return;
		}

		this.modal.classList.add('modal_active');
		this.modal.addEventListener('click', event => {
			if (!event.target.closest('.modal__close')) {
				return;
			}

			event.target.closest('.modal').classList.remove('modal_active');
			localStorage.setItem('popup', 'true')
		});
	}
}

new Popup(document.querySelector('.modal'));