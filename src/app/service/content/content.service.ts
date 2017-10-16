import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../app.config.constants';
import { IAppConfig } from '../../app.config.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Info } from '../domain/info';
import { Observable } from 'rxjs/Observable';


export interface PublishInfo {
  title: String;
  content: String;
  images: Array<String>;
  movie: String;
  external: boolean;
  canReview: boolean;
}

@Injectable()
export class ContentService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getInfoList(page: number, offset: number, uid?: string): Observable<Array<Info>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', page.toString(10));
    if (uid != null) {
      params.set('uid', uid);
    }
    return this.http.get<Array<Info>>(this.config.contentEndpoint + '/info/all', {
      params: params,
    });
  }

  getInfoDetail(infoId: string): Observable<Info> {
    return this.http.get<Info>(this.config.contentEndpoint + '/info/' + infoId);
  }

  publishInfo(title: string, content: string, images: Array<string>, movie: string,
              external: boolean, canReview: boolean): Observable<boolean> {
    return this.http.post(this.config.contentEndpoint + '/info/publish', {
      title: title,
      content: content,
      images: images,
      movie: movie,
      external: external,
      canReview: canReview,
      location: {
        alt: 0,
        lat: 0,
        lon: 0
      }
    }, {withCredentials: true}).do(data => console.log(data), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }
}