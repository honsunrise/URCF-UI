import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public register(email: string, password: string): Observable<Object> {
    return this.http.post(this.config.loginEndpoint + '/register', {
      email: email,
      password: password
    }, {
      params: new HttpParams().set('type', 'email'),
    });
  }

  public changePassword(password: string, oldPassword: string): Observable<Object> {
    return this.http.post(this.config.loginEndpoint + '/change_password', {
      new_password: password,
      old_password: oldPassword
    });
  }
}
