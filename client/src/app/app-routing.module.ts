import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { InitGuard } from './shared/init-guard';

const routes: Routes = [
  { path: '', canActivateChild: [InitGuard], children: [
    { path: '', component: CustomerListComponent },
    { path: 'customer-list', component: CustomerListComponent },
    { path: 'customer-detail/:customer-id', component: CustomerDetailComponent },
    { path: 'customer-add', component: CustomerDetailComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

