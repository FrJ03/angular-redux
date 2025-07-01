import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private auth: AuthService){
    this.auth.initAuthListener()
  }

}
