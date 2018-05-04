import {AfterViewInit, Component, EventEmitter, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {merge} from 'rxjs/observable/merge';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {switchMap} from 'rxjs/operators/switchMap';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {Router} from '@angular/router';
import {PluginService} from '../../../service/plugin/plugin.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpEventType} from '@angular/common/http';
import {PluginCardMedia} from '../../../widgets/plugin-card/plugin-card.media';
import {APP_CONFIG, IAppConfig} from '../../../app.config.interface';

@Component({
  selector: 'app-install-plugin-dialog',
  templateUrl: 'plugin-install.dialog.html',
  styleUrls: ['plugin-install.dialog.scss'],
})
export class PluginInstallDialogComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<PluginInstallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pluginService: PluginService,
    private _formBuilder: FormBuilder) {
  }

  formGroup: FormGroup;
  fileUploadSub: any;
  uploadProgress = 0;
  uploadComplete = false;
  uploadingProgressing = false;
  uploadFile: File;

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      file: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.fileUploadSub) {
      this.fileUploadSub.unsubscribe();
    }
  }

  handleProgress(event) {
    if (event.type === HttpEventType.DownloadProgress) {
      this.uploadingProgressing = true;
      this.uploadProgress = Math.round(100 * event.loaded / event.total);
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploadingProgressing = true;
      this.uploadProgress = Math.round(100 * event.loaded / event.total);
    }

    if (event.type === HttpEventType.Response) {
      console.log(event.body);
      this.uploadComplete = true;
    }
  }

  handleSubmit(event, ngForm) {
    console.dir(this.formGroup);
    event.preventDefault();
    if (ngForm.submitted) {
      this.fileUploadSub = this.pluginService.installPlugin(this.uploadFile, 'none').subscribe(
        this.handleProgress,
        error => {
          console.log('Server error' + error);
        });

      ngForm.resetForm({});
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  fileSelected(event): void {
    const files = event.target.files;
    if (files && files.length) {
      this.uploadFile = files[0];
    }
  }
}

class Item {
  type: string;
  value: any;
}


@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit, AfterViewInit {
  refresh: EventEmitter<any> = new EventEmitter();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  items: Item[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public dialog: MatDialog,
              private pluginService: PluginService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.pluginService.getPluginList(this.paginator.pageIndex, this.paginator.pageSize)
            .pipe(
              map(data => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.total_count;

                return data.items;
              }),
              catchError(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                return of([]);
              })
            );
        }),
      )
      .map(data => {
        const pcm = [];
        pcm.push(<Item>{
          type: 'add',
        });
        for (const v of data) {
          pcm.push({
            type: 'plugin',
            value: <PluginCardMedia>{
              title: v.name,
              version: v.version,
              content: v.desc,
              coverUrl: this.config.websEndpoint + '/' + v.name + '/' + v.cover,
              onClickDelete: () => {
                console.log(v.name);
              },
              onClick: () => {
                this.goToPluginPage(v.name);
              }
            }
          });
        }
        return pcm;
      })
      .subscribe(data => {
        this.items = data;
      });
  }

  goToPluginPage(pluginName: string): void {
    this.router.navigate(['/plugins', pluginName]);
  }

  openPluginInstallDialog(): void {
    const dialogRef = this.dialog.open(PluginInstallDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  installPlugin(): void {
    this.openPluginInstallDialog();
  }
}
