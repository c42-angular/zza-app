import { Component, OnInit } from '@angular/core';

import { Customer } from '../model/customer';
import { ZzaRepositoryService } from '../shared/zzarepository-service';

@Component({
    selector: 'zza-customer-list',
    templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit {
    constructor(private _zzaRepo: ZzaRepositoryService) { }

    customers: Customer[];
    
    ngOnInit() { 
        this._zzaRepo.getCustomers().then(customers => this.customers = customers,
                error => console.log(error));
    }
}