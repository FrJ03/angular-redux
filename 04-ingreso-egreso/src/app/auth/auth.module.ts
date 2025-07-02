import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
