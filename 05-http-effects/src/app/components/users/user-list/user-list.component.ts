import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = []
  constructor(private userService: UserService){ }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers()

    console.log(this.users)
  }
}
