import {InjectionToken} from '@angular/core';

export interface IAppConfig {
  loginEndpoint: string;
  contentEndpoint: string;
  uploadEndpoint: string;
  requestRetry: number;
  uploadRetry: number;
  uploadChunkRetry: number;
}

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
