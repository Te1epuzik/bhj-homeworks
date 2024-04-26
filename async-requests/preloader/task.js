"use strict";

class RatesRequest {
  constructor(container) {
    this.items = container.querySelector('#items');
    this.loader = container.querySelector('.loader');
    this.xhr = new XMLHttpRequest();
    this.rates = null;
    
    this.startRequest();
  }

  startRequest() {
    this.xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    this.xhr.send();
    this.xhr.addEventListener('readystatechange', () => {
      if (this.xhr.readyState === this.xhr.DONE) {
        this.rates = JSON.parse(this.xhr.responseText);
        console.log(this.rates.response);

        Object.keys(this.rates.response.Valute).forEach(val => {
          this.items.insertAdjacentHTML('afterBegin', 
          `<div class="item"><div class="item__code">
          ${this.rates.response.Valute[val].CharCode}
          </div>
          <div class="item__value">
          ${this.rates.response.Valute[val].Value}
          </div>
          <div class="item__currency">
          ${this.rates.response.Valute[val].Name}
          </div></div>`
          );
        });

        this.loader.classList.remove('loader_active');
      }
    });
  }
}

new RatesRequest(document.querySelector('.card'));
