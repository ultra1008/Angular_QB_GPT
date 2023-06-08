import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { httproutes, httpversion } from 'src/consts/httproutes';
import { localstorageconstants } from 'src/consts/localstorageconstants';
import { WEB_ROUTES } from 'src/consts/routes';
import { showNotification } from 'src/consts/utils';
import * as  moment from "moment";
import { UserModel } from 'src/app/users/user.model';

@Component({
  selector: 'app-invoice-message-view',
  templateUrl: './invoice-message-view.component.html',
  styleUrls: ['./invoice-message-view.component.scss']
})
export class InvoiceMessageViewComponent {
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef | any;

  pdf_url = '';
  myId = '';
  id: any;
  invoiceId: any;
  messageData: any;
  messageList: any = [];
  isLoading = true;

  form!: UntypedFormGroup;
  endScroll = 0;
  showPDF = true;
  toggled = false;
  emojiPickerDirection = "'top'";

  userList: Array<UserModel> = [];
  mentionId = '';
  mentionUserName = '';

  constructor (public commonService: CommonService, public route: ActivatedRoute, private formBuilder: FormBuilder,
    public uiSpinner: UiSpinnerService, private snackBar: MatSnackBar, private router: Router,
    /* public headerComponent: HeaderComponent, */) {
    const userData = JSON.parse(localStorage.getItem(localstorageconstants.USERDATA) ?? '{}');
    this.myId = userData.UserData._id;
    this.invoiceId = this.route.snapshot.queryParamMap.get('invoice_id') ?? '';

    this.getOneInvoiceMessage();
    this.getUser();
    this.form = this.formBuilder.group({
      message: ["", Validators.required],
    });
  }

  async getUser() {
    const data = await this.commonService.getRequestAPI(httpversion.PORTAL_V1 + httproutes.GET_ALL_USER);
    this.isLoading = false;
    if (data.status) {
      this.userList = data.data;
    }
  }

  async getOneInvoiceMessage() {
    const data = await this.commonService.postRequestAPI(httpversion.PORTAL_V1 + httproutes.GET_ONE_INVOICE_MESSAGE, { invoice_id: this.invoiceId });
    if (data.status) {
      this.messageData = data.data;
      console.log(this.messageData);
      this.messageList = data.messages;
      this.pdf_url = this.messageData.invoice.pdf_url;
      this.isLoading = false;
      this.updateSeenFlag();
    }
    setTimeout(() => {
      /*  const myElement = document.getElementById("myPageId");
       myElement.scrollTop = document.getElementById('messageListDiv')?.scrollHeight; */
      // this.endScroll = document.getElementById('messageListDiv')?.scrollHeight;
    }, 100);
  }

  async updateSeenFlag() {
    await this.commonService.getRequestAPI(httpversion.PORTAL_V1 + httproutes.UPDATE_INVOICE_MESSAGE_SEEN_FLAG);
    // this.headerComponent.getInvoiceMessageCount();
  }

  async sendMessage() {
    if (this.form.valid) {
      this.uiSpinner.spin$.next(true);
      const formValues = this.form.value;
      formValues.invoice_id = this.invoiceId;
      formValues.is_first = false;
      formValues.invoice_message_id = this.messageData._id;
      formValues.mention_user = this.mentionId;
      if (formValues.message[0] == '@') {
        const index = formValues.message.indexOf(this.mentionUserName);
        if (index !== -1) {
          const endIndex = index + this.mentionUserName.length;
          formValues.message = `@${this.mentionId}${formValues.message.substring(endIndex)}`;
        }
      }
      if (this.myId === this.messageData.sender_id) {
        formValues.users = [this.messageData.receiver_id];
      } else {
        formValues.users = [this.messageData.sender_id];
      }
      const data = await this.commonService.postRequestAPI(httpversion.PORTAL_V1 + httproutes.SEND_INVOICE_MESSAGE, formValues);
      this.uiSpinner.spin$.next(false);
      if (data.status) {
        showNotification(this.snackBar, data.message, 'success');
        this.form.reset();
        this.messageList.push(data.data);
      } else {
        showNotification(this.snackBar, data.message, 'error');
      }
    }
  }

  viewInvoice() {
    this.router.navigate([WEB_ROUTES.INVOICE_DETAILS], { queryParams: { _id: this.messageData.invoice_id } });
  }

  back() {
    const from = this.route.snapshot.queryParamMap.get('from') ?? '';
    if (from) {
      this.router.navigate([WEB_ROUTES.INVOICE_MESSAGES]);
    } else {
      this.viewInvoice();
    }
  }

  download() {
    //
  }

  print() {
    //
  }

  handleAttachment() {
    // const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    // e.click();
    document.getElementById('upload-file')?.click();
  }

  async addAttachment(fileInput: any) {
    const fileReaded = fileInput.target.files[0];
    if (fileReaded) {
      this.uiSpinner.spin$.next(true);
      const formData = new FormData();
      formData.append("file[]", fileReaded);
      formData.append("dir_name", 'invoice_message');
      formData.append("local_date", moment().format("DD/MM/YYYY hh:mmA"));

      const attachmentData = await this.commonService.postRequestAPI(httpversion.PORTAL_V1 + httproutes.PORTAL_SAVE_ATTACHMENT, formData);

      const requestObject = {
        message: attachmentData.data[0],
        invoice_id: this.invoiceId,
        is_first: false,
        invoice_message_id: this.messageData._id,
        users: this.myId === this.messageData.sender_id ? [this.messageData.receiver_id] : [this.messageData.sender_id],
        is_attachment: true,
      };

      const data = await this.commonService.postRequestAPI(httpversion.PORTAL_V1 + httproutes.SEND_INVOICE_MESSAGE, requestObject);
      this.uiSpinner.spin$.next(false);
      if (data.status) {
        showNotification(this.snackBar, data.message, 'success');
        this.messageList.push(data.data);
      } else {
        showNotification(this.snackBar, data.message, 'error');
      }
    }
  }

  collabPDF() {
    this.showPDF = !this.showPDF;
  }

  viewAttachment(message: any) {
    if (message.is_attachment) {
      window.location.href = message.message;
    }
  }

  handleSelection(event: any) {
    const formValues = this.form.value;
    const message = formValues.message + event.char;
    this.form.get('message')?.setValue(message);
  }

  onMentionSelected(event: any) {
    this.mentionId = event._id;
    this.mentionUserName = event.userfullname;
  }

  onMessageType(event: any) {
    if (event.target.value.length == '') {
      this.mentionId = '';
      this.mentionUserName = '';
    }
    /* if (event.target.value.length == 1 && event.target.value == '@') {
      console.log("dialog");
      event.preventDefault();
      this.menuX = event.x - 10;
      this.menuY = event.y - 10;
      this.menuTrigger.closeMenu();
      this.menuTrigger.openMenu();
    } */
  }
}