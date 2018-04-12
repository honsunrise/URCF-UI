import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Plugin} from '../domain/plugin';

@Injectable()
export class PluginService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getPluginList(page: number, size: number): Observable<Plugin[]> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<Plugin>>(this.config.logEndpoint + '/list', {
      params: params,
    });
  }
}
