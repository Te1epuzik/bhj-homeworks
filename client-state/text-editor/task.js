"use strict";

class TextEditor {
	constructor(container) {
		this.editor = container.querySelector('#editor');
		this.clearBtn = container.querySelector('.clear-btn');
		this.savedText = null;

		this.saveChanges();
		this.loadSaves();
		this.clearText();
	}

	loadSaves() {
		this.savedText = localStorage.getItem('Text');

		if (!this.savedText) {
			return;
		}

		this.editor.value = this.savedText;
	}

	saveChanges() {
		this.editor.addEventListener('input', () => {
			if (!this.editor.value) {
				localStorage.removeItem('Text');
				return;
			}

			localStorage.setItem('Text', this.editor.value);
		});
	}

	clearText() {
		this.clearBtn.addEventListener('click', event => {
			event.preventDefault();
			if (!this.editor.value) {
				return;
			}

			this.editor.value = null;
			localStorage.removeItem('Text');
		});
	}
}

new TextEditor(document.querySelector('.card'));