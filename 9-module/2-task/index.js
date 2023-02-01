import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  #Carousel;
  #CartIcon;
  #Cart;
constructor() {
    this.#Carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    
    this.#CartIcon = new CartIcon();
    this.#Cart = new Cart(this.#CartIcon);

  }

  async render() {
    try {
      let 
        response = await fetch('products.json'),
        products = await response.json(),
        steps = Math.max(...products.map(el => el.spiciness))
      ;
      this.stepSlider = new StepSlider({steps});
      this.productsGrid = new ProductsGrid(products);
      
      document.querySelector('[data-cart-icon-holder]').append(this.#CartIcon.elem);
      document.querySelector('[data-carousel-holder]').append(this.#Carousel.elem);
      document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
      document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
      document.querySelector('[data-products-grid-holder]').innerHTML = '';
      document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

      document.addEventListener('slider-change', e => this.productsGrid.updateFilter({ maxSpiciness: e.detail  }));
      document.addEventListener('ribbon-select', e => this.productsGrid.updateFilter({ category: e.detail  }));

      document.getElementById('nuts-checkbox')
        .addEventListener('change', e => this.productsGrid.updateFilter({ noNuts: e.target.checked  }));
      document.getElementById('vegeterian-checkbox')
        .addEventListener('change', e => this.productsGrid.updateFilter({ vegeterianOnly: e.target.checked  }));

      document.body.addEventListener('product-add', e => {
        let prod = this.productsGrid.products.find(el => el.id === e.detail);
        this.#Cart.addProduct( prod )
      });
    } catch(err) {
      console.error(err);
    }
  }
}
