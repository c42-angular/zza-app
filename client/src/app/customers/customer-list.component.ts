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
    private currentPage = 1;
    private pageCount: number;
    private _totalRecords: number;
    private _pageSize = 5;

    constructor(private _zzaRepo: ZzaRepositoryService, private _elementRef: ElementRef) {
      const eventStream = Observable.fromEvent(_elementRef.nativeElement, 'keyup')
                .map((() => this.searchInput))
                .debounceTime(500)
                .distinctUntilChanged();
      eventStream.subscribe(input => this.search(input));
    }

    customers: Customer[];

    ngOnInit() {
        this._zzaRepo.getCustomers(1, this._pageSize).then(result => {
            this.customers = result.customers;
            this._totalRecords = result.totalRecords;
            this.pageCount = Math.floor(this._totalRecords / this._pageSize);
            if (this.pageCount < (this._totalRecords / this._pageSize)) { this.pageCount += 1; }
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

    pageUp() {
      if (this.currentPage * this._pageSize >= this._totalRecords) return;

        const newPage = this.currentPage + 1;

        this._zzaRepo.getCustomers(newPage, this._pageSize).then(result => {
          this.customers = result.customers;
          this.currentPage = newPage;
      },
      error => console.log(error));
    }

    pageDown() {
      if (this.currentPage === 1) return;

        const newPage = this.currentPage - 1;

        this._zzaRepo.getCustomers(newPage, this._pageSize).then(result => {
          this.customers = result.customers;
          this.currentPage = newPage;
      },
      error => console.log(error));
    }
}
