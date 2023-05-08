import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { configData } from 'src/environments/configData';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { isValidMailFormat, showNotification } from 'src/consts/utils';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { CommonService } from 'src/app/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { RoleModel } from '../user.model';

export interface DialogData {
  termsList: Array<any>;
  invoiceStatus: Array<any>;
}

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent {
  userInfo: UntypedFormGroup;
  roleLists: Array<RoleModel> = [];
  statusList: Array<any> = configData.INVOICES_STATUS;
  emailsList: string[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public uiSpinner: UiSpinnerService, public dialogRef: MatDialogRef<UserReportComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public UserReporService: UserService, private fb: UntypedFormBuilder,
  ) {
    console.log("data", data);

    // Set the defaults
    /* this.action = 'insert';
    if (this.action === 'edit') {
      this.dialogTitle =
        data.advanceTable.fName + ' ' + data.advanceTable.lName;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = 'New Record';
      const blankObject = {} as AdvanceTable;
      this.advanceTable = new AdvanceTable(blankObject);
    } */
    // this.roleLists = userData.roleList;

    this.userInfo = this.fb.group({
      All_Roles: [true],
      role_ids: [this.roleLists.map((el) => el._id)],
      All_Status: [true],
      status_ids: [this.statusList.map((el) => el.key)],
    });

  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    that.userInfo.get("role_ids")?.valueChanges.subscribe(function (params: any) {
      if (params.length == that.roleLists.length) {
        that.userInfo.get("All_Roles")?.setValue(true);
      } else {
        that.userInfo.get("All_Roles")?.setValue(false);
      }
    });
    that.userInfo.get("status_ids")?.valueChanges.subscribe(function (params: any) {
      if (params.length == that.statusList.length) {
        that.userInfo.get("All_Status")?.setValue(true);
      } else {
        that.userInfo.get("All_Status")?.setValue(false);
      }
    });
  }

  onChangeValueAll_Role(params: any) {
    if (params.checked) {
      this.userInfo.get("role_ids")?.setValue(this.roleLists.map((el) => el._id));
    } else {
      this.userInfo.get("role_ids")?.setValue([]);
    }
  }

  onChangeValueAll_UserStatus(params: any) {
    if (params.checked) {
      this.userInfo.get("status_ids")?.setValue(this.statusList.map((el) => el.key));
    } else {
      this.userInfo.get("status_ids")?.setValue([]);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEmail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      const validEmail = isValidMailFormat(value);
      if (validEmail) {
        this.emailsList.push(value);
        // Clear the input value
        event.chipInput!.clear();
      } else {
        // here error for valid email
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeEmail(fruit: string): void {
    const index = this.emailsList.indexOf(fruit);

    if (index >= 0) {
      this.emailsList.splice(index, 1);
    }
  }

  async sendReport(): Promise<void> {
    if (this.emailsList.length != 0) {
      this.uiSpinner.spin$.next(true);
      const requestObject = this.userInfo.value;
      requestObject.email_list = this.emailsList;
      this.UserReporService.sendUserReport(requestObject);
      setTimeout(() => {
        this.uiSpinner.spin$.next(false);
        this.dialogRef.close();
        showNotification(this.snackBar, 'Vendor report is sent to your email.', 'success');
      }, 1000);
    } else {
      showNotification(this.snackBar, 'Please enter email.', 'error');
    }
  }

  addInternalEmail(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // Add email
    if (value) {
      const validEmail = isValidMailFormat(value);
      if (validEmail) {
        this.emailsList.push(value);
        // Clear the input value
        event.chipInput!.clear();
      } else {
        // here error for valid email
      }
    }
  }

  internalEmailremove(email: string): void {
    //----
    // let user_data = JSON.parse(localStorage.getItem(localstorageconstants.USERDATA));
    //----
    const index = this.emailsList.indexOf(email);
    if (index >= 0) {
      this.emailsList.splice(index, 1);
      //----
      // if (email == user_data.UserData.useremail) {
      //   this.is_oneOnly = true;
      // }
      //----
    }
  }

}
