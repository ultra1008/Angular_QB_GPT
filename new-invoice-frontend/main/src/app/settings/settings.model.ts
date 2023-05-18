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
export class CostCodeTable {
  _id: string;
  description: string;
  value: string;
  division: string;

  constructor(costcodeTable: CostCodeTable) {
    {
      this._id = costcodeTable._id;
      this.description = costcodeTable.description;
      this.value = costcodeTable.value;
      this.division = costcodeTable.division;
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

export class UsageTable {
  _id: string;
  year!: number;
  month!: number;
  month_name!: string;
  po_expense!: number;
  po_forms!: number;
  packing_slip_expense!: number;
  packing_slip_forms!: number;
  receiving_slip_expense!: number;
  receiving_slip_forms!: number;
  quote_expense!: number;
  quote_forms!: number;
  invoice_expense!: number;
  invoice_forms!: number;
  unknown_expense!: number;
  unknown_forms!: number;

  constructor(usageTable: UsageTable) {
    {
      this._id = usageTable._id;
      this.year = usageTable.year;
      this.month = usageTable.month;
      this.month_name = usageTable.month_name;
      this.po_expense = usageTable.po_expense;
      this.po_forms = usageTable.po_forms;
      this.packing_slip_expense = usageTable.packing_slip_expense;
      this.packing_slip_forms = usageTable.packing_slip_forms;
      this.receiving_slip_expense = usageTable.receiving_slip_expense;
      this.receiving_slip_forms = usageTable.receiving_slip_forms;
      this.quote_expense = usageTable.quote_expense;
      this.quote_forms = usageTable.quote_forms;
      this.invoice_expense = usageTable.invoice_expense;
      this.invoice_forms = usageTable.invoice_forms;
      this.unknown_expense = usageTable.unknown_expense;
      this.unknown_forms = usageTable.unknown_forms;
    }
  }
}

export class Element {
  name!: string;
  position!: number;
  weight!: number;
  symbol!: string;
  constructor(Element: Element) {
    {
      this.name = Element.name;
      this.position = Element.position;
      this.weight = Element.weight;
      this.symbol = Element.symbol;
    }
  }
}

export class DocumentTable {
  _id: string;
  is_expiration!: boolean;
  document_type_name!: string;

  constructor(DocumentTable: DocumentTable) {
    {
      this._id = DocumentTable._id;
      this.is_expiration = DocumentTable.is_expiration;
      this.document_type_name = DocumentTable.document_type_name;
    }
  }
}

export class DepartmentTable {
  _id: string;
  department_name!: string;

  constructor(DepartmentTable: DepartmentTable) {
    {
      this._id = DepartmentTable._id;
      this.department_name = DepartmentTable.department_name;
    }
  }
}

export class JobTitleTable {
  _id: string;
  job_title_name!: string;

  constructor(JobTitleTable: JobTitleTable) {
    {
      this._id = JobTitleTable._id;
      this.job_title_name = JobTitleTable.job_title_name;
    }
  }
}

export class JobTypeTable {
  _id: string;
  job_type_name!: string;

  constructor(JobTypeTable: JobTypeTable) {
    {
      this._id = JobTypeTable._id;
      this.job_type_name = JobTypeTable.job_type_name;
    }
  }
}

export class RelationshipTable {
  _id: string;
  relationship_name!: string;

  constructor(RelationshipTable: RelationshipTable) {
    {
      this._id = RelationshipTable._id;
      this.relationship_name = RelationshipTable.relationship_name;
    }
  }
}

export class LanguageTable {
  _id: string;
  name!: string;

  constructor(LanguageTable: LanguageTable) {
    {
      this._id = LanguageTable._id;
      this.name = LanguageTable.name;
    }
  }
}
