import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserCardComponent} from './users/user-card/user-card.component';

const routes: Routes = [
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: 'users/:id',
    component: UserCardComponent,
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
