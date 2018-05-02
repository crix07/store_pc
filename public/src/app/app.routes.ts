import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { PasswordComponent } from './components/password/password.component';
import { SendPassComponent } from './components/send-pass/send-pass.component';
import { SendRegisterComponent } from './components/send-register/send-register.component';

const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'done-pass', component: SendPassComponent },
  { path: 'reset-password', component: PasswordComponent },
  { path: 'send-email', component: SendRegisterComponent },
  { path: 'product', component: ProductComponent },
  { path: 'products/:termino/:page', component: ProductsComponent },
  { path: 'category/:termi', component: CategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'config', component: UserEditComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const ROUTES = RouterModule.forRoot(app_routes);
