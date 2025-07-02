import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private router: Router){}

  goToUser(id: string) {
    if(!id){
      return
    }

    this.router.navigate(['user', id])
  }
}
