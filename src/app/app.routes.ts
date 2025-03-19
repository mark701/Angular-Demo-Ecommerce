import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { MyAccountComponent } from './Components/my-account/my-account.component'; 

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../Auth/auth.guard';
import { UnAuthGuard } from '../Auth/unauth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnAuthGuard] },
  { path: 'MyOrders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'MyAccount', component: MyAccountComponent, canActivate: [AuthGuard] },
  // Redirect to HomeComponent if the route is not found
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [

      
      RouterModule.forRoot(routes),
      BrowserModule,
      FormsModule],
      
      
    exports: [RouterModule]
  })
export class AppRoutingModule   { }