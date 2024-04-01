export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ICardsList {
    cards: ICard[];
}

export interface ICustomer {
    paymentType: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
    setPaymentType(type: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    clear(): void;
    // validate(inputElement: HTMLElement): boolean;
}

export interface IBasket {
    items: ICard[];
    readonly countItems: number;
    readonly costItems: number;
    addItem(item: ICard): void;
    deleteItem(id: string): void;
    checkItemById(id: string): boolean;
    clear(): void;
}

export interface IPopup {
    content: HTMLElement;
    open(): void;
    close(): void;
}