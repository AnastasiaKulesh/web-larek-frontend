import { ICustomer } from "../../types";

export class CustomerModel implements ICustomer {
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected _paymentType: 'online' | 'offline';

    constructor() {
        this._address = '';
        this._email = '';
        this._phone = '';
        this._paymentType = 'online';
    }

    setPaymentType(type: 'online' | 'offline') {
        this._paymentType = type;
    }

    setAddress(address: string) {
        this._address = address;
    }

    setEmail(email: string) {
        this._email = email;
    }

    setPhone(phone: string) {
        this._phone = phone;
    }

    get paymentType() {
        return this._paymentType;
    }

    get address() {
        return this._address;
    }

    get email() {
        return this._email;
    }

    get phone() {
        return this._phone;
    }


}