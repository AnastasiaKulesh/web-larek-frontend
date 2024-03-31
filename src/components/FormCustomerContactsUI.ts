import { ICustomer } from "../types";
import { EventEmitter } from "./base/events";

export class FormCustomerContactsUI extends EventEmitter{
    protected formElement: HTMLFormElement;
    protected inputEmailElement: HTMLInputElement;
    protected inputPhoneElement: HTMLInputElement;
    protected buttonSubmitElement: HTMLButtonElement;
    protected customer: ICustomer;

    constructor(formTemplate: HTMLTemplateElement, customerData: ICustomer) {
        super();
        this.formElement = formTemplate.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.inputEmailElement = this.formElement.querySelector('input[name="email"]');
        this.inputPhoneElement = this.formElement.querySelector('input[name="phone"]');
        this.buttonSubmitElement = this.formElement.querySelector('button[type="submit"]');
    
        this.customer = customerData;
        this.inputEmailElement.value = this.customer.email;
        this.inputPhoneElement.value = this.customer.phone;
        
        this.inputEmailElement.addEventListener('change', (event) => {
            this.setEmail(this.inputEmailElement.value);
        })

        this.inputPhoneElement.addEventListener('change', (event) => {
            this.setPhone(this.inputPhoneElement.value);
        })

        this.buttonSubmitElement.addEventListener('click', (event) => {
            event.preventDefault();
            this.emit('makeOrderSubmit');
        })

        this.validate();
    }

    render() {
        return this.formElement;
    }

    setEmail(email: string) {
        this.customer.setEmail(email);
        this.validate();
    }

    setPhone(phone: string) {
        this.customer.setPhone(phone);
        this.validate();
    }

    validate() {
        this.buttonSubmitElement.disabled = !((this.customer.email != '')&&(this.customer.phone.length > 10));        
    }


}