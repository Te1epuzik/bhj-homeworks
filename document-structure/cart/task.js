"use strict";

class Shop {
	constructor(container) {
		this.products = Array.from(container.querySelectorAll('.product'));

		this.createProducts();
	}

	createProducts() {
		this.products.forEach(product => {
			new Product(product);
		});
	}
}

class Cart {
	static container = document.querySelector('.cart');
	static cartProducts = document.querySelector('.cart__products');
	static id = [];
	static deleteBtns = Array.from(document.querySelectorAll('.cart__product-delete'));

	static checkCart() {
		if (Cart.id.length !== 0) {
			this.container.classList.add('cart__active');
		} else this.container.classList.remove('cart__active');
	}

	static getQuantity(productId) {
		return this.cartProducts
			.querySelector(`[data-id="${productId}"]`)
			.querySelector('.cart__product-count')
			.textContent;
	}

	static addProduct(productId, image, quantity) {
		if (this.id.includes(productId)) {
			this.cartProducts
				.querySelector(`[data-id="${productId}"]`)
				.querySelector('.cart__product-count')
				.textContent = +this.getQuantity(productId) + quantity;
			
			return;
		}

		this.id.push(productId);
		this.cartProducts.insertAdjacentHTML('beforeEnd', 
			`<div class="cart__product" data-id="${productId}">
			<img class="cart__product-image" src="${image}">
			<div class="cart__product-count">${quantity}</div>
			<div class="cart__product-delete">&#x2716;</div>
			</div>`
		);

		this.checkCart();
		this.deleteBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
			});
		});
	}
}

class Product {
	constructor(container) {
		this.product = container;
		this.productQuantityDec = container.querySelector('.product__quantity-control_dec');
		this.productQuantityInc = container.querySelector('.product__quantity-control_inc');
		this.productQuantityValue = container.querySelector('.product__quantity-value');
		this.addBtn = container.querySelector('.product__add');

		this.countProduct();
		this.addToCart();
	}

	countProduct() {
		let counter = +this.productQuantityValue.textContent;

		this.productQuantityDec.addEventListener('click', () => {
			if (!(counter > 1)) {
				return;
			}

			counter--;
			this.productQuantityValue.textContent = counter;
		});

		this.productQuantityInc.addEventListener('click', () => {
			counter++;
			this.productQuantityValue.textContent = counter;
		});
	}

	addToCart() {
		this.addBtn.addEventListener('click', () => {
			Cart.addProduct(
				this.product.getAttribute('data-id'),
				this.product.querySelector('.product__image').getAttribute('src'),
				+this.productQuantityValue.textContent
			);
		});
	}
}

const shop = new Shop(document.querySelector('.products'));