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
- src/scss/styles.scss — корневой файл стилей
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
## Базовый код
## Класс API
Отвечает за взаимодействие с сервером.

Свойства:
 - baseUrl: string;
 - options: RequestInit

Методы:
 - handleResponse(response: Response): возвращает ответ сервера в формате JSON и обрабатывает возникающие ошибки
 - get(uri: string) - возвращает информацию от сервера. Использует метод handleResponse()
 - post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправляет данные на сервер и возвращает полученную информацию от сервера. Использует метод handleResponse()

## Класс EventEmitter
Отвечает за работу с событиями (является брокером-событий).

Методы:
  - on: устанавливает обработчик на событие;
  - off: снимает обработчик с события;
  - emit: инициирует событие с данными;
  - onAll: слушает все события;
  - offAll: сбрасывает всех обработчиков;
  - trigger: генерирует события с заданными аргументами при вызове


## Модели данных
## Класс CardListModel
Отвечает за список всех карточек товаров.

Конструктор - пустой, не принимает свойства.

Свойства:
 - cards: ICard[] - массив всех карточек

Геттеры / сеттеры:
 - cards: get - получает массив карточек, set - сохраняет массив карточек

Методы:
 - getCardById(id: string): получает данные карточки по ID. Возвращает данные карточки интерфеса ICard.

## Класс CustomerModel
Отвечает за хранение данных заказа.

Свойства:
 - paymentType: 'online' | 'offline' - способ оплаты;
 - address: string - адрес доставки;
 - email: string - E-mail покупателя;
 - phone: string - номер телефона;

Конструктор - пустой, не принимает свойства.

Геттеры:
 - paymentType(): 'online' | 'ofline' - получает текущий способ оплаты;
 - address(): string - получает текущий адрес доставки;
 - email(): string - получает текущий email;
 - phone(): string - получает текущий номер телефона.

Методы:
 - setPaymentType(type: string): устанавливает способ оплаты;
 - setAddress(address: string): устанавливает адрес доставки;
 - setEmail(email: string): устанавливает E-mail покупателя;
 - setPhone(phone: string): устанавливает номер телефона;

## Класс BasketModel
Отвечает за хранение и работу с выбранным списком товаров.
Класс наследуется от EventEmitter.
Инициирует событие 'changeCountItem' при изменении количества товаров в корзине.

Свойства: 
 - items: ICard[] - массив выбранных карточек

Конструктор - пустой, не принимает свойства.

Геттеры:
 - сountItems(): number - возвращает количество выбранных товаров
 - costItems(): number - возвращает итоговую стоимость заказа
 - items(): ICard[] - получает список выбранных товаров

Методы:
 - addItem(item: ICard): добавляет карточку в корзину
 - deleteItem(id: string): удаляет карточку по ее ID
 - clear(): очищает корзину



## Модель представления

## PageUI 
Отвечает за управление содержимым основных элементов страницы: 
 - основной каталог товаров;
 - количество выбранных товаров
 Класс наследуется от EventEmitter.
 Инициирует событие 'openBasketPopup' для открытия корзины товаров.

Свойства:
 - _catalog: HTMLElement - каталог товаров
 - _basketButton: HTMLButtonElement - кнопка корзины, при нажатии на которую открывается окно popup корзины
 - _countBasketItems: HTMLElement - количество товаров в корзине
 
Конструктор - пустой, не принимает свойства.
 
Сеттеры:
 - catalog(items: HTMLElement[]) - обновляет данные каталога товаров
 - counter(value: number): обновляет информацию о количестве товаров в корзине

## Класс CardUI

Отвечает за отображение карточки в зависимости от переданного template (для главной страницы, для popup, для корзины)

Конструктор принимает свойства:
 - template: HTMLElement - теплейт для вывода карточки товара

Методы:
 - render(card: ICard, idx: number): HTMLElement - возвращает разметку карточки товара согласно переданному template
 - setDetailHandler(handleOpenDetailPopup: Function, card: ICard): void - устанавливает обработчик нажатия на карточку для открытия popup с детальной информацией
 - setAddItemBasketHandler(handleAddItemBasket: Function, card: ICard): void - устанавливает обработчик на кнопку "В корзину" для добавления товара в корзину
 - setDeleteBasketItemHandler(handleDeleteItemBasket: Function, card: ICard): void - устанавливает обработчик на кнопку удаления товара и вызывает соответствующую функцию
 
## Класс PopupUI
Отвечает за отображение popup-элементов для следующих объектов: корзина, детальное описание карточки, данные пользователя для оформления заказа, информация об успешном оформлении заказа.
В качестве входных данных принимает заполненную template-разметку для отображения и событие на кнопке.

Свойства:
 - _content: HTMLElement - содержимое popup;
 - popupContainer: HTMLElement - контейнер для отображения содержимого popup;
 - closeButton: HTMLButtonElement - кнопка закрытия popup

Конструктор принимает свойства:
 - container: HTMLElement - основной контейнер popup

Сеттеры:
 - content(value: HTMLElement): устанавливает содержимое в контейнер внутри popup

Методы:
 - open(): открывает popup;
 - close(): закрывает popup

## Класс BasketUI
Отвечает за отображение корзины с товарами.
Класс наследуется от EventEmitter. 
Инициирует событие 'makeOrder' по нажатию кнопки "Оформить"

Свойства:
 - basketElement: HTMLElement - клонированный темплейт;
 - basketListElement: HTMLElement - список выбранных товаров;
 - basketButtonElement: HTMLButtonElement - кнопка "Оформить" для оформления заказа
 - basketPriceElement: HTMLElement - общая сумма заказа

 Конструктор принимает свойства:
  - template: HTMLTemplateElement - теплейт корзины товаров
 
Методы:
 - render(items: HTMLElement[], basket: IBasket): HTMLElement - возвращает элемент корзины
- makeOrderHandler(handleOrder: Function) - устанавливает слушателя на кнопку "Оформить" и вызывает функцию для оформления заказа

## Класс FormCustomerContactsUI 
Отвечает за отображения формы для ввода данных заказчика. 
Класс наследуется от EventEmitter. 
Инициирует событие 'makeOrderSubmit' по нажатию кнопки "Оформить"

Свойства: 
 - formElement: HTMLFormElement - клонированная форма ввода данных
 - inputEmailElement: HTMLInputElement - поле ввода email
 - inputPhoneElement: HTMLInputElement - поле ввода номера телефона
 - buttonSubmitElement: HTMLButtonElement - кнопка оформления заказа
 - customer: ICustomer - ссылка на объект хранения данных

Конструктор принимает свойства:
 - formTemplate: HTMLTemplateElement - темплейт формы заполнения данных заказчика
 - customerData: ICustomer - ссылка на объект хранения данных

Методы:
 - render(): возвращает элемент формы;
 - setEmail(email: string): устанавливает email;
 - setPhone(phone: string): устанавливает phone;
 - validate(): проверяет корретность ввода 

## Класс FormCustomerContactsUI 
Отвечает за отображения формы для ввода данных заказчика. 
Класс наследуется от EventEmitter. 
Инициирует событие 'next' по нажатию кнопки "Далее"

Свойства: 
 - formElement: HTMLFormElement - клонированная форма ввода данных;
 - buttonCardElement: HTMLInputElement - кнопка выбора оплаты "Онлайн";
 - buttonCashElement: HTMLButtonElement - кнопка выбора оплаты "Оффлайн";
- inputAddressElement: HTMLButtonElement - поле ввода номера адреса заказчика;
 - buttonSubmitElement: HTMLButtonElement - кнопка перехода к следующей форме;
 - customer: ICustomer - ссылка на объект хранения данных

Конструктор принимает свойства:
 - formTemplate: HTMLTemplateElement - темплейт формы заполнения данных заказчика
 - customerData: ICustomer - ссылка на объект хранения данных

Методы:
 - render(): возвращает элемент формы;
 - ssetAddres(address: string): устанавливает адрес заказчика;
 - setPaymentType(type: 'online' | 'offline'): устанавливает тип оплаты;
 - validate(): проверяет корретность ввода  

## Взаимодействие данных и отображения
Взаимодействие отображения и данных между собой осуществляется при помощи реализации подписки и отслеживания событий через брокер-событий.

Для управления состоянием приложения используются основные события:
 - openBasketPopup: открыть корзину
 - changeCountItem: изменение количества товаров в корзине (добавление/удаление товаров)
 - makeOrder: переход к формам оформления заказ
 - next: переход на следующую форму для заполнения данных заказа
 - makeOrderSubmit: оформление и отправка заказа

