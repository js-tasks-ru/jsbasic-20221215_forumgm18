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
  #markers = [];      // Смещения шагов (делений на шкале) в %

  constructor({ steps, value = 1 }) {

    
    this.#sliderThumbs = createElement(`<div class="slider__thumb"></div>`);
    this.#sliderThumbsValue = createElement(`<span class="slider__value"></span>`);
    this.#sliderThumbs.append(this.#sliderThumbsValue);

    this.#sliderProgress = createElement(`<div class="slider__progress"></div>`);
    this.#sliderSteps = createElement(`<div class="slider__steps"></div>`);
    this.#sliderRoot = createElement(`<div class="slider"></div>`);
    this.#sliderRoot.append(this.#sliderThumbs, this.#sliderProgress, this.#sliderSteps);
    
    this.init({ steps, value });

    this.#sliderRoot.addEventListener('click', e => this.stepSliderClick(e));

  }
  get elem() {return this.#sliderRoot;}
  get currentOffset() { return this.#offsetPercent(this.#currentValue, this.#config.steps) ;}

  #offsetPercent(val, steps) {
    return 100 * (val - 1) / (steps - 1);
  }
  init(config) {
    let { steps, value } = config;
    if (steps < 2) steps = 2;
    if (value < 0 || value > steps) value = 1;
    config = { steps, value }  

    this.#config = config;
    this.#currentValue = value;
    this.#sliderSteps.innerHTML='';
    this.#markers = [];
    for(let i = 0; i < steps; i++) {
      let step = document.createElement('SPAN');
      if (i === value - 1) step.className = this.#sliderStepActiveClass;
      this.#sliderSteps.append(step);
      this.#markers.push(this.#offsetPercent(i + 1,steps));
    }

    this.#sliderThumbsValue.textContent = value;
    this.#sliderThumbs.style.left = `${this.currentOffset}%`;
    this.#sliderProgress.style.width = `${this.currentOffset}%`;
  }
  update() {
    let 
      cls = this.#sliderStepActiveClass,
      activeStep = this.#sliderSteps.querySelector(`.${cls}`);

    if (activeStep) activeStep.className = '';
    activeStep = this.#sliderSteps.querySelector(`span:nth-child(${this.#currentValue})`);
    if (activeStep) activeStep.className = cls;

    this.#sliderThumbsValue.textContent = this.#currentValue;
    this.#sliderThumbs.style.left = `${this.currentOffset}%`;
    this.#sliderProgress.style.width = `${this.currentOffset}%`;
  }

  stepSliderClick(e) {
    if (e.target.closest(this.#sliderStepActiveClass)) return;
    let
      pointerX = e.clientX - this.#sliderRoot.getBoundingClientRect().left,
      pointerPercent = 100 * pointerX / this.#sliderRoot.getBoundingClientRect().width,
      minInd = 0;

      for(let i = 0; i < this.#markers.length; i++ ) {
        if (this.#markers[i] < pointerPercent) minInd = i;
      }

      let 
        currentStep = (pointerPercent - this.#markers[minInd]) < (this.#markers[minInd + 1] - pointerPercent) ? minInd : minInd + 1, 
        sliderChangeEvent = new CustomEvent('slider-change', {
          detail: currentStep, 
          bubbles: true 
        });
      this.#currentValue = currentStep + 1;
      this.update();
      this.#sliderRoot.dispatchEvent(sliderChangeEvent);

  }
}
