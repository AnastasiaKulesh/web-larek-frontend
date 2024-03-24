# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Модели данных
## Класс Card
Отвечает за данные товара.

Свойства:
 - category: string - категория;
 - name: string - название товара;
 - description: string - описание товара;
 - price: number - цена;
 - image: string - изображение

Конструктор принимает следующие свойства:
category, name, description, price, image

## Класс CardsList
Отвечает за список всех карточек товаров.

Свойства:
 - cards: Card[] - массив всех карточек

Методы:
 - getCardsList: получает данные с сервера (API) и заполняет массив карточек

## Класс Customer
Отвечает за данные покупателя.

Свойства:
 - paymentType: 'online' | 'offline' - способ оплаты;
 - address: string - адрес доставки;
 - email: string - E-mail покупателя;
 - phone: string - номер телефона;

Конструктор - пустой, не принимает свойства.

Методы:
 - setPaymentType(type: string): устанавливает способ оплаты;
 - setAddress(address: string): устанавливает адрес доставки;
 - setEmail(email: string): устанавливает E-mail покупателя;
 - setPhone(phone: string): устанавливает номер телефона;


## Класс Basket
Отвечает за работу корзины.

Свойства: 
 - items: массив выбранных карточек

Геттеры:
 - сountItems: возвращает количество выбранных товаров
 - costItems: возвращает итоговую стоимость заказа

Методы:
 - addItem(item: Card): добавление карточки
 - deleteItem(item: Card): удадение карточки
 - makeOrder: оформить заказ

 

## Модель представления

## PageUI 
Отвечает за отображение основных элементов страницы.

Методы:
 - render(cardList: CardListUI, basket: Basket): отображает страницу 

## Класс CardUI
Отвечает за отображение карточки на главной странице

Методы:
 - render(card: Card): отображает карточку товара 

## Класс CardsListUI
Отображает список всех карточек

Методы:
 - render(cardList: Card[]): отобразить список карточек

## Класс PopupUI
Абстрактный класс для popup-элементов.

Свойства:
 - content: содержимое popup;
 - visible: видимость popup

Методы:
 - render(content: HTML): отображает содержимое popup и открывает popup;
 - open: открывает popup;
 - close: закрывает popup

## Класс CardPopupUI extends PopupUI
Отвечает за отображение детальной информации о товаре. Является наследником абстрактного класса PopupUI.

Свойства: 
 - card: Card - данные карточки;

Методы:
 - render: генерирует HTML на основе данных карточки из "зашитого" HTML-шаблона;
 - open: открывает popup;
 - close: закрывает popup

## Класс BasketPopupUI extends PopupUI
Отвечает за отображение корзины.  Является наследником абстрактного класса PopupUI.

Свойства:
 - basket: Basket: данные корзины;

Методы:
 - render: генерирует HTML на основе данных корзины из "зашитого" HTML-шаблона;
 - open: открывает popup;
 - close: закрывает popup

## Класс CustomerPopupUI extends PopupUI
Отвечает за отображение формы заполнения данных пользователя.

Свойства:
 - customer: Customer: данные пользователя;

Методы:
 - render: генерирует HTML на основе данных пользователя из "зашитого" HTML-шаблона;
 - open: открывает popup;
 - close: закрывает popup