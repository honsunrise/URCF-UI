import {IAppConfig} from '../app/app.config.interface';

export const environment = {
  production: false,
  hmr: true
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
