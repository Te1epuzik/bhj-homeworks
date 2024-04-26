"use strict";

class Poll {
  constructor(container) {
    this.xhr = new XMLHttpRequest();
    this.xhrp = new XMLHttpRequest();

		this.container = container;
    this.pollTitle = container.querySelector('.poll__title');
    this.pollAnswers = container.querySelector('.poll__answers');

    this.getRequest();
  }

  startPoll() {
    
  }

  getRequest() {
    this.xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

    // try {
    //   this.xhr.send();
    //   setTimeout(() => {
    //     if (this.xhr.status != 200) {
    //       alert(`Ошибка ${this.xhr.status}: ${this.xhr.statusText}`);
    //     }
    //   }, 30000);
    // } catch(err) {
    //   alert("Запрос не удался");
    //   return;
    // }

    this.xhr.send();
    
    this.xhr.addEventListener('readystatechange', () => {
      if (this.xhr.readyState !== this.xhr.DONE) {
        return;
      }
      
      this.pollResponse = JSON.parse(this.xhr.response);

      this.xhr.abort();
      console.log(this.pollResponse);
      this.pollTitle.insertAdjacentHTML('afterBegin', `${this.pollResponse.data.title}`);
      
      this.pollResponse.data.answers.forEach(answer => {
        this.pollAnswers.insertAdjacentHTML('afterBegin', 
        `<button class="poll__answer">
        ${answer}
        </button>`
      );
    });

      this.postRequest();
    });
  }

  postRequest() {
    this.pollAnswers.addEventListener('click', event => {
      if (!event.target.closest('.poll__answer')) {
        return;
      }

      alert('Ваш голос засчитан!');
      this.xhrp.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
      this.xhrp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      const id = this.pollResponse.id;
      const answerNum = this.pollResponse.data.answers.indexOf(event.target.textContent);

      // try {
      //   this.xhr.send(`vote=${id}&answer=${answerNum}`);
      //   if (this.xhr.status != 200) {
      //     alert(`Ошибка ${this.xhr.status}: ${this.xhr.statusText}`);
      //   }
      // } catch(err) {
      //   alert("Запрос не удался");
      //   return;
      // }

      this.xhrp.send(`vote=${id}&answer=${answerNum}`);

      this.xhrp.addEventListener('readystatechange', () => {
        if (this.xhrp.readyState !== this.xhrp.DONE) {
          return;
        }
        
        this.statResponse = JSON.parse(this.xhrp.response);
        this.xhrp.abort();
        console.log(this.statResponse);
        this.pollAnswers.classList.remove('poll__answers_active');
        let votesQuantity = 0;
        this.statResponse.stat.forEach(item => {
          votesQuantity += item.votes;
        });
        this.statResponse.stat.forEach((item, index) => {
          this.pollTitle.insertAdjacentHTML('afterEnd', 
          `<div class="stat__answers">
          <p class="stat__answer" data-id="${index}">${item.answer}: <span class="stat__vote">${+(100 * item.votes / votesQuantity).toFixed(2)}%</span></p>
          </div>`);

					

					// if (index === answerNum) {
					// 	this.container.querySelector(`[data-id="${index}"]`).style.fontWeight = 'bold';
					// }
        });
      });
    });
  }
}

new Poll(document.querySelector('.card'));
