import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../user.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MMDDYYYY, showNotification, swalWithBootstrapTwoButtons } from 'src/consts/utils';
import { httproutes, httpversion } from 'src/consts/httproutes';
import { WEB_ROUTES } from 'src/consts/routes';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpCall } from 'src/app/services/httpcall.service';
import { CommonService } from 'src/app/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserDocument } from '../../user.model';

@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss']
})
export class UserDocumentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'document_name',
    'userdocument_expire_date',
    'actions',
  ];
  userService?: UserService;
  dataSource!: UserDocumentDataSource;
  selection = new SelectionModel<UserDocument>(true, []);
  advanceTable?: UserDocument;
  id: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor (
    public httpClient: HttpClient, private httpCall: HttpCall, public dialog: MatDialog, private snackBar: MatSnackBar,
    private router: Router, public userTableService: UserService, public translate: TranslateService,
    private fb: UntypedFormBuilder, public route: ActivatedRoute, private commonService: CommonService,) {
    super();
    this.id = this.route.snapshot.queryParamMap.get("_id");
  }

  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.userService = new UserService(this.httpCall);
    this.dataSource = new UserDocumentDataSource(
      this.userService,
      this.paginator,
      this.sort,
      this.id
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

  // context menu
  onContextMenu(event: MouseEvent, item: UserDocument) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

  addNewEmergencyContact() {
    this.router.navigate([WEB_ROUTES.USER_DOCUMENT_FORM], { queryParams: { user_id: this.id } });
  }

  editEmergencyContact(document: UserDocument) {
    this.router.navigate([WEB_ROUTES.USER_DOCUMENT_FORM], { queryParams: { _id: document._id, user_id: this.id } });
  }

  deleteEmergencyContact(document: UserDocument) {
    swalWithBootstrapTwoButtons
      .fire({
        title: this.translate.instant('DOCUMENT.CONFIRMATION_DIALOG.DELETE'),
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        allowOutsideClick: false,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          const data = await this.commonService.postRequestAPI(httpversion.PORTAL_V1 + httproutes.DELETE_USER_DOCUMENT, { _id: document._id, userdocument_url: document.userdocument_url });
          if (data.status) {
            showNotification(this.snackBar, data.message, 'success');
            const foundIndex = this.userService?.documentDataChange.value.findIndex(
              (x) => x._id === document._id
            );
            // for delete we use splice in order to remove single object from DataService
            if (foundIndex != null && this.userService) {
              this.userService.documentDataChange.value.splice(foundIndex, 1);
              this.refreshTable();
            }
          } else {
            showNotification(this.snackBar, data.message, 'error');
          }
        }
      });
  }

  temp_MMDDYYYY(epoch: number) {
    return MMDDYYYY(epoch);
  }
}

// This class is used for datatable sorting and searching
export class UserDocumentDataSource extends DataSource<UserDocument> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserDocument[] = [];
  renderedData: UserDocument[] = [];
  constructor (
    public userService: UserService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public id: string,
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserDocument[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.userService.documentDataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.userService.getUserDocumentForTable(this.id);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.userService.documentData
          .slice()
          .filter((advanceTable: UserDocument) => {
            const searchStr = (
              advanceTable.document_name
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
  sortData(data: UserDocument[]): UserDocument[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case '_id':
          [propertyA, propertyB] = [a._id, b._id];
          break;
        case 'document_name':
          [propertyA, propertyB] = [a.document_name, b.document_name];
          break;
        case 'userdocument_expire_date':
          [propertyA, propertyB] = [a.userdocument_expire_date, b.userdocument_expire_date];
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
