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

  constructor(private _router: Router, private _route: ActivatedRoute, private _zzaRepo: ZzaRepositoryService) { }

  ngOnInit() {
    const id = this._route.snapshot.params['customer-id'];
    this._zzaRepo.getCustomer(id).then(customer => {
      this.customer = customer;
    }, error => {
        this.errorMessage = error;
    });
  }

  onSave() {
    this._zzaRepo.saveChanges().then(() => {
      this.ngOnInit();
    }, error => {
      this.errorMessage = error;
    });
  }
}
