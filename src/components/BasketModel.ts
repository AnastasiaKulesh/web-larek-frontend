import { IBasket, ICard, ICardsList } from "../types";
import { EventEmitter } from "./base/events";

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
        let cost: number = 0;
        
        this._items.forEach(item => {   
            if (item.price != null) cost += item.price;
        })
        return cost;
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
        console.log(this._items);
        this.emit('changeCountItem');
    }

    clear() {
        this._items = [];
        this.emit('changeCountItem');
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