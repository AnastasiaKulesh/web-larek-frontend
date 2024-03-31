import { BasketModel } from './components/models/BasketModel';
import { BasketUI } from './components/BasketUI';
import { CardListModel } from './components/models/CardListModel';
import { CardUI } from './components/CardUI';
import { CustomerModel } from './components/models/CustomerModel';
import { FormCustomerContactsUI } from './components/FormCustomerContactsUI';
import { FormCustomerOrderUI } from './components/FormCustomerOrderUI';
import { PageUI } from './components/PageUI';
import { PopupUI } from './components/PopupUI';
import { SuccessUI } from './components/SuccessUI';
import { Api } from './components/base/api';
import './scss/styles.scss';
import { IBasket, ICard } from './types';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);


const page = new PageUI();
page.on('openBasketPopup', () => {
    openBasketPopup();
})

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

const basket = new BasketModel();
basket.on('changeCountItem', () => {
    page.counter = basket.countItems;
})


// Рендер каталога товаров
const cardList = new CardListModel();
api.get('/product').then(res => {
    const resJson = JSON.parse(JSON.stringify(res));

    cardList.cards = resJson.items;
    
    const cardsListItems: HTMLElement[] = cardList.cards.map((item, i) => {
        const card = new CardUI(cardTemplate);
        card.setDetailHandler(handleOpenDetailPopup, item)
        return card.render(item, i);
    })

    page.catalog = cardsListItems;
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
}

function handleDeleteItemBasket(item: ICard) {
    basket.deleteItem(item.id);
    fillBasketContent(basketPopup, basket);    
}

let basketPopup: PopupUI;

// Открыть popup по нажатию на корзину
function openBasketPopup() {
    basketPopup = new PopupUI(document.querySelector('#modal-container') as HTMLElement);
    fillBasketContent(basketPopup, basket);
    basketPopup.open();
}


function fillBasketContent(basketPopup: PopupUI, basket: IBasket) {
    const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
    const basketUI = new BasketUI(basketTemplate);
    basketUI.on('makeOrder', () => {
        basketPopup.close();
        makeOrder();
    })
    const basketItems: HTMLElement[] = basket.items.map((item, i) => {
        const card = new CardUI(document.querySelector('#card-basket') as HTMLTemplateElement);
        card.setDeleteBasketItemHandler(handleDeleteItemBasket, item);
        return card.render(item, i);
    })
    basketPopup.content = basketUI.render(basketItems, basket);
}

const customer = new CustomerModel();

// Доработать
function makeOrder() {
    const customerTemplate = document.querySelector('#order') as HTMLTemplateElement;
    const customerUI = new FormCustomerOrderUI(customerTemplate, customer);
    let customerPopup = new PopupUI(document.querySelector('#modal-container') as HTMLElement);

    customerPopup.content = customerUI.render();
    customerPopup.open();
    
    customerUI.on('next', () => {
        customerPopup.close();

        const customerTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
        const customerUI = new FormCustomerContactsUI(customerTemplate, customer);
        customerPopup = new PopupUI(document.querySelector('#modal-container') as HTMLElement);
        
        customerUI.on('makeOrderSubmit', () => {
            customerPopup.close();
            sendOrder()})
        customerPopup.content = customerUI.render();
        customerPopup.open();
    })
}

function sendOrder() {
    const data = {
        "payment": customer.paymentType,
        "email": customer.email,
        "phone": customer.phone,
        "address": customer.address,
        "total": basket.costItems,
        "items": basket.items.map((item) => {
            return item.id
        })
      };

    api.post('/order', data, 'POST')
        .then(res => {
            basket.clear();

            const resJson = JSON.parse(JSON.stringify(res));
            const successTemplate = document.querySelector('#success') as HTMLTemplateElement;
            const successUI = new SuccessUI(successTemplate);
            const successPopup = new PopupUI(document.querySelector('#modal-container') as HTMLElement);

            successPopup.content = successUI.render(resJson.total);
            successPopup.open();

            successUI.on('closeSuccessPopup', () => {
                successPopup.close();
            })
        }
    ) 
}