import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  #currency = '&#8364;';
  cartItems = []; // [product: {...}, count: N]
  #modal;
  #orderForm;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }
  get modal() { return this.#modal; }
  addProduct(product) {
    if (!(product && typeof product === 'object' && product.id)) return;

    let  
      cartItem,
      findItem = this.cartItems.find( el => el.product.id === product.id);

    if (findItem) {
      findItem.count++
      cartItem = findItem
    } else {
      cartItem = {product, count: 1};
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let 
      cartItems = this.cartItems, 
      findItemIndex = cartItems.findIndex( el => el.product.id === productId)
    ;
    cartItems[findItemIndex].count += amount;
    this.onProductUpdate(cartItems[findItemIndex])
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, el) => sum + el.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, el) => sum + el.product.price * el.count, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal;
    modal.setTitle('Your order');
    let modalBody = document.createElement('div')
    this.cartItems.forEach(el => {
      let currentProduct = this.renderProduct(...Object.values(el));
      currentProduct.addEventListener('click', e => {
        let incrementBtn = e.target.closest('.cart-counter__button');
        if ( incrementBtn ) {
          let 
            amount = incrementBtn.classList.contains('cart-counter__button_plus') ? 1 : -1,
            prodId = incrementBtn.closest('[data-product-id]') 
              ? incrementBtn.closest('[data-product-id]').dataset.productId 
              : undefined
          ;
          if (prodId) this.updateProductCount(prodId, amount)
        }
      });
      modalBody.append(currentProduct)
    });
    this.#orderForm = this.renderOrderForm();
    this.#orderForm.addEventListener('submit', e => this.onSubmit(e));
    modalBody.append(this.#orderForm);
    modal.setBody(modalBody);
    this.#modal = modal;
    this.#modal.open();
  }

  onProductUpdate(cartItem) {
    let 
      cartItems = this.cartItems,
      currentItemIndex = cartItems.findIndex( el => el.product.id === cartItem.product.id)
    ;
    (cartItem.count <= 0) && cartItems.splice(currentItemIndex, 1);

    if (this.#modal && this.#modal.isOpen) {
      let 
        productId = cartItem.product.id,
        modalBody = this.#modal.elemBody,
        productNode = modalBody.querySelector(`[data-product-id="${productId}"]`),
        infoPrice = modalBody.querySelector(`.cart-buttons__info-price`)
      ;
      
      if (cartItem.count > 0) {
        let 
          productCount = productNode.querySelector(`[data-product-id="${productId}"] .cart-counter__count`),
          productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

        if (productCount) productCount.innerHTML = cartItem.count;
        if (productPrice) productPrice.innerHTML = `${this.#currency}${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      } else {
        if (this.isEmpty()) this.#modal.close();
        productNode.remove();
    }

    infoPrice.innerHTML = `${this.#currency}${this.getTotalPrice().toFixed(2)}`
  }
    
  this.cartIcon.update(this);

  }

  async onSubmit(e) {
    e.preventDefault();
    e.target.querySelector('[type="submit"]').classList.add('is-loading');
    let formData = new FormData(this.#orderForm);
    let response = await fetch('https://httpbin.org/post', {method: 'POST',  body:formData});
    if (response.ok) {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.#modal.setTitle('Success!');
      this.#modal.setBody(createElement('<p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p>'));
    }


  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

