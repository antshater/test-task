import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CachingHttpService {

  private cached: {[index: string]: Observable<any>} = {};

  constructor(private httpClient: HttpClient) { }

  get<T>(route: string, params = {}) {
    const key = JSON.stringify(params) + route;
    if (! this.cached[key]) {
      this.cached[key] = this.httpClient.get(route, {params}).pipe(
        publishReplay(1),
        refCount(),
      );
    }
    return this.cached[key];
  }
}
