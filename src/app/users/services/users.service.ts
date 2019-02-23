import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user.interface';
import {ListResponse} from '../../shared.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {

  }

  list(page: string): Observable<ListResponse<User[]>> {
    return <Observable<ListResponse<User[]>>>this.httpClient.get('/api/users', {params: {page: page}});
  }

  one(id: number): Observable<User> {
    return this.httpClient.get(`/api/users/${id}`).pipe(map(response => response['data']));
  }
}
