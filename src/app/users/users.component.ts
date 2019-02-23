import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './user.interface';
import {UsersService} from './services/users.service';
import {ListResponse} from '../shared.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {flatMap, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  response: ListResponse<User[]>;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.users$ = this.activatedRoute.queryParams.pipe(
      flatMap(params => this.usersService.list(params.page || '')),
      tap(response => this.response = response),
      map(response => response.data)
    );
  }
}
