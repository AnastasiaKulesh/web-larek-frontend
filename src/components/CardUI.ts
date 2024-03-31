import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";

export class CardUI {
    protected cardElement: HTMLElement;
    protected categoryElement: HTMLElement;
    protected nameElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected priceElement: HTMLElement;
    protected basketItemElement: HTMLElement;
    protected addBasketItemButton: HTMLButtonElement;
    protected deleteBasketItemButton: HTMLButtonElement;

    protected handleOpenDetailPopup: Function;
    protected handleAddItemBasket: Function;
    protected handleDeleteItemBasket: Function;

    constructor (template: HTMLTemplateElement) {
        this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.categoryElement = this.cardElement.querySelector('.card__category');
        this.nameElement = this.cardElement.querySelector('.card__title');
        this.descriptionElement = this.cardElement.querySelector('.card__text');
        this.imageElement = this.cardElement.querySelector('.card__image');
        this.priceElement = this.cardElement.querySelector('.card__price');
        this.basketItemElement = this.cardElement.querySelector('.basket__item-index');
        this.addBasketItemButton = this.cardElement.querySelector('.card__button');
        this.deleteBasketItemButton = this.cardElement.querySelector('.basket__item-delete');
    }

    render(card: ICard, idx: number) {
        if (this.categoryElement != null) this.categoryElement.textContent = card.category;
        if (this.nameElement != null) this.nameElement.textContent = card.title;
        if (this.descriptionElement != null) this.descriptionElement.textContent = card.description;
        if (this.imageElement != null) this.imageElement.src = `${CDN_URL}/${card.image}`;
        if (this.priceElement != null) (card.price == null) ? this.priceElement.textContent = 'Бесценно' : this.priceElement.textContent = `${card.price} cинапсов`;
        if (this.basketItemElement != null) this.basketItemElement.textContent = `${idx+1}`;
        return this.cardElement;
    }

    setDetailHandler(handleOpenDetailPopup: Function, card: ICard) {
        this.handleOpenDetailPopup = handleOpenDetailPopup;
        this.cardElement.addEventListener('click', (event) => {
            this.handleOpenDetailPopup(card);
        }) 
    }

    setAddItemBasketHandler(handleAddItemBasket: Function, card: ICard) {
        if (this.addBasketItemButton === null) return;

        this.handleAddItemBasket = handleAddItemBasket;
        this.addBasketItemButton.addEventListener('click', (event) => {
            this.handleAddItemBasket(card);
        })
    }

    setDeleteBasketItemHandler(handleDeleteItemBasket: Function, card: ICard) {
        if (this.deleteBasketItemButton === null) return;

        this.handleDeleteItemBasket = handleDeleteItemBasket;
        this.deleteBasketItemButton.addEventListener('click', (event) => {
            this.handleDeleteItemBasket(card);
        })
    }
}