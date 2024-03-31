import { ICustomer } from "../types";
import { EventEmitter } from "./base/events";

export class FormCustomerOrderUI extends EventEmitter{
    protected formElement: HTMLFormElement;
    protected buttonCardElement: HTMLButtonElement;
    protected buttonCashElement: HTMLButtonElement;
    protected inputAddressElement: HTMLInputElement;
    protected buttonSubmitElement: HTMLButtonElement;
    protected customer: ICustomer;

    constructor(formTemplate: HTMLTemplateElement, customerData: ICustomer) {
        super();
        this.formElement = formTemplate.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.buttonCardElement = this.formElement.querySelector('button[name="card"]');
        this.buttonCashElement = this.formElement.querySelector('button[name="cash"]');
        this.inputAddressElement = this.formElement.querySelector('input[name="address"]');
        this.buttonSubmitElement = this.formElement.querySelector('button[type="submit"]');
    
        this.customer = customerData;
        this.inputAddressElement.value = this.customer.address;

        if(this.customer.paymentType === 'online') this.buttonCardElement.classList.add('button_alt-active');
        if(this.customer.paymentType === 'offline') this.buttonCashElement.classList.add('button_alt-active');
        

        this.buttonCardElement.addEventListener('click', (event) => {
            this.setPaymentType('online');
            this.buttonCardElement.classList.add('button_alt-active');
            this.buttonCashElement.classList.remove('button_alt-active');
        })

        this.buttonCashElement.addEventListener('click', (event) => {
            this.setPaymentType('offline');
            this.buttonCardElement.classList.remove('button_alt-active');
            this.buttonCashElement.classList.add('button_alt-active');
        })

        this.inputAddressElement.addEventListener('change', (event) => {
            this.setAddres(this.inputAddressElement.value);
        })

        this.buttonSubmitElement.addEventListener('click', (event) => {
            event.preventDefault();
            this.emit('next');
        })

        this.validate();
    }

    render() {
        return this.formElement;
    }

    setAddres(address: string) {
        this.customer.setAddress(address);
        this.validate();
    }

    setPaymentType(type: 'online' | 'offline') {
        this.customer.setPaymentType(type);
        this.validate()
    }    

    validate() {
        console.log(this.customer);
        
        this.buttonSubmitElement.disabled = !((this.customer.address != '')&&(this.customer.paymentType != undefined));
        
    }


}