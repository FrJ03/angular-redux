import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
