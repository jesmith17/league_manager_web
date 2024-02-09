import { Customer } from './customer';


export interface User {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    customer: Customer;

    jwtToken: string;
    expirationDate: Date;
    expired: boolean;

    


}
