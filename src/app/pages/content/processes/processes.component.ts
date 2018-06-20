import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {APP_ANIMATIONS} from '../../../animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {from, of} from 'rxjs';
import {catchError, startWith, switchMap, tap} from 'rxjs/operators';
import {ProcessesService} from '../../../service/processes/processes.service';
import {Process} from '../../../service/domain/process';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss'],
  animations: APP_ANIMATIONS
})
export class ProcessesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'pid', 'name', 'cmd', 'args', 'status', 'restart_count', 'startup_time'];
  dataSource = new MatTableDataSource<Process>();
  selection = new SelectionModel<Process>(true, []);

  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private processesService: ProcessesService, private router: Router) {
    this.dataSource.filterPredicate = (data, filter) => {
      return data.message.indexOf(filter) !== -1 || data.name.indexOf(filter) !== -1;
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    from(this.sort.sortChange)
      .pipe(
        startWith([]),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.processesService.getAll()
            .pipe(
              tap(data => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
              }),
              catchError(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                return of([]);
              })
            );
        }),
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
