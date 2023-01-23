  import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  #currency = '&#8364;';
  #cardNode;
  #product;
  constructor(product) {
    this.#product = product;

    const imgPath = '/assets/images/products/';
    // let {name, price, category, image, id} = product;
    let dataStr = ''
    for(let key in product) {
      if (key != 'image') dataStr = `${dataStr} data-product-${key}="${product[key]}" `
    }

    this.#cardNode = createElement(`
        <div class="card" ${dataStr.trim()}>
          <div class="card__top">
            <img src="${imgPath + product.image}" class="card__image" alt="product">
            <span class="card__price">${this.#currency + product.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
            <div class="card__title">${product.name}</div>
            <button type="button" class="card__button" data-card-button>
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
    `);

    this.#cardNode.querySelector('[data-card-button]').addEventListener('click', () => {
      let productAddEvnt = new CustomEvent("product-add", { detail: this.#product.id, bubbles: true });
      this.#cardNode.firstElementChild.dispatchEvent(productAddEvnt);
    })
    


  }
  get elem(){return this.#cardNode};
  get id(){return this.#product.id};

}