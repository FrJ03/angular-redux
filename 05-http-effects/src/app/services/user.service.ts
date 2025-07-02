import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import axios from 'axios'
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserType { 
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userMock = new BehaviorSubject<User[]>([
    {
            "id": 1,
            "email": "george.bluth@reqres.in",
            "first_name": "George",
            "last_name": "Bluth",
            "avatar": "https://reqres.in/img/faces/1-image.jpg"
        },
        {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        {
            "id": 3,
            "email": "emma.wong@reqres.in",
            "first_name": "Emma",
            "last_name": "Wong",
            "avatar": "https://reqres.in/img/faces/3-image.jpg"
        },
        {
            "id": 4,
            "email": "eve.holt@reqres.in",
            "first_name": "Eve",
            "last_name": "Holt",
            "avatar": "https://reqres.in/img/faces/4-image.jpg"
        },
        {
            "id": 5,
            "email": "charles.morris@reqres.in",
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://reqres.in/img/faces/5-image.jpg"
        },
        {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg"
        }
  ])

  constructor(private http: HttpClient) { }

  getUsers(){
    if(environment.PROD){
      return this.http.get(
        `${environment.BASE_URL}users?per_page=6`,
        {
          headers: {
            "x-api-key": environment.API_KEY
          }
        }
      )
    } else 
      return this.userMock.asObservable()
  }
}
