"use strict";

(function dropDownList() {
	const dropDownMenu = document.querySelector(".dropdown__value");
	const dropDownList = document.querySelector(".dropdown__list");
	const dropDownItems = Array.from(document.querySelectorAll(".dropdown__link"));

	dropDownMenu.addEventListener("click", () => {
		dropDownList.classList.toggle("dropdown__list_active");
	});

	for (let dropDownItem of dropDownItems) {
		dropDownItem.addEventListener("click", event => {
			event.preventDefault();
			dropDownMenu.innerHTML = dropDownItem.textContent;
			dropDownList.classList.remove("dropdown__list_active");
		});
	};
}());