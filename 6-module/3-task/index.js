import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  #currency = '&#8364;';
  #carousel;
  #carouselLeftArrow;
  #carouselRightArrow;
  #carouselInner;
  #slidesData;

  constructor(slides) {
    this.#slidesData = slides;
    this.#carouselRightArrow = createElement('<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>');
    this.#carouselLeftArrow = createElement('<div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>');
    this.#carousel = createElement('<div class="carousel"></div>');
    this.#carousel.append(this.#carouselLeftArrow); 
    this.#carousel.append(this.#carouselRightArrow); 
    this.#carouselInner = createElement('<div class="carousel__inner"></div>');

    slides.forEach(el => {
      const imgPath = '/assets/images/carousel/';
      let {name, price, image, id} = el,
      slideNode = createElement(`
                      <div class="carousel__slide" data-id="${id}">
                        <img src="${imgPath + image}" class="carousel__img" alt="${name}">
                        <div class="carousel__caption">
                          <span class="carousel__price">${this.#currency + price.toFixed(2)}</span>
                          <div class="carousel__title">${name}</div>
                          <button type="button" class="carousel__button" data-carousel-product-add>
                            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                          </button>
                        </div>
                      </div>
                 `);
        slideNode.querySelector('[data-carousel-product-add]').addEventListener('click', () => {
          let productAddEvnt = new CustomEvent("product-add", { detail: id, bubbles: true });
          this.#carousel.dispatchEvent(productAddEvnt);
        });

      this.#carouselInner.append(slideNode);
    });
    this.#carousel.append(this.#carouselInner); 

    this.currentSlideIndex = 0;

    this.#carouselRightArrow.addEventListener('click', e => {
      e.preventDefault();
      this.currentSlideIndex++
      this.updateCarousel();
    });
    this.#carouselLeftArrow.addEventListener('click', e => {
      e.preventDefault();
      this.currentSlideIndex--
      this.updateCarousel();
    });
    this.updateCarousel();
  
  }

  get elem() {return this.#carousel}
  get carouselSlidesCount(){return this.#slidesData.length} 

  #slideWidth(){
    return this.#carousel.offsetWidth
  }

  updateCarousel() {
    let offset = -this.currentSlideIndex * this.#slideWidth();
    this.#carouselInner.style.transform = `translateX(${offset}px)`;
    this.#carouselLeftArrow.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    this.#carouselRightArrow.style.display = this.currentSlideIndex === this.carouselSlidesCount - 1 ? 'none' : '';
  }

}
