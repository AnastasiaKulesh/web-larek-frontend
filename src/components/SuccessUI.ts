import { EventEmitter } from "./base/events";

export class SuccessUI extends EventEmitter {
    protected containerElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected closeButtonElement: HTMLButtonElement;

    constructor(template: HTMLTemplateElement) {
        super();
        this.containerElement = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
        this.descriptionElement = this.containerElement.querySelector('.order-success__description');
        this.closeButtonElement = this.containerElement.querySelector('.button');
    
        this.closeButtonElement.addEventListener('click', (event) => {
            this.emit('closeSuccessPopup')
        })
    }

    render(cost: number) {
        this.descriptionElement.textContent = `Списано ${cost} синапсов`;
        return this.containerElement;
    }
}