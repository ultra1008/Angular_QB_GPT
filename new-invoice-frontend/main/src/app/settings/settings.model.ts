import { formatDate } from '@angular/common';

export class Settings {
  _id: string;
  userfullname: string;
  useremail: string;
  role_name: string;
  userphone: string;
  userjob_title_name: string;
  department_name: string;
  userstatus: number;
  constructor(response: Settings) {
    {
      this._id = response._id;
      this.userfullname = response.userfullname;
      this.useremail = response.useremail;
      this.role_name = response.role_name;
      this.userphone = response.userphone;
      this.userjob_title_name = response.userjob_title_name;
      this.department_name = response.department_name;
      this.userstatus = response.userstatus;
    }
  }
}
export class settingTable {
  _id: string;
  vendor_name: string;
  vendor_id: string;
  customer_id: string;
  vendor_phone: string;
  vendor_email: string;
  vendor_address: string;
  vendor_status: number;
  vendor_attachment: Array<string>;
  isVendorfromQBO: boolean;
  constructor(response: settingTable) {
    {
      this._id = response._id;
      this.vendor_name = response.vendor_name;
      this.vendor_id = response.vendor_id;
      this.customer_id = response.customer_id;
      this.vendor_phone = response.vendor_phone;
      this.vendor_email = response.vendor_email;
      this.vendor_address = response.vendor_address;
      this.vendor_status = response.vendor_status;
      this.vendor_attachment = response.vendor_attachment;
      this.isVendorfromQBO = response.isVendorfromQBO;
    }
  }
}

export class MailboxTable {
  _id: string;
  email: string;
  imap: string;
  port: number;
  time: string;

  constructor(mailboxTable: MailboxTable) {
    {
      this._id = mailboxTable._id;
      this.email = mailboxTable.email;
      this.imap = mailboxTable.imap;
      this.port = mailboxTable.port;
      this.time = mailboxTable.time;
    }
  }
}
