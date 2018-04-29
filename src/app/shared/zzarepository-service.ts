import { Injectable } from '@angular/core';

import { Customer } from '../model/customer';
import { reject } from 'q';

@Injectable()
export class ZzaRepositoryService {

    constructor() { }

    getCustomers() : Promise<Customer[]> {
        let promise = new Promise<Customer[]>((resolve, reject) => {
            let customers = this.getDummyCustomerData();

            resolve(customers);
        });

        return promise;
    }

    private getDummyCustomerData(): Customer[] {
        let cust1 = new Customer();
        cust1.firstName = 'Brad';
        cust1.lastName = 'Pitt';
        let cust2 = new Customer();
        cust2.firstName = 'Tom';
        cust2.lastName = 'Hanks';

        let customers: Customer[] = [cust1, cust2];

        return customers;
    }
}