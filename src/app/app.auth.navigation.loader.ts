import {NavigationLoader} from './widgets/navigation/navigation.loader';
import {Observable} from 'rxjs/Rx';
import {AuthService} from './service/auth/auth.service';

export class AuthNavigationLoader implements NavigationLoader {

  constructor(private authService: AuthService) {
  }

  getItems(): Observable<any> {
    if (this.authService.checkLogin()) {
      return Observable.of([
        {
          'id': 'plugin',
          'title': 'Plugin',
          'type': 'item',
          'icon': 'home',
          'url': '/home'
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
              'id': 'favorite',
              'title': 'Config',
              'type': 'item',
              'icon': 'setting',
              'url': '/config'
            },
          ]
        }
      ]);
    } else {
      return Observable.of([]);
    }
  }
}
