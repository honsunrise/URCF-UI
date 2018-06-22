import {IAppConfig} from '../app/app.config.interface';

export const environment = {
  production: true,
  hmr: false
};

export const APP_DI_CONFIG: IAppConfig = {
  loginEndpoint: 'http://127.0.0.1:8080/v1/uaa',
  logEndpoint: 'http://127.0.0.1:8080/v1/log',
  processesEndpoint: 'http://127.0.0.1:8080/v1/processes',
  netfilterEndpoint: 'http://127.0.0.1:8080/v1/netfilter',
  pluginEndpoint: 'http://127.0.0.1:8080/v1/plugins',
  websEndpoint: 'http://127.0.0.1:8081',
  uploadEndpoint: 'http://127.0.0.1:8080',
  requestRetry: 1,
  uploadRetry: 1,
  uploadChunkRetry: 3
};
