import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {LogWithTotal} from '../domain/log';

@Injectable()
export class LogService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getAll(sort: string, order: string, page: number = 0, size: number = 30): Observable<LogWithTotal> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10))
      .set('sort', sort)
      .set('order', order);
    return this.http.get<LogWithTotal>(this.config.logEndpoint + '/list', {
      params: params,
    });
  }

  clean(id?: number): Observable<boolean> {
    return this.http.delete(this.config.logEndpoint + '/clean/' + id).map(() => true);
  }
}
