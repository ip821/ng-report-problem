import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReportDialogData as ReportDialogData, ReprotDialogResult } from "./dialog-data";
import { GeneralInfoFormGroup } from "./general-info.component";

@Component({
  templateUrl: './dialog.html'
})
export class ReportDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ReportDialogData
  ) {
    this.generalInfoForm = new GeneralInfoFormGroup();
  }

  public result = new ReprotDialogResult();
  public generalInfoForm: GeneralInfoFormGroup;
}
