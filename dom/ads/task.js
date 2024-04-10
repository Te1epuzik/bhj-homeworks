"use strict";

class adSwitcher {
	constructor(container) {
		this.ad = container.querySelector(".rotator .rotator__case_active");
		this.speed = +this.ad.getAttribute("data-speed");
		this.color = this.ad.getAttribute("data-color");

		this.switchAd();
	}

	switchAd() {
		this.ad.style.color = this.color;
		setInterval(() => {
			this.ad.classList.remove("rotator__case_active");

			if (this.ad.nextElementSibling) {
				this.ad = this.ad.nextElementSibling;
				this.color = this.ad.getAttribute("data-color");
				this.speed = this.ad.getAttribute("data-speed");
				
			}  else {
				this.ad = this.ad.parentElement.firstElementChild;
				this.color = this.ad.getAttribute("data-color");
				this.speed = this.ad.getAttribute("data-speed");
			};
			
			this.ad.style.color = this.color;
			this.ad.classList.add("rotator__case_active");
		}, this.speed);
	}
}

new adSwitcher(document.querySelector(".card"))