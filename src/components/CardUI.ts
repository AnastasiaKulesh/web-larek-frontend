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

    constructor (template: HTMLTemplateElement) {
        this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.categoryElement = this.cardElement.querySelector('.card__category');
        this.nameElement = this.cardElement.querySelector('.card__title');
        this.descriptionElement = this.cardElement.querySelector('.card__text');
        this.imageElement = this.cardElement.querySelector('.card__image');
        this.priceElement = this.cardElement.querySelector('.card__price');
    }

    render(card: ICard) {
        this.categoryElement.textContent = card.category;
        this.nameElement.textContent = card.title;
        if(this.descriptionElement != null)this.descriptionElement.textContent = card.description;
        this.imageElement.src = `${CDN_URL}/${card.image}`;
        this.priceElement.textContent = `${card.price} cинапсов`;
        return this.cardElement;
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