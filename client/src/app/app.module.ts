import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';
import { NamingConvention } from 'breeze-client';

import { AppComponent } from './app.component';
import { ZzaRepositoryService } from './shared/zzarepository-service';
import { CustomerListComponent } from './customers/customer-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    BreezeBridgeAngularModule,
    HttpModule,
    FormsModule
  ],
  providers: [ZzaRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    NamingConvention.camelCase.setAsDefault();
  }
}
