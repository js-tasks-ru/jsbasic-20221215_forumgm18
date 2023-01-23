import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #initialTopY = null;
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.#initialTopY) this.#initialTopY = this.elem.getBoundingClientRect().top + window.pageYOffset;
    if ( window.pageYOffset > this.#initialTopY && document.documentElement.clientWidth > 767) {
      let 
        cartContainerX = document.querySelector('.container').getBoundingClientRect().right + 20,
        cartWindowX = document.documentElement.clientWidth - this.elem.offsetWidth - 10,
        cartX = Math.min(cartContainerX, cartWindowX) + 'px';
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1000,
        right: '10px',
        left: cartX
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });    }
  }
}
