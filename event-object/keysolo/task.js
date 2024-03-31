"use strict";

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода символа вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */

		let intervalId;
		this.startTimer();
		document.body.addEventListener("keydown", event => {
			if (event.key === this.currentSymbol.textContent) {
				this.success(); 
				clearInterval(intervalId);
				startTimer();
			}
			else  {
				this.fail();

				clearInterval(intervalId);
				startTimer();
			}
		});
  }

	startTimer(intervalId) {
		debugger;
		const loss = document.querySelector(".status__loss");
		const symbols = Array.from(document.querySelectorAll(".symbol"));
		const timer = document.querySelector(".status__timer");
		timer.innerHTML = symbols.length;
		let time = symbols.length;
		let tryCounter = +loss.textContent;
		intervalId = setInterval(() => {
			if (time === 0 && tryCounter === 2) {
				this.fail();
				clearInterval(intervalId);
				return;
			} else if (time === 0) {
				tryCounter++;
      	this.fail();
				timer.innerHTML = symbols.length;
				time = symbols.length;
			}
			time--;
			timer.innerHTML = time;
		}, 1000);
	}

  success() {
		
		if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
		
    if (this.currentSymbol !== null) {
			this.currentSymbol.classList.add('symbol_current');
      return;
    }
		
    if (++this.winsElement.textContent === 10) {
			alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));

