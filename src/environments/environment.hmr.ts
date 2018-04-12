import {IAppConfig} from '../app/app.config.interface';

export const environment = {
  production: false,
  hmr: true
};

export const APP_DI_CONFIG: IAppConfig = {
  loginEndpoint: 'http://127.0.0.1:8080/v1/uaa',
  logEndpoint: 'http://127.0.0.1:8080/v1/log',
  pluginEndpoint: '',
  uploadEndpoint: 'http://127.0.0.1:8080',
  requestRetry: 1,
  uploadRetry: 1,
  uploadChunkRetry: 3
};
