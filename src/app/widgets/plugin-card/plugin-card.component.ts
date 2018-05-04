import {Component, Input, OnInit} from '@angular/core';
import {PluginCardMedia} from './plugin-card.media';

@Component({
  selector: 'app-plugin-card',
  templateUrl: './plugin-card.component.html',
  styleUrls: ['./plugin-card.component.scss']
})
export class PluginCardComponent implements OnInit {
  @Input() media: PluginCardMedia;

  constructor() {}

  ngOnInit() {}
}
