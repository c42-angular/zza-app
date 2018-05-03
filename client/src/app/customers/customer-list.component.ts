import { Component, OnInit } from '@angular/core';

import { Customer } from '../model/customer';
import { ZzaRepositoryService } from '../shared/zzarepository-service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'zza-customer-list',
    templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit {
    private selectedCustomer: Customer;

    constructor(private _zzaRepo: ZzaRepositoryService) { }

    customers: Customer[];

    ngOnInit() {
        this._zzaRepo.getCustomers().then(customers => {
            this.customers = customers;
        },
                error => console.log(error));
    }

    save() {
        this._zzaRepo.saveChanges().then(() => this.ngOnInit(),
                    error => console.log(error));
    }

    onSelect(customer: Customer) {
      this.selectedCustomer = customer;
    }
}
