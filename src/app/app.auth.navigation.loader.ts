import {NavigationLoader} from './widgets/navigation/navigation.loader';
import {Observable, of} from 'rxjs';
import {AuthService} from './service/auth/auth.service';

export class AuthNavigationLoader implements NavigationLoader {

  constructor(private authService: AuthService) {
  }

  getItems(): Observable<any> {
    if (this.authService.checkLogin()) {
      return of([
        {
          'id': 'dashboard',
          'title': 'Dashboard',
          'type': 'item',
          'icon': 'home',
          'url': '/home'
        },
        {
          'id': 'plugins',
          'title': 'Plugin',
          'type': 'item',
          'icon': 'extension',
          'url': '/plugins'
        },
        {
          'id': 'system',
          'title': 'System',
          'type': 'group',
          'children': [
            {
              'id': 'log',
              'title': 'Log',
              'type': 'item',
              'icon': 'history',
              'url': '/log'
            },
            {
              'id': 'config',
              'title': 'Config',
              'type': 'item',
              'icon': 'settings',
              'url': '/config'
            },
            {
              'id': 'config',
              'title': 'Netfilter',
              'type': 'item',
              'icon': 'settings_ethernet',
              'url': '/netfilter'
            },
            {
              'id': 'processes',
              'title': 'Processes',
              'type': 'item',
              'icon': 'developer_board',
              'url': '/processes'
            }
          ]
        }
      ]);
    } else {
      return of([]);
    }
  }
}
