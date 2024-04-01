import { IBasket, ICard, ICardsList } from "../../types";
import { EventEmitter } from "../base/events";

export class BasketModel extends EventEmitter implements IBasket {
    protected _items: ICard[];

    constructor() {
        super();
        this._items = [];
    }

    get countItems() {
        return this._items.length;
    }

    get costItems() {
        return this._items.reduce((cost, item) => cost + item.price, 0);;
    }

    get items() {
        return this._items;
    }

    addItem(item: ICard) {
        if (this._items.find(element => element.id === item.id) != undefined) return;
        this._items.push(item);
        this.emit('changeCountItem');
    }

    deleteItem(id: string) {
        this._items = this._items.filter(item => item.id != id);
        this.emit('changeCountItem');
    }

    clear() {
        this._items = [];
        this.emit('changeCountItem');
    }

    checkItemById(id: string): boolean {
        return (this._items.find(element => element.id === id) != undefined);

    }
}




// export interface IBasket {
//     items: ICard[];
//     get сountItems(): void;
//     get costItems(): void;
//     addItem(item: ICard): void;
//     deleteItem(item: ICard): void;
//     makeOrder(): boolean;
// }