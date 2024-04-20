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
	static productId = [];

	static checkCart() {
		if (this.productId.length !== 0) {
			this.container.classList.add('cart__active');
		} else {
			this.container.classList.remove('cart__active');
		}
	}

	static getQuantity(productId) {
		return this.cartProducts
			.querySelector(`[data-id="${productId}"]`)
			.querySelector('.cart__product-count')
			.textContent;
	}

	static addProduct(productId, image, quantity) {
		if (this.productId.includes(productId)) {
			this.cartProducts
				.querySelector(`[data-id="${productId}"]`)
				.querySelector('.cart__product-count')
				.textContent = +this.getQuantity(productId) + quantity;
			
			return this.cartProducts;
		}

		this.productId.push(productId);
		this.cartProducts.insertAdjacentHTML('beforeEnd',
			`<div class="cart__product" data-id="${productId}">
			<img class="cart__product-image" src="${image}">
			<div class="cart__product-count">${quantity}</div>
			<div class="cart__product-delete">&#x2716;</div>
			</div></div>`
		);

		this.checkCart();
		this.cartProducts.addEventListener('click', event => {
			if (!event.target.closest('.cart__product-delete')) {
				return;
			}

			const currentId = event.target.parentElement.getAttribute('data-id');

			this.productId = this.productId.filter(id => id !== currentId);
			event.target.closest('.cart__product').remove();
			this.checkCart();
		});

		return this.cartProducts;
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
		this.product.addEventListener('click', event => {
			if (!event.target.closest('.product__add')) {
				return;
			}

			const productId = this.product.getAttribute('data-id');
			const image = this.product.querySelector('.product__image').getAttribute('src');
			const quantity = +this.productQuantityValue.textContent;
			const cartProducts = Cart.addProduct(
				productId,
				image,
				quantity
			);

			this.moveCartAnimation(cartProducts, productId, image);
		});
	}

	moveCartAnimation(cartProducts, productId, image) {
		this.product.insertAdjacentHTML('beforeEnd', 
			`<img class="cart__product-image cart__product-image_animated" src="${image}">`
		);

		const productImagePosition = this.product
				.querySelector('.product__image')
				.getBoundingClientRect();
				
			console.log(productImagePosition);

		const cartImagePosition = cartProducts
			.querySelector(`[data-id="${productId}"]`)
			.querySelector('.cart__product-image')
			.getBoundingClientRect();
			
		console.log(cartImagePosition);

		const cartImageAnimated = this.product.lastChild;

		console.log(cartImageAnimated);

		let prTop = productImagePosition.top - 13;
		let prLeft = productImagePosition.left;
		const cartTop = cartImagePosition.top;
		const cartLeft = cartImagePosition.left;

		const prTopStatic = prTop;
		const prLeftStatic = prLeft;

		cartImageAnimated.style.top = `${prTop}px`;
		cartImageAnimated.style.left = `${prLeft}px`;

		const frames = 240;

		let intervalId = setInterval(() => {
			if (prLeft >= cartLeft || prTop <= cartTop) {
				clearInterval(intervalId);
				cartImageAnimated.remove();
				return;
			}

			cartImageAnimated.style.top = `${prTop}px`;
			cartImageAnimated.style.left = `${prLeft}px`;

			prLeft += (cartLeft - prLeftStatic) * 5 / frames;
			prTop -= (prTopStatic - cartTop) * 5 / frames;
		}, 1000 / frames);
	}
}

const shop = new Shop(document.querySelector('.products'));