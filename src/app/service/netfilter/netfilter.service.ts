import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IptableRule} from '../domain/iptable-rule';

@Injectable()
export class NetfilterService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getAll(): Observable<IptableRule[]> {
    return this.http.get<IptableRule[]>(this.config.netfilterEndpoint + '/list');
  }

  getChains(): Observable<string[]> {
    return this.http.get<string[]>(this.config.netfilterEndpoint + '/list/filter');
  }

  stop(name: string): Observable<Object> {
    return this.http.delete(this.config.netfilterEndpoint + '/' + name);
  }

  kill(name: string): Observable<Object> {
    return this.http.delete(this.config.netfilterEndpoint + '/' + name);
  }
}
