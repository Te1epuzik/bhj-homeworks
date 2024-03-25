"use strict"

function clickSpeedDecorator() {
	let curentClick = null;
	let lastClick = null;
	let clickSpeed;
	return () => {
		curentClick = Date.now() / 1000;
		if (lastClick) {
			clickSpeed = 1 / (curentClick - lastClick);
			lastClick = curentClick;
			return clickSpeed;
		}
		lastClick = curentClick;
		return 1;
	}
}

const cookie = document.getElementById("cookie");
const clickerCounter = document.getElementById("clicker__counter");
const clickerSpeed = document.getElementById("clicker__speed");

(function startClicker() {
	let clickSpeed = clickSpeedDecorator();
	cookie.onclick = () => {
		clickerCounter.innerHTML = `${+clickerCounter.textContent + 1}`;
		cookie.style.width = cookie.style.width === "400px" ? "300px" : "400px";

		clickerSpeed.textContent = +clickSpeed().toFixed(2);
	}
}());