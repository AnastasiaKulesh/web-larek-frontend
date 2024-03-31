import { BasketModel } from './components/BasketModel';
import { BasketUI } from './components/BasketUI';
import { CardListModel } from './components/CardList';
import { CardUI } from './components/CardUI';
import { PopupUI } from './components/PopupUI';
import './scss/styles.scss';
import { IBasket, ICard } from './types';
import { cardListFromAPI } from './utils/constants';

const contentElement = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const basket = new BasketModel();

// Элемент корзины в шапке - позже перенести в класс
const headerBasketCounter = document.querySelector('.header__basket-counter') as HTMLElement;



const cardList = new CardListModel();
cardList.cards = cardListFromAPI.items;

cardList.cards.forEach((item, i) => {
    const card = new CardUI(cardTemplate);
    const catalog: ICard = item;
    contentElement.append(card.render(catalog, i));
    card.setDetailHandler(handleOpenDetailPopup, item)
})


function handleOpenDetailPopup(item: ICard ) {
    const popupContainer = document.querySelector('#modal-container') as HTMLElement; 
    const cardPopup = new PopupUI(popupContainer);
    const cardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;

    const card = new CardUI(cardTemplate);
    card.setAddItemBasketHandler(handleAddItemBasket, item);

    cardPopup.content = card.render(item, 0);

    cardPopup.open();
}

function handleAddItemBasket(item: ICard) {
    basket.addItem(item);
    headerBasketCounter.innerText = basket.countItems.toString();
}

function handleDeleteItemBasket(item: ICard) {
    basket.deleteItem(item.id);
    headerBasketCounter.innerText = basket.countItems.toString();
    fillBasketContent(basketPopup, basket);    
}

let basketPopup: PopupUI;

// Открыть popup по нажатию на корзину
const headerBasket = document.querySelector('.header__basket') as HTMLElement;
headerBasket.addEventListener('click', () => {
    basketPopup = new PopupUI(document.querySelector('#modal-container') as HTMLElement);
    fillBasketContent(basketPopup, basket);
    basketPopup.open();
})


function fillBasketContent(basketPopup: PopupUI, basket: IBasket) {
    const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
    const basketUI = new BasketUI(basketTemplate);
    basketUI.makeOrderHandler(makeOrder);
    const basketItems: HTMLElement[] = basket.items.map((item, i) => {
        const card = new CardUI(document.querySelector('#card-basket') as HTMLTemplateElement);
        card.setDeleteBasketItemHandler(handleDeleteItemBasket, item);
        return card.render(item, i);
    })
    basketPopup.content = basketUI.render(basketItems, basket);
}

// Доработать
function makeOrder() {
    basketPopup.close();
}

 

