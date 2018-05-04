import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PluginService} from '../../../service/plugin/plugin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private pluginService: PluginService, private router: Router) {}

  ngOnInit(): void {
  }
}
