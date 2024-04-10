"use strict";

class elementRevealler {
	constructor(container) {
		this.element = container;

		this.revealingElement();
	}

	revealingElement() {
		setInterval(() => {
			if (this.isActive(this.element)) {
				this.element.classList.add("reveal_active");
				return;
			}
			this.element.classList.remove("reveal_active");
		}, 1000)
	}

	isActive(element) {
		const {top, bottom} = element.getBoundingClientRect();
	
		if (bottom < 0 || top > window.innerHeight) {
			return false;
		}
	
		return true;
	}
}

new elementRevealler(document.querySelector(".reveal"))