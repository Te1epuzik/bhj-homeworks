"use strict";

class Tooltip {
	constructor(container) {
		this.container = container;
		this.links = Array.from(container.querySelectorAll('.has-tooltip'));

		this.createTooltips();
		this.showTooltip();
	}

	createTooltips() {
		this.links.forEach(link => {
			const linkPosition = link.getBoundingClientRect();
			let tooltipPosition = null;
			switch(link.getAttribute('data-position')) {
				case 'top': 
					tooltipPosition = `left: ${linkPosition.left}px; bottom: ${document.documentElement.clientHeight - linkPosition.top + 2}px`;
					break;
				case 'left':
					tooltipPosition = `right: ${document.documentElement.clientWidth - linkPosition.left + 2}px; top: ${linkPosition.top}px`;
					break;
				case 'right':
					tooltipPosition = `left: ${linkPosition.right + 2}px; top: ${linkPosition.top}px`;
					break;
				case 'bottom':
					tooltipPosition = `left: ${linkPosition.left}px; top: ${linkPosition.bottom + 2}px`;
					break;
			}

			link.insertAdjacentHTML('afterEnd', 
			`<div class="tooltip" style="${tooltipPosition}">
      ${link.getAttribute('title')}
    	</div>`
			);
		});
	}

	showTooltip() {
		this.container.addEventListener('click', event => {
			event.preventDefault();
			if (!event.target.closest('.has-tooltip')) {
				this.links.forEach(link => {
					link.nextElementSibling.classList.remove('tooltip_active');
				});
				return;
			}

			this.links.forEach(link => {
				link.nextElementSibling.classList.remove('tooltip_active');
			});
			event.target.nextElementSibling.classList.toggle('tooltip_active');
		});
	}
}

new Tooltip(document.querySelector('body'));