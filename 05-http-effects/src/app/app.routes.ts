import { Routes } from '@angular/router';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserComponent } from './components/users/user/user.component';

export const routes: Routes = [
    {
        path: 'home', component: UserListComponent
    },
    {
        path: 'user/:id', component: UserComponent
    },
    {
        path: '**', redirectTo: 'home'
    }
];
