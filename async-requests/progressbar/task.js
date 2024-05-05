"use strict";

class FileLoader {
	constructor(container) {
		this.progress = container.querySelector('#progress');
		this.fileInput = container.querySelector('#file');
		this.form = container.querySelector('#form');

		this.startLoading();
	}

	static URL = 'https://students.netoservices.ru/nestjs-backend/upload';

	sendRequest(options = {
		method: 'GET',
		url,
		body: null,
		async: true,
	}) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(options.method, options.url, options.async);
			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-type', 'multipart/form-data');

			xhr.addEventListener('load', event => {
				event.preventDefault();
				
				if (xhr.status >= 400) {
					reject(xhr.response);
				} else {
					resolve(xhr.response);
				}
			});
			
			
			xhr.upload.addEventListener('progress', event => {
				this.progress.value = event.loaded / event.total;
			});
			
			if (!options.body) {
				xhr.send();
			} else {
				xhr.send(options.body);
			}
		});
	}
	
	startLoading() {
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			if (!this.fileInput.files[0]) {
				return;
			}

			const formData = new FormData(this.form);
			formData.forEach(data => {
				console.log(data);
			});
			this.sendRequest({
				method: 'POST', 
				url: FileLoader.URL, 
				body: formData,
				async: true,
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
		});
	}
}

new FileLoader(document.querySelector('.card'));
