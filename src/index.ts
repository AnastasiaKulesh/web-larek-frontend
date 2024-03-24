import './scss/styles.scss';

interface ICard {
    category: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface ICardsList {
    cards: ICard[];
}

interface ICustomer {
    paymentType: 'online' | 'offline';
    address: string;
    email: string;
    phone: string;
    setPaymentType(type: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
}

interface IBasket {
    items: ICard[];
    get сountItems(): void;
    get costItems(): void;
    addItem(item: ICard): void;
    deleteItem(item: ICard): void;
    makeOrder(): boolean;
}


