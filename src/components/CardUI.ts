import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";

export class CardUI {
    protected _id: string;
    protected _category: string;
    protected _name: string;
    protected _description: string;
    protected _price: number;
    protected _image: string;
    protected cardElement: HTMLElement;
    protected categoryElement: HTMLElement;
    protected nameElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected priceElement: HTMLElement;
    protected basketItemElement: HTMLElement;
    protected handleOpenDetailPopup: Function;

    constructor (template: HTMLTemplateElement) {
        this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.categoryElement = this.cardElement.querySelector('.card__category');
        this.nameElement = this.cardElement.querySelector('.card__title');
        this.descriptionElement = this.cardElement.querySelector('.card__text');
        this.imageElement = this.cardElement.querySelector('.card__image');
        this.priceElement = this.cardElement.querySelector('.card__price');
        this.basketItemElement = this.cardElement.querySelector('.basket__item-index');
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
}

// <template id="card-catalog">
// 		<button class="gallery__item card">
// 			<span class="card__category card__category_soft">софт-скил</span>
// 			<h2 class="card__title">+1 час в сутках</h2>
// 			<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
// 			<span class="card__price">750 синапсов</span>
// 		</button>
// 	</template>