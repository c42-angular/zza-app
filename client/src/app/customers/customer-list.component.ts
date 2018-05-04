import { Component, OnInit, ElementRef } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

import { Customer } from '../model/customer';
import { ZzaRepositoryService } from '../shared/zzarepository-service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'zza-customer-list',
    templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit {
    private selectedCustomer: Customer;
    private searchField = 'name';
    private searchInput: string;

    constructor(private _zzaRepo: ZzaRepositoryService, private _elementRef: ElementRef) {
      const eventStream = Observable.fromEvent(_elementRef.nativeElement, 'keyup')
                .map((() => this.searchInput))
                .debounceTime(500)
                .distinctUntilChanged();
      eventStream.subscribe(input => this.search(input));
    }

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

    search(value) {
      this._zzaRepo.search(value, this.searchField).then(customers => {
        this.customers = customers;
      }, error => console.log(error));
    }
}
