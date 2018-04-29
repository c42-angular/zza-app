import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BreezeBridgeAngularModule } from 'breeze-bridge-angular';

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
    BreezeBridgeAngularModule
  ],
  providers: [ZzaRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
