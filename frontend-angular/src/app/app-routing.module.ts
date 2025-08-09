import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Update the path below to the correct location if necessary
// If the file does not exist, create 'login.component.ts' in 'src/app/components/login/'
import { LoginComponent } from './components/login/login.component'; // If the file does not exist, create 'login.component.ts' in 'src/app/components/login/'
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
// 1. Import your new AuthGuard
import { AuthGuard } from './guards/auth.guard';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

const routes: Routes = [
  // These routes are public and do not have the guard
  { path: 'login', component: LoginComponent },
  { path: 'login-success', component: LoginSuccessComponent },


  // 2. Add `canActivate: [AuthGuard]` to all protected routes
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/new', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },

  // Product management routes (no AuthGuard)
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  // Product management routes (no AuthGuard)
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },

  { path: 'inventory', component: InventoryListComponent },
  { path: 'inventory/new', component: InventoryFormComponent },
  { path: 'inventory/edit/:id', component: InventoryFormComponent },

  // 3. Set the default path to a protected route.
  // When a user first visits the site, this will trigger the AuthGuard.
  // If they are not logged in, the guard will redirect them to '/login'.
  { path: '', redirectTo: '/employees', pathMatch: 'full' },

  // A wildcard route to handle any other paths
  { path: '**', redirectTo: '/employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }