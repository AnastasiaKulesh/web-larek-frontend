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

const popupContainer = document.querySelector('#modal-container') as HTMLElement; 
const modalPopup = new PopupUI(popupContainer);

const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;

const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;

const customerOrderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const customerContactTemplate = document.querySelector('#contacts') as HTMLTemplateElement;

const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const customer = new CustomerModel();


const basket = new BasketModel();
basket.on('changeCountItem', () => {
    page.counter = basket.countItems;
})




// Рендер каталога товаров
const cardList = new CardListModel();
api.get('/product')
    .then(res => {
        const resJson = JSON.parse(JSON.stringify(res));

        cardList.cards = resJson.items;
        
        const cardsListItems: HTMLElement[] = cardList.cards.map((item, i) => {
            const card = new CardUI(cardTemplate);
            card.setDetailHandler(handleOpenDetailPopup, item)
            return card.render(item, i);
        })

        page.catalog = cardsListItems;
    })
    .catch((err) => console.log(`ERROR: ${err}`));

// Функция открытия popup с детальной информацией карточки
function handleOpenDetailPopup(item: ICard ) {
    const card = new CardUI(cardPreviewTemplate);
    card.setAddItemBasketHandler(handleAddItemBasket, item);

    modalPopup.content = card.render(item, 0, basket.checkItemById(item.id));

    modalPopup.open();
}

// Функция добавления товара в корзину
function handleAddItemBasket(item: ICard) {
    basket.addItem(item);    
    modalPopup.close();
}

// Функция удаления товара из корзины
function handleDeleteItemBasket(item: ICard) {
    basket.deleteItem(item.id);
    fillBasketContent(modalPopup, basket);    
}

// Открыть popup по нажатию на корзину
function openBasketPopup() {
    fillBasketContent(modalPopup, basket);
    modalPopup.open();
}

// Функция заполнения содержимым popup корзины
function fillBasketContent(basketPopup: PopupUI, basket: IBasket) {
    const basketUI = new BasketUI(basketTemplate);
    basketUI.on('makeOrder', () => {
        basketPopup.close();
        makeOrder();
    })
    const basketItems: HTMLElement[] = basket.items.map((item, i) => {
        const card = new CardUI(cardBasketTemplate);
        card.setDeleteBasketItemHandler(handleDeleteItemBasket, item);
        return card.render(item, i);
    })
    basketPopup.content = basketUI.render(basketItems, basket);
}

// Функция открытия popup оформления заказа
function makeOrder() {
    const customerUI = new FormCustomerOrderUI(customerOrderTemplate, customer);
    modalPopup.content = customerUI.render();
    modalPopup.open();
    
    customerUI.on('next', () => {
        modalPopup.close();
        const customerUI = new FormCustomerContactsUI(customerContactTemplate, customer);
        customerUI.on('makeOrderSubmit', () => {
            sendOrder()})
            modalPopup.content = customerUI.render();
            modalPopup.open();
    })
}

// Функция отправки заказа на сервер
function sendOrder() {
    const data = {
        "payment": customer.paymentType,
        "email": customer.email,
        "phone": customer.phone,
        "address": customer.address,
        "total": basket.costItems,
        "items": basket.items.filter(item => item.price != null).map((item) => {
            return item.id
        })
    };

    api.post('/order', data, 'POST')
        .then(res => {
            basket.clear();
            customer.clear();
            modalPopup.close();

            const resJson = JSON.parse(JSON.stringify(res));
            const successUI = new SuccessUI(successTemplate);
            modalPopup.content = successUI.render(resJson.total);
            modalPopup.open();

            successUI.on('closeSuccessPopup', () => {
                modalPopup.close();
            })
        }) 
        .catch((err) => console.log(`ERROR: ${err}`));
    }