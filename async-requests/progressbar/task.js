"use strict";

class FileLoader {
	constructor(container) {
		this.xhr = new XMLHttpRequest();

		this.startLoading();
	}

	startLoading() {
		this.xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/upload');

		this.xhr.send();

		this.xhr.addEventListener('readystatechange', () => {
			console.log(this.xhr.response)
		});
	}
}

new FileLoader(document.querySelector('.card'));