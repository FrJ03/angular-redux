import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  logout(){
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }
}
