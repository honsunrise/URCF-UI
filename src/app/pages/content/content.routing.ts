import {Routes} from '@angular/router';

import {BlankComponent} from './blank/blank.component';
import {MainComponent} from './main/main.component';
import {LogComponent} from './log/log.component';
import {AuthGuard} from '../../service/auth/auth.guard.service';
import {NetfilterComponent} from './netfilter/netfilter.component';
import {ConfigComponent} from './config/config.component';
import {PluginsComponent} from './plugins/plugins.component';
import {ProcessesComponent} from './processes/processes.component';
import {PluginComponent} from './plugin/plugin.component';

export const ContentRoutes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [{
      path: 'home',
      component: MainComponent
    }, {
      path: 'plugins',
      component: PluginsComponent
    }, {
      path: 'plugins/:name',
      component: PluginComponent
    }, {
      path: 'log',
      component: LogComponent
    }, {
      path: 'config',
      component: ConfigComponent
    }, {
      path: 'netfilter',
      component: NetfilterComponent
    }, {
      path: 'processes',
      component: ProcessesComponent
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
