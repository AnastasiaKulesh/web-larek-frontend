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
}

export interface IBasket {
    items: ICard[];
    get сountItems(): void;
    get costItems(): void;
    addItem(item: ICard): void;
    deleteItem(item: ICard): void;
    makeOrder(): boolean;
}
