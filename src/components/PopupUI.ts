import { IPopup } from "../types";

export class PopupUI implements IPopup {
    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    protected popupContainer: HTMLElement;

    constructor(protected container: HTMLElement) {
        this.popupContainer = container.querySelector('.modal__container');
        this.closeButton = this.popupContainer.querySelector('.modal__close');
        this._content = this.popupContainer.querySelector('.modal__content');

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());        
    }

    set content(value: HTMLElement) {
        this._content.innerHTML = '';
        this._content.appendChild(value); 
    }

    open() {
        this.container.classList.add('modal_active')
    }

    close() {
        this.container.classList.remove('modal_active');
        this._content = null;
    }

}