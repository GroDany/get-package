import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'order-delivery', component: OrderDeliveryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
