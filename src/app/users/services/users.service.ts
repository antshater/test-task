import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../user.interface';
import {ListResponse} from '../../shared.interface';
import {map} from 'rxjs/operators';
import {CachingHttpService} from '../../services/caching-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private cachingClient: CachingHttpService) {

  }

  list(page: string): Observable<ListResponse<User[]>> {
    return <Observable<ListResponse<User[]>>>this.cachingClient.get('/api/users', {page: page});
  }

  one(id: number): Observable<User> {
    return this.cachingClient.get(`/api/users/${id}`).pipe(map(response => response['data']));
  }
}
