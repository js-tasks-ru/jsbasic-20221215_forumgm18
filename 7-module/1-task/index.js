import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #scrollStep = 350;
  #categories;
  #arrowLeft;
  #arrowRight;
  #ribbonNode;
  #ribbonInner;

  constructor(categories) {
    this.#categories = categories;
    this.#arrowLeft = createElement('<button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>');
    this.#arrowRight = createElement('<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>');
    this.#ribbonInner = createElement('<nav class="ribbon__inner"></nav>');
    this.#ribbonNode = createElement('<div class="ribbon"></div>');
    categories.forEach((el, ind) => {
      let activeClass = ind === 0 ? ' ribbon__item_active' : '';
      let ribbonItem = createElement(`<a href="#" class="ribbon__item${activeClass}" data-id="${el.id}">${el.name}</a>`);
      ribbonItem.addEventListener('click', e => {
        e.preventDefault();
        let 
          target = e.target.closest('.ribbon__item'),
          ribbonEvnt = new CustomEvent('ribbon-select', { detail: el.id, bubbles: true }),
          activeItems = this.#ribbonInner.querySelectorAll('.ribbon__item_active');
          
        if (activeItems) activeItems.forEach(el => el.classList.remove('ribbon__item_active'));
        target.classList.add('ribbon__item_active');
        this.#ribbonNode.dispatchEvent(ribbonEvnt);
      });
      this.#ribbonInner.append(ribbonItem);
    });

    this.#ribbonNode.append(this.#arrowLeft);
    this.#ribbonNode.append(this.#ribbonInner);
    this.#ribbonNode.append(this.#arrowRight);

    this.#arrowLeft.addEventListener('click', e => {
      this.#ribbonInner.scrollBy(-this.#scrollStep, 0)

    });
    this.#arrowRight.addEventListener('click', e => {
      this.#ribbonInner.scrollBy(this.#scrollStep, 0)
    });

    this.#ribbonInner.addEventListener('scroll', e => {
      let 
        ribbonInner = e.target,
        scrollWidth = ribbonInner.scrollWidth,
        scrollLeft = ribbonInner.scrollLeft,
        clientWidth = ribbonInner.clientWidth,
        scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollLeft === 0) {
          this.#arrowLeft.classList.remove('ribbon__arrow_visible')
        } else {
          this.#arrowLeft.classList.add('ribbon__arrow_visible')
        }
        console.log('scrollRight', scrollRight);
        if (scrollRight === 0) {
          this.#arrowRight.classList.remove('ribbon__arrow_visible')
        } else {
          this.#arrowRight.classList.add('ribbon__arrow_visible')
        }

  
    });


    
  }

  get elem() { return this.#ribbonNode }
}
