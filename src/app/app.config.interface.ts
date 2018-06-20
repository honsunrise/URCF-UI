import {InjectionToken} from '@angular/core';

export interface IAppConfig {
  loginEndpoint: string;
  logEndpoint: string;
  processesEndpoint: string;
  pluginEndpoint: string;
  uploadEndpoint: string;
  websEndpoint: string;
  requestRetry: number;
  uploadRetry: number;
  uploadChunkRetry: number;
}

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
