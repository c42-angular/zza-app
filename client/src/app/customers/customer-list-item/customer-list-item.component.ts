import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../model/entity-model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'zza-customer-list-item',
  templateUrl: './customer-list-item.component.html',
  styleUrls: ['./customer-list-item.component.css']
})
export class CustomerListItemComponent implements OnInit {
  private isSelected: boolean;

  constructor() { }

  @Input()
  public customer: Customer;
  @Input()
  public set selectedCustomer(value: Customer ) {
    if (value === this.customer) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  ngOnInit() {
  }

}
