"use strict";

class Tabs {
	constructor(container) {
		this.container = container;
		this.tabs = Array.from(container.querySelectorAll(".tab"));
		this.tabContents = Array.from(container.querySelectorAll(".tab__content"));

		this.switchTab();
	}

	switchTab() {
		this.tabs.forEach(tab => {
			tab.addEventListener("click", () => {
				this.tabs.forEach(tab => tab.classList.remove("tab_active"));
				tab.classList.add("tab_active");
				this.tabContents.forEach(content => content.classList.remove("tab__content_active"));
				this.tabContents[this.tabs.indexOf(tab)].classList.add("tab__content_active")
			});
		});
	}
}

new Tabs(document.getElementById("tabs1"));
