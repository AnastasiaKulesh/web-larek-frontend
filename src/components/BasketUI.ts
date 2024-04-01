import { IBasket } from "../types";
import { EventEmitter } from "./base/events";

export class BasketUI extends EventEmitter {
    protected basketElement: HTMLElement;
    protected basketListElement: HTMLElement;
    protected basketButtonElement: HTMLButtonElement;
    protected basketPriceElement: HTMLElement;

    protected handleOrder: Function;


    constructor(template: HTMLTemplateElement) {
        super();
        this.basketElement = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
        this.basketListElement = this.basketElement.querySelector('.basket__list');
        this.basketButtonElement = this.basketElement.querySelector('.basket__button');
        this.basketPriceElement = this.basketElement.querySelector('.basket__price');   
        
        this.basketButtonElement.addEventListener('click', () => {
            this.emit('makeOrder')
        })
    }

    render(items: HTMLElement[], basket: IBasket) {
        this.basketListElement.replaceChildren(...items);
        this.basketPriceElement.textContent = `${basket.costItems} синапсов`;
        this.basketButtonElement.disabled = (items.length === 0);
        return this.basketElement;
    }

    makeOrderHandler(handleOrder: Function) {
        if (this.basketButtonElement === null) return;

        this.handleOrder = handleOrder;
        this.basketButtonElement.addEventListener('click', (event) => {
            this.handleOrder();
        })
    }
}