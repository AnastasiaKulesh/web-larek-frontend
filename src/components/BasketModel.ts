import { IBasket, ICard, ICardsList } from "../types";

export class BasketModel implements IBasket {
    protected _items: ICard[];

    constructor() {
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
    }

    deleteItem(id: string) {
        this._items = this._items.filter(item => item.id != id);
        console.log(this._items);
        
    }

    clear() {
        this._items = null;
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