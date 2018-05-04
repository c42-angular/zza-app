import { Order } from './../../model/order';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZzaRepositoryService } from '../../shared/zzarepository-service';
import { Customer } from '../../model/entity-model';

@Component({
  selector: 'zza-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  private customer: Customer = new Customer();
  private errorMessage: string;
  private orders: Order[];

  constructor(private _router: Router, private _route: ActivatedRoute, private _zzaRepo: ZzaRepositoryService) { }

  ngOnInit() {
    const id = this._route.snapshot.params['customer-id'];
    this._zzaRepo.getCustomer(id).then(customer => {
      this.customer = customer;
      this._zzaRepo.getCustomerOrderHistory(id).then(orders => this.orders = orders);
    }, error => {
        this.errorMessage = error;
    });
  }

  onSave() {
    this._zzaRepo.saveChanges().then(() => {
      this.ngOnInit();
      this._router.navigate(['customer-list']);
    }, error => {
      this.errorMessage = error;
    });
  }
}
