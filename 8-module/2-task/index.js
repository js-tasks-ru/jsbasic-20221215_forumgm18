import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #rootElem;
  #rootElemInner;
  constructor(products) {
    products.forEach(el => el.isVisible = true);
    this.products = products;
    this.filters = {};
    this.render();
  }
  render() {
    this.#rootElemInner = createElement(`<div class="products-grid__inner"></div>`);
    this.#rootElem = createElement(`<div class="products-grid"></div>`);
    this.#rootElem.append(this.#rootElemInner);
    this.reRender();
  }
  reRender() {
    this.elemInner.innerHTML = '';
    this.products.forEach(el => el.isVisible && this.elemInner.append((new ProductCard(el)).elem));
  }
  get elem() {return this.#rootElem}
  get elemInner() {return this.#rootElemInner}
  
  #productIsVisible(product) {
    let 
      res = true,
      filters = this.filters;

    for(let key in filters) {
      switch(key) {
        case 'noNuts': 
                res = res && product['nuts'] != filters[key]
                break;
        case 'vegeterianOnly': 
                res = res && !!product['vegeterian'] === !!filters[key]
                break;
        case 'maxSpiciness': 
                res = res && product['spiciness'] <= filters[key];
                break;
        case 'category':
                if (filters[key] != '' && !!product['category'] ) 
                    res = res && product['category'] === filters[key];
                break;
      }
    }
    return res;
  }
  updateFilter(currentFilter) {
    this.filters = {...this.filters, ...currentFilter}
    this.products.forEach(el => el.isVisible = this.#productIsVisible(el));
    this.reRender()
  }
}
