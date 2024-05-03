"use strict";

class TextEditor {
	constructor(container) {
		this.editor = container.querySelector('#editor');
		this.clearBtn = container.querySelector('.clear-btn');

		this.saveChanges();
		this.loadSaves();
		this.clearText();
	}

	loadSaves() {
		this.editor.value = localStorage.getItem('Text');
	}

	saveChanges() {
		this.editor.addEventListener('input', () => {
			localStorage.setItem('Text', this.editor.value);
		});
	}

	clearText() {
		this.clearBtn.addEventListener('click', event => {
			event.preventDefault();

			this.editor.value = null;
			localStorage.removeItem('Text');
		});
	}
}

new TextEditor(document.querySelector('.card'));
