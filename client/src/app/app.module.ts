import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';
import { NamingConvention } from 'breeze-client';

import { AppComponent } from './app.component';
import { ZzaRepositoryService } from './shared/zzarepository-service';
import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerListItemComponent } from './customers/customer-list-item/customer-list-item.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderItemsConcatProductsPipe } from './shared/order-items-concat-products.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerListItemComponent,
    CustomerDetailComponent,
    OrderItemsConcatProductsPipe
  ],
  imports: [
    BrowserModule,
    BreezeBridgeAngularModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ZzaRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    NamingConvention.camelCase.setAsDefault();
  }
}
