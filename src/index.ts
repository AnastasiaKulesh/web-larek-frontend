import { CardListModel } from './components/CardList';
import { CardUI } from './components/CardUI';
import { PopupUI } from './components/PopupUI';
import './scss/styles.scss';
import { ICard } from './types';
import { cardListFromAPI } from './utils/constants';

const contentElement = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;



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
    cardPopup.content = card.render(item, 0);

    cardPopup.open();
}