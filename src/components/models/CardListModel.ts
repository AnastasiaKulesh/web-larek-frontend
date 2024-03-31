import { ICard, ICardsList } from "../../types";


export class CardListModel implements ICardsList {
    protected _cards: ICard[];

    constructor() {
        this.cards = [];
    }

    set cards(data: ICard[]) {
        this._cards = data;
    }

    get cards() {
        return this._cards;
    }

    getCardById(id: string): ICard {
        return this._cards.find(item => item.id === id);
    }
} 