import { IBasket } from "../types";

export class BasketUI {
    protected basketElement: HTMLElement;
    protected basketListElement: HTMLElement;
    protected basketButtonElement: HTMLButtonElement;
    protected basketPriceElement: HTMLElement;

    protected handleOrder: Function;


    constructor(template: HTMLTemplateElement) {
        this.basketElement = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
        this.basketListElement = this.basketElement.querySelector('.basket__list');
        this.basketButtonElement = this.basketElement.querySelector('.basket__button');
        this.basketPriceElement = this.basketElement.querySelector('.basket__price');      
    }

    render(items: HTMLElement[], basket: IBasket) {
        this.basketListElement.append(...items);
        this.basketPriceElement.textContent = `${basket.costItems} синапсов`;
        return this.basketElement;
    }

    makeOrderHandler(handleOrder: Function) {
        if (this.basketButtonElement === null) return;

        this.handleOrder = handleOrder;
        this.basketButtonElement.addEventListener('click', (event) => {
            this.handleOrder();
        })
    }

// (handleDeleteItemBasket: Function, card: ICard) {
//     if (this.deleteBasketItemButton === null) return;

//     this.handleDeleteItemBasket = handleDeleteItemBasket;
//     this.deleteBasketItemButton.addEventListener('click', (event) => {
//         this.handleDeleteItemBasket(card);
//     })
}