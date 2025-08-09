import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// --- Routing ---
import { AppRoutingModule } from './app-routing.module';

// --- Components ---
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';

// --- Interceptors ---
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
// Import your new AuthInterceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    LoginSuccessComponent,
    UserListComponent,
    UserFormComponent,
    OrderListComponent,
    ProductListComponent,
    ProductFormComponent,
    OrderFormComponent,
    InventoryListComponent,
    InventoryFormComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule // This import makes RouterModule's directives (like routerLink) available
  ],
   // Add the interceptor to the providers array
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }