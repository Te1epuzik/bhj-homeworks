"use strict"

const dead = document.getElementById("dead");
const lost = document.getElementById("lost");

(function tryToKill() {
	let clickHole = index => document.getElementById(`hole${index}`)
	for (let i = 0; i < 9; i++) {
		clickHole(i + 1).onclick = () => {
			if (!clickHole(i + 1).className.includes("hole_has-mole")) {
				lost.innerHTML = +lost.textContent + 1;
			} else dead.innerHTML = +dead.textContent + 1;

			if (+lost.textContent === 5) {
				alert("Вы проиграли!");
				lost.innerHTML = 0;
				dead.innerHTML = 0;
			} else if (+dead.textContent === 10) {
				alert("Победа!");
				lost.innerHTML = 0;
				dead.innerHTML = 0;
			}
		}
	}
})();