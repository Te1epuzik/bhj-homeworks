"use strict"

(function startTimer() {
	const timer = document.getElementById("timer");
	let hours = +timer.textContent.slice(0, 2);
	let minutes = +timer.textContent.slice(3, 5);
	let seconds = +timer.textContent.slice(-2);
	let time = hours * 3600 + minutes * 60 + seconds;
	let intervalId = setInterval(() => {
		if (time === 0) {
			alert("Вы победили в конкурсе!");
			window.location.assign("http://hello.kitty");
			clearInterval(intervalId);
			return;
		}
		time--;
		hours = Math.floor(time / 3600);
		hours = hours < 10 ? "0" + hours : hours;
		minutes = Math.floor((time - hours * 3600) / 60);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = time % 60;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		timer.innerHTML = `${hours}:${minutes}:${seconds}`
	}, 1000)
}());