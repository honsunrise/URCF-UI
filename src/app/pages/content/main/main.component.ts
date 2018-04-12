import {Component, OnInit} from '@angular/core';
import {Media} from '../../../widgets/media-card/media-card.media';
import {Router} from '@angular/router';
import {PluginService} from '../../../service/plugin/plugin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  medias: Media[] = [];

  constructor(private pluginService: PluginService, private router: Router) {}

  ngOnInit(): void {
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
