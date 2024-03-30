import { CardUI } from './components/CardUI';
import './scss/styles.scss';
import { ICard } from './types';
import { cardListFromAPI } from './utils/constants';

const contentElement = document.querySelector('.gallery');

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;


cardListFromAPI.items.forEach((item, i) => {
    const card = new CardUI(cardTemplate);
    const catalog: ICard = item;
    contentElement.prepend(card.render(catalog));

})
