"use strict";

class FileLoader {
	constructor(container) {
		this.progress = container.querySelector('#progress');
		this.fileInput = container.querySelector('#file');
		this.form = container.querySelector('#form');

		this.startLoading();
	}

	static URL = 'https://students.netoservices.ru/nestjs-backend/upload';

	sendRequest(method, URL, body = null) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, URL, true);
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-type', 'application/json');

			xhr.addEventListener('load', event => {
				event.preventDefault();
				
				if (xhr.status >= 400) {
					reject(xhr.response);
				} else {
					console.log(xhr.response);
					resolve(xhr.response);
				}
			});
			
			if (!(body instanceof String)) {
				body = JSON.stringify(body);
			}
			
			xhr.upload.addEventListener('progress', event => {
				console.log(event.loaded);
			});
			xhr.send(body);
		});
	}
	
	startLoading() {
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			if (!this.fileInput.files[0]) {
				return;
			}
			console.log(this.fileInput.files[0]);
			const body = this.fileInput.files[0];
			this.sendRequest('POST', FileLoader.URL, body);
		});
	}
}

new FileLoader(document.querySelector('.card'));
