"use strict";

class Poll {
	constructor(container) {
		this.container = container;
		this.pollTitle = container.querySelector('.poll__title');
		this.pollAnswers = container.querySelector('.poll__answers');
		this.currentQuestionId = null;

		this.startPoll();
	}

	static URL = 'https://students.netoservices.ru/nestjs-backend/poll';

	startPoll() {
		this.sendRequest('GET', Poll.URL)
			.then(response => {
				this.currentQuestionId = response.id;
				this.renderQuestion(response);
				this.activateAnswers();
			})
			.catch(() => {
				console.log('Не удалось загрузить опрос');
			});
	}

	sendRequest(method, url, body = null) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.responseType = 'json';
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			xhr.addEventListener('load', () => {
				if (xhr.status >= 400) {
					reject(xhr.response);
				} else {
					console.log(xhr.response);
					resolve(xhr.response);
				}
			});

			xhr.addEventListener('error', () => {
				reject(xhr.response);
			});

			if (body instanceof Object) {
				body = JSON.stringify(body);
			}

			xhr.send(body);
		});
	}

	renderQuestion(response) {
		this.pollTitle.insertAdjacentHTML('afterBegin', `${response.data.title}`);

		response.data.answers.forEach((answer, index) => {
			this.pollAnswers.insertAdjacentHTML('afterBegin',
				`<button class="poll__answer" data-index="${index}">
			${answer}
			</button>`
			);
		});
	}

	renderStat(data, clicked) {
		this.pollAnswers.classList.remove('poll__answers_active');
		let votesQuantity = 0;

		data.stat.forEach(item => {
			votesQuantity += item.votes;
		});

		data.stat.forEach((item, index) => {
			this.pollTitle.insertAdjacentHTML('afterEnd',
				`<div class="stat__answers">
					<p class="stat__answer" data-id="${index}">
						${item.answer}: 
						<span class="stat__vote">
							${+(100 * item.votes / votesQuantity).toFixed(2)}%
						</span>
					</p>
		    </div>`);
		});

		this.container.querySelector(`[data-id="${clicked}"]`).style.color = 'blue';
	}

	activateAnswers() {
		this.pollAnswers.addEventListener('click', event => {
			event.preventDefault();
			if (!event.target.closest('.poll__answer')) {
				return;
			}

			const clickedNum = event.target.getAttribute('data-index');

			const body = `vote=${this.currentQuestionId}&answer=${clickedNum}`;

			this.sendRequest('POST', Poll.URL, body)
				.then(response => {
					alert('Ваш голос засчитан!');
					this.renderStat(response, clickedNum);
				})
				.catch(() => console.log('Ошибка'));
		});
	}
}

new Poll(document.querySelector('.card'));
