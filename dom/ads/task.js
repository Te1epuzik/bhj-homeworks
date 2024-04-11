"use strict";

class adSwitcher {
	constructor(container) {
		this.currentAd = container.querySelector(".rotator .rotator__case_active");
		this.speed = +this.currentAd.getAttribute("data-speed");
		this.color = this.currentAd.getAttribute("data-color");
		this.timerId = null;

		this.startAd();
	}

	startAd() {
		if (this.timerId) {
			clearTimeout(this.timerId);
		}

		this.currentAd.style.color = this.color;
		this.loopTimeout();
	}

	switchAd() {
		this.currentAd.style.color = this.color;
		this.currentAd.classList.remove("rotator__case_active");

		if (this.currentAd.nextElementSibling) {
			this.currentAd = this.currentAd.nextElementSibling;	
		}  else {
			this.currentAd = this.currentAd.parentElement.firstElementChild;
		};

		this.color = this.currentAd.getAttribute("data-color");
		this.speed = this.currentAd.getAttribute("data-speed");
			
		this.currentAd.style.color = this.color;
		this.currentAd.classList.add("rotator__case_active");
	}

	loopTimeout() {
		if (this.timerId) {
			clearTimeout(this.timerId)
		}

		this.timerId = setTimeout(() => {
			this.switchAd();
			this.loopTimeout();
		}, this.speed);
	}
}

new adSwitcher(document.querySelector(".card"));