import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { TermModel } from 'src/app/vendors/vendor.model';
import { httproutes, httpversion } from 'src/consts/httproutes';
import { configData } from 'src/environments/configData';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent {
  poForm: UntypedFormGroup;
  quoteForm: UntypedFormGroup;
  packingSlipForm: UntypedFormGroup;
  receivingSlipForm: UntypedFormGroup;

  pdf_url = 'https://s3.wasabisys.com/r-988514/dailyreport/60c31f3dc5ba8494a2b1070f/60c31f3dc5ba8494a2b1070fdailyreport1630757615234.pdf';

  variablestermList: any = [];
  termsList: Array<TermModel> = this.variablestermList.slice();
  documentTypesList: any = configData.DOCUMENT_TYPE_LIST;

  document: any;
  documentTypes = configData.DOCUMENT_TYPES;

  constructor(private fb: UntypedFormBuilder, public commonService: CommonService, public route: ActivatedRoute) {
    this.document = this.route.snapshot.queryParamMap.get('document') ?? '';

    this.poForm = this.fb.group({
      document_type: ['', [Validators.required]],
      vendor_name: [''],
      quote_number: ['',],
      date: [''],
      shipping_method: [''],
      sub_total: [''],
      tax: [''],
      quote_total: [''],
      receiver_phone: [''],
      terms: [''],
      address: [''],
    });

    this.quoteForm = this.fb.group({
      document_type: ['', [Validators.required]],
      vendor_name: [''],
      quote_number: ['',],
      date: [''],
      shipping_method: [''],
      sub_total: [''],
      tax: [''],
      quote_total: [''],
      receiver_phone: [''],
      terms: [''],
      address: [''],
    });

    this.packingSlipForm = this.fb.group({
      document_type: ['', [Validators.required]],
      vendor_name: [''],
      invoice: ['',],
      date: [''],
      po: [''],
      address: [''],
      received_by: [''],
    });

    this.receivingSlipForm = this.fb.group({
      document_type: ['', [Validators.required]],
      vendor_name: [''],
      invoice: ['',],
      date: [''],
      po: [''],
      address: [''],
      received_by: [''],
    });

    this.getTerms();
  }

  async getTerms() {
    const data = await this.commonService.getRequestAPI(httpversion.PORTAL_V1 + httproutes.PORTAL_TERM_GET);
    if (data.status) {
      this.variablestermList = data.data;
      this.termsList = this.variablestermList.slice();
    }
  }
  print() {
    fetch(this.pdf_url).then(resp => resp.arrayBuffer()).then(resp => {
      /*--- set the blog type to final pdf ---*/
      const file = new Blob([resp], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(file);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      //iframe.contentWindow.print();
      iframe.onload = () => {
        setTimeout(() => {
          iframe.focus();
          iframe.contentWindow!.print();
        });
      };
    });
  }

  download() {
    let a = document.createElement('a');
    /*--- Firefox requires the link to be in the body --*/
    document.body.appendChild(a);
    a.style.display = 'none';
    a.target = "_blank";
    a.href = this.pdf_url;
    a.click();
    /*--- Remove the link when done ---*/
    document.body.removeChild(a);
  }
  onKey(event: any) {

    if (event.target.value.length == 0) {

      // this.dashboardHistory = [];
      // this.start = 0;
      // this.getTodaysActivity();
    }
  }
}
