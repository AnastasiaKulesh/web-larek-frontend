import { EventEmitter } from "./base/events";

export class PageUI extends EventEmitter {
    protected _catalog: HTMLElement;
    protected _basketButton: HTMLButtonElement;
    protected _countBasketItems: HTMLElement;

    constructor() {
        super();
        this._catalog = document.querySelector('.gallery');
        this._basketButton = document.querySelector('.header__basket')
        this._countBasketItems = this._basketButton.querySelector('.header__basket-counter');

        this._basketButton.addEventListener('click', (event) => {
            this.emit('openBasketPopup');
        })
    }

    set counter(value: number) {
        this._countBasketItems.innerText = value.toString();
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.innerHTML = '';
        items.forEach((item) => {
            this._catalog.append(item);
        })
    }


}