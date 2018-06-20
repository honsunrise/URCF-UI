import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Process} from '../domain/process';

@Injectable()
export class ProcessesService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getAll(): Observable<Process[]> {
    return this.http.get<Process[]>(this.config.processesEndpoint + '/list');
  }

  stop(name: string): Observable<Object> {
    return this.http.delete(this.config.processesEndpoint + '/' + name);
  }

  kill(name: string): Observable<Object> {
    return this.http.delete(this.config.processesEndpoint + '/' + name);
  }
}
