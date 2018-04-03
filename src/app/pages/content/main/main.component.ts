import {Component} from '@angular/core';
import {Media} from '../../../widgets/media-card/media-card.media';
import {Router} from '@angular/router';
import {ContentService} from '../../../service/content/content.service';
import {AfterViewInit} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  medias: Media[] = [];
  content = `
    <article>
      <h1>Awesome Document</h1>
      <div>
        <p>bla bla bla</p>
         <mat-icon class="mat-24">thumb_up</mat-icon>
        <button mat-button>
            aaaaa
        </button>
      </div>
    </article>
    `;

  constructor(private contentService: ContentService, private router: Router) {
    contentService.getInfoList(0, 20).subscribe(infoList => {
      for (const info of infoList) {
        const media: Media = {
          title: info.title,
          content: info.content,
          coverUrl: info.coverList != null && info.coverList.length !== 0
            ? info.coverList [0] : 'assets/images/unsplash/' + Math.ceil(Math.random() * 1000 % 22) + '.jpg',
          favorites: info.favorites,
          watchCount: info.watchCount,
          isFavorite: info.isFavorite,
          onClickFavorite: (isFavorite) => {
            contentService.favoriteInfo(info.id, !isFavorite).subscribe();
          },
          onClickWatch: () => {
            this.goToWatchPage(info.id);
          },
        };
        this.medias.push(media);
      }
    });
  }

  ngAfterViewInit() {
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
