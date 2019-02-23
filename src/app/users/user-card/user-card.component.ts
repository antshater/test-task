import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {User} from '../user.interface';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {flatMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnDestroy {

  user: User;

  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      flatMap(params => this.usersService.one(params.id))
    ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
