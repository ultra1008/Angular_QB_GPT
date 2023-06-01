import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { ReportService } from '../report.service';
import { httproutes, httpversion } from 'src/consts/httproutes';
import { HttpCall } from 'src/app/services/httpcall.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Report } from '../reports-table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { WEB_ROUTES } from 'src/consts/routes';
import { Vendor } from 'src/app/vendors/vendor.model';
import { configData } from 'src/environments/configData';
import { TableElement } from 'src/app/shared/TableElement';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports-listing',
  templateUrl: './reports-listing.component.html',
  styleUrls: ['./reports-listing.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ReportsListingComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = ['invoice_date', 'due_date', 'vendor', 'invoice_number', 'total_amount', 'sub_total', 'approver', 'status', 'actions'];
  reportService?: ReportService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Report>(true, []);
  id?: number;
  isDelete = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  reportType = '';
  ids: Array<string> = [];

  constructor (public ReportServices: ReportService, public httpCall: HttpCall, public uiSpinner: UiSpinnerService,
    public route: ActivatedRoute, private router: Router, public translate: TranslateService,) {
    super();
    route.queryParams.subscribe(queryParams => {
      this.reportType = queryParams['report_type'];
      if (queryParams['vendor_ids']) {
        this.ids = queryParams['vendor_ids'];
      } else if (queryParams['assign_to_ids']) {
        this.ids = queryParams['assign_to_ids'];
      } else if (queryParams['class_name_ids']) {
        this.ids = queryParams['class_name_ids'];
      } else if (queryParams['job_client_name_ids']) {
        this.ids = queryParams['job_client_name_ids'];
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  getVendorNameTooltip(row: any) {
    return row.vendor_data.vendor_name;
  }
  getApproverTooltip(row: any) {
    return row.approver;
  }

  editInvoice(row: Report) {
    this.router.navigate([WEB_ROUTES.INVOICE_DETAILS], { queryParams: { _id: row._id } });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.reportService = new ReportService(this.httpCall);
    this.dataSource = new ExampleDataSource(
      this.reportService,
      this.paginator,
      this.sort,
      this.reportType,
      this.ids,
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
    setTimeout(() => {
      this.router.navigate([WEB_ROUTES.VIEW_REPORT]).then();
    }, 1000);
  }

  onContextMenu(event: MouseEvent, item: Report) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'Invoice Date': formatDate(new Date(Number(x.invoice_date_epoch.toString()) * 1000), 'MM/dd/yyyy', 'en'),
        'Due Date': formatDate(new Date(Number(x.due_date_epoch.toString()) * 1000), 'MM/dd/yyyy', 'en'),
        'Vendor': x.vendor_data.vendor_name,
        'Invoice Number': x.invoice_no,
        'Total Amount': x.invoice_total_amount,
        'Sub Total': x.sub_total,
        'Approver': x.assign_to_data?.userfullname,
        'Status': x.status,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  back() {
    this.router.navigate([WEB_ROUTES.SIDEMENU_REPORTS]).then();
  }
}

export class ExampleDataSource extends DataSource<Report> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Report[] = [];
  renderedData: Report[] = [];
  constructor (public exampleDatabase: ReportService, public paginator: MatPaginator, public _sort: MatSort,
    public reportType: string, public ids: Array<string>,) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Report[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.reportDataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    console.log("this.reportType ", this.reportType);
    console.log("this.ids ", this.ids);
    let requestObject;
    if (this.reportType == configData.REPORT_TYPE.reportVendor) {
      requestObject = { vendor_ids: this.ids };
    } else if (this.reportType == configData.REPORT_TYPE.openApprover) {
      requestObject = { assign_to_ids: this.ids };
    } else if (this.reportType == configData.REPORT_TYPE.openClass) {
      requestObject = { class_name_ids: this.ids };
    } else if (this.reportType == configData.REPORT_TYPE.openClientJob) {
      requestObject = { job_client_name_ids: this.ids };
    } else if (this.reportType == configData.REPORT_TYPE.openVendor) {
      requestObject = { open_invoice: true, vendor_ids: this.ids };
    }

    this.exampleDatabase.getInvoiceReportTable(requestObject);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.reportData
          .slice()
          .filter((invoice: Report) => {
            const searchStr = (
              invoice.invoice_date_epoch +
              invoice.due_date_epoch +
              invoice.vendor_data.vendor_name +
              invoice.invoice_no +
              invoice.invoice_total_amount +
              invoice.sub_total +
              invoice.assign_to_data?.userfullname +
              invoice.status
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
  sortData(data: Report[]): Report[] {
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
        case 'invoice_date_epoch':
          [propertyA, propertyB] = [a.invoice_date_epoch, b.invoice_date_epoch];
          break;
        case 'due_date_epoch':
          [propertyA, propertyB] = [a.due_date_epoch, b.due_date_epoch];
          break;
        /*  case 'vendor_data':
           [propertyA, propertyB] = [a.vendor_data, b.vendor_data];
           break; */
        case 'invoice_no':
          [propertyA, propertyB] = [a.invoice_no, b.invoice_no];
          break;
        case 'invoice_total_amount':
          [propertyA, propertyB] = [a.invoice_total_amount, b.invoice_total_amount];
          break;
        case 'sub_total':
          [propertyA, propertyB] = [a.sub_total, b.sub_total];
          break;
        /* case 'approver':
          [propertyA, propertyB] = [a.approver, b.approver];
          break; */
        case 'status':
          [propertyA, propertyB] = [a.status, b.status];
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