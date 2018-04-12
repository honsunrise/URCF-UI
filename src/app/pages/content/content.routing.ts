import {Routes} from '@angular/router';

import {BlankComponent} from './blank/blank.component';
import {MainComponent} from './main/main.component';
import {LogComponent} from './log/log.component';
import {AuthGuard} from '../../service/auth/auth.guard.service';

export const ContentRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [{
      path: 'home',
      component: MainComponent
    }, {
      path: 'log',
      component: LogComponent
    }, {
      path: 'block',
      component: BlankComponent
    }, {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }]
  }
];
