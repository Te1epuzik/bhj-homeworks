"use strict";

class fontChanger {
  constructor(container) {
    this.book = container;
    this.fontButtons = Array.from(container.querySelectorAll(".font-size"));
    this.colorButtons = Array.from(container.querySelectorAll(".text-color"));
    this.bgButtons = Array.from(container.querySelectorAll(".bg-color"));

    this.changeFontSize();
    this.changeColor();
    this.changeBackground();
  }

  changeFontSize() {
    this.fontButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        this.fontButtons.forEach(activeButton => activeButton.classList.remove("font-size_active"));
        button.classList.add("font-size_active");
        this.book.classList.remove("book_fs-big", "book_fs-small");
        if (button.classList.contains("font-size_small") || button.classList.contains("font-size_big")) {
          this.book.classList.add(`book_fs-${button.getAttribute("data-size")}`);
        }
      });
    });
  }

  changeColor() {
    this.colorButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        this.colorButtons.forEach(activeButton => activeButton.classList.remove("color_active"));
        button.classList.add("color_active");
        this.book.classList.remove("book_color-black", "book_color-gray", "book_color-whitesmoke");
        this.book.classList.add(`book_color-${button.getAttribute("data-text-color")}`);
      });
    });
  }

  changeBackground() {
		this.bgButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        this.bgButtons.forEach(activeButton => activeButton.classList.remove("color_active"));
        button.classList.add("color_active");
        this.book.classList.remove("book_bg-black", "book_bg-gray", "book_bg-white");
        this.book.classList.add(`book_bg-${button.getAttribute("data-bg-color")}`);
      });
    });
  }
}

new fontChanger(document.getElementById("book"));