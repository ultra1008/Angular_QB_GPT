import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { HttpCall } from 'src/app/services/httpcall.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { swalWithBootstrapButtons, showNotification } from 'src/consts/utils';
import { DocumentTypeFormComponent } from '../../employeesettings/document-type-form/document-type-form.component';
import { TermsTable } from '../../settings.model';
import { SettingsService } from '../../settings.service';
import { TermsFormComponent } from '../terms-form/terms-form.component';
import { CommonService } from 'src/app/services/common.service';
import { httproutes, httpversion } from 'src/consts/httproutes';
import { icon } from 'src/consts/icon';

@Component({
  selector: 'app-terms-listing',
  templateUrl: './terms-listing.component.html',
  styleUrls: ['./terms-listing.component.scss'],
})
export class TermsListingComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = ['name', 'due_days', 'discount', 'actions'];
  termsService?: SettingsService;
  dataSource!: TermsDataSource;
  selection = new SelectionModel<TermsTable>(true, []);
  id?: number;
  // advanceTable?: TermsTable;
  isDelete = 0;
  titleMessage = '';

  quickbooksGreyIcon = icon.QUICKBOOKS_GREY;
  quickbooksGreenIcon = icon.QUICKBOOKS_GREEN;

  constructor (
    public dialog: MatDialog,
    public SettingsService: SettingsService,
    private snackBar: MatSnackBar,
    public router: Router,
    private httpCall: HttpCall,
    public translate: TranslateService,
    public commonService: CommonService,
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.loadData();
    this.getCompanyTenants();
  }
  async getCompanyTenants() {
    const data = await this.commonService.getRequestAPI(httpversion.PORTAL_V1 + httproutes.GET_COMPNAY_SMTP);
    if (data.status) {
      if (data.data.is_quickbooks_online || data.data.is_quickbooks_desktop) {
        this.displayedColumns = ['name', 'due_days', 'discount', 'is_quickbooks', 'actions'];
      } else {
        this.displayedColumns = ['name', 'due_days', 'discount', 'actions'];
      }
    }
    // this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    this.router.navigate(['/settings/mailbox-form']);
  }

  edit(Terms: any) {
    let that = this;
    console.log('document');
    const dialogRef = this.dialog.open(TermsFormComponent, {
      width: '350px',
      data: Terms,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      that.refreshTable();
    });
  }

  async deleteDocumentType(Document: any) {
    let that = this;
    swalWithBootstrapButtons
      .fire({
        title: this.translate.instant(
          'SETTINGS.SETTINGS_OTHER_OPTION.OTHER_SETTINGS_MODULE.CONFIRMATION_DIALOG.TERMS'
        ),
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: this.translate.instant('COMMON.ACTIONS.YES'),
        denyButtonText: this.translate.instant('COMMON.ACTIONS.NO'),
        allowOutsideClick: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const data = await that.SettingsService.DeleteTerms(Document._id);
          if (data.status) {
            showNotification(that.snackBar, data.message, 'success');
            that.refreshTable();
            location.reload();
          } else {
            showNotification(that.snackBar, data.message, 'error');
          }
        }
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  public loadData() {
    this.termsService = new SettingsService(this.httpCall);
    this.dataSource = new TermsDataSource(
      this.termsService,
      this.paginator,
      this.sort,
      this.isDelete
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  back() {
    this.router.navigate(['/settings']);
  }

  // context menu
  onContextMenu(event: MouseEvent, item: TermsTable) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class TermsDataSource extends DataSource<TermsTable> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TermsTable[] = [];
  renderedData: TermsTable[] = [];
  constructor (
    public termsService: SettingsService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public isDelete: number
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TermsTable[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.termsService.dataTermsChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.termsService.getAllTermsTable(this.isDelete);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.termsService.dataTerms
          .slice()
          .filter((TermsTable: TermsTable) => {
            const searchStr = (
              TermsTable.name +
              TermsTable.due_days +
              TermsTable.discount
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: TermsTable[]): TermsTable[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a._id, b._id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;

        case 'due_days':
          [propertyA, propertyB] = [a.due_days, b.due_days];
          break;
        case 'discount':
          [propertyA, propertyB] = [a.discount, b.discount];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
