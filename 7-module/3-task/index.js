import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  #sliderRoot;
  #sliderThumbs;      // Ползунок слайдера с активным значением
  #sliderThumbsValue; // Текст в Ползунке слайдера
  #sliderProgress;    // Заполненная часть слайдера
  #sliderSteps;       // Шаги слайдера
  #sliderStepActiveClass = 'slider__step-active';
  #config;            // Кофигурация слайдера
  #currentValue = 0;  // Текущий шаг

  constructor({ steps, value = 0 }) {
    this.render();
    this.init({ steps, value });
    this.#sliderRoot.addEventListener('click', e => this.stepSliderClick(e));

  }
  render() {
    this.#sliderThumbs = createElement(`<div class="slider__thumb"></div>`);
    this.#sliderThumbsValue = createElement(`<span class="slider__value"></span>`);
    this.#sliderThumbs.append(this.#sliderThumbsValue);

    this.#sliderProgress = createElement(`<div class="slider__progress"></div>`);
    this.#sliderSteps = createElement(`<div class="slider__steps"></div>`);

    this.#sliderRoot = createElement(`<div class="slider"></div>`);
    this.#sliderRoot.append(this.#sliderThumbs, this.#sliderProgress, this.#sliderSteps);
  }

  get elem() {return this.#sliderRoot;}
  get currentOffset() { return this.#offsetPercent(this.#currentValue + 1, this.#config.steps) ;}

  #offsetPercent(val, steps) {
    return 100 * (val - 1) / (steps - 1);
  }
  init(config) {
    let { steps, value } = config;
    if (steps < 2) steps = 2;
    if (value < 0 || value > steps) value = 0;
    config = { steps, value }  

    this.#config = config;
    this.#currentValue = value;
    this.#sliderSteps.innerHTML='';
    // this.#markers = [];
    for(let i = 0; i < steps; i++) {
      let step = document.createElement('SPAN');
      if ( i === value ) step.className = this.#sliderStepActiveClass;
      this.#sliderSteps.append(step);
      // this.#markers.push(this.#offsetPercent(i + 1,steps));
    }

    this.#updateSliderView(value + 1, this.currentOffset);

  }
  #updateSliderView(currentValue, currentOffset) {
    this.#sliderThumbsValue.textContent = currentValue;
    this.#sliderThumbs.style.left = `${currentOffset}%`;
    this.#sliderProgress.style.width = `${currentOffset}%`;

  }

  update() {
    let 
      cls = this.#sliderStepActiveClass,
      activeStep = this.#sliderSteps.querySelector(`.${cls}`),
      sliderChangeEvent = new CustomEvent('slider-change', {
        detail: this.#currentValue,// - 1, 
        bubbles: true 
     });

    if (activeStep) activeStep.className = '';
    activeStep = this.#sliderSteps.querySelector(`span:nth-child(${this.#currentValue + 1})`);
    if (activeStep) activeStep.className = cls;

    this.#updateSliderView(this.#currentValue + 1, this.currentOffset);
    this.elem.dispatchEvent(sliderChangeEvent);
  }

  stepSliderClick(e) {
    if (e.target.closest(this.#sliderStepActiveClass)) return;
    let
      pointerX = e.clientX - this.elem.getBoundingClientRect().left,
      leftOffset = pointerX / this.elem.getBoundingClientRect().width,
      currentStep = Math.round(leftOffset * (this.#config.steps-1));
      
      this.#currentValue = currentStep;
      this.update();
  }
}
