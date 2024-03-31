"use strict"; 

(function switchTab() {
	const tabs = Array.from(document.querySelectorAll(".tab"));
	const tabContents = Array.from(document.querySelectorAll(".tab__content"));

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			tabs.forEach(tab => tab.classList.remove("tab_active"));
			tab.classList.add("tab_active");
			tabContents.forEach(content => content.classList.remove("tab__content_active"));
			tabContents[tabs.indexOf(tab)].classList.add("tab__content_active")
		});
	});
}())