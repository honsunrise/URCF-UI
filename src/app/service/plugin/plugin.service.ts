import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {PluginsWithTotal} from '../domain/plugin';

@Injectable()
export class PluginService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getPluginList(page: number = 0, size: number = 30): Observable<PluginsWithTotal> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<PluginsWithTotal>(this.config.pluginEndpoint + '/list', {
      params: params,
    });
  }

  installPlugin(fileItem: File, flag: string): any {
    console.dir(fileItem);
    console.log(fileItem);
    const formData: FormData = new FormData();
    formData.append('file', fileItem, fileItem.name);
    formData.append('flag', flag);

    const req = new HttpRequest('POST', this.config.pluginEndpoint + '/', formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
}
