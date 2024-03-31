"use strict";

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
		this.symbols;
		this.timer;

		this.intervalId;

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

		this.startTimer();
		document.body.addEventListener("keydown", event => {
			if (event.key === this.currentSymbol.textContent) {
				this.success(); 
			}
			else  {
				this.fail();
			}
		});
  }

	startTimer() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}

		this.lossElement = document.querySelector('.status__loss');
		this.symbols = Array.from(document.querySelectorAll(".symbol"));
		this.timer = document.querySelector(".status__timer");
		this.timer.innerHTML = this.symbols.length;
		let time = this.symbols.length;
		let tryCounter = +this.lossElement.textContent;
		this.intervalId = setInterval(() => {
			if (time === 0 && tryCounter === 2) {
				this.fail();
				clearInterval(this.intervalId);
				return;
			} else if (time === 0) {
				tryCounter++;
      	this.fail();
				this.timer.innerHTML = this.symbols.length;
				time = this.symbols.length;
			}
			time--;
			this.timer.innerHTML = time;
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
		this.startTimer();
  }

  fail() {
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
		this.startTimer();
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

