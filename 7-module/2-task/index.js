import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal;
  #modalTitle;
  #modalBody;
  #isOpen = false;
  constructor() {
    let modalInner = createElement('<div class="modal__inner"></div>');
    let modalHeader = createElement('<div class="modal__header"><button type="button" class="modal__close" data-modal-close><img src="/assets/images/icons/cross-icon.svg" alt="close-icon" /></button></div>');
    this.#modalTitle = createElement('<h3 class="modal__title"></h3>');
    modalHeader.append(this.#modalTitle);
    this.#modalBody = createElement('<div class="modal__body"></div>');
    modalInner.append(modalHeader);
    modalInner.append(this.#modalBody);
    this.#modal = createElement('<div class="modal" data-modal-window><div class="modal__overlay" data-modal-close></div></div>');
    this.#modal.append(modalInner);
  }
  get elem() { 
    return this.#modal;
  }
  get elemBody() { 
    return this.#modalBody;
  }

  setTitle(str) { 
    this.#modalTitle.textContent = str  
  }
  setBody(bodyNode) {
    this.#modalBody.innerHTML = ''
    this.#modalBody.append(bodyNode);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
    this.elem.addEventListener('click', e => {
      if (e.target.closest('[data-modal-close]')) {
        e.preventDefault();
        this.close();
      }
    });

    this._keyDownEventListener = (e) => {
      if (e.code !== 'Escape') return;
      e.preventDefault();
      this.close();
    };
    
    document.addEventListener('keydown', this._keyDownEventListener);
    this.#isOpen = true;

  }
  close() {
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._keyDownEventListener);
    this.elem.remove();
    this.#isOpen = false;
  }

  get isOpen() {return this.#isOpen;};

}


