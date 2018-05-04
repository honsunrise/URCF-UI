import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APP_CONFIG, IAppConfig} from '../../../app.config.interface';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnInit {
  private sub: any;
  url: string;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.url = this.config.websEndpoint + '/' + params['name'] + '/index.html';
    });
  }

}
