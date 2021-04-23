import { AfterViewInit, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { IDialogData, ReprotDialogResult } from "./dialog-data";
import { GeneralInfoFormGroup } from "./general-info.component";

@Component({
  templateUrl: './dialog.html'
})
export class ReportDialogComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.generalInfoForm = new GeneralInfoFormGroup();
  }
  ngAfterViewInit(): void {
    this.stepper.selectionChange.subscribe(it => {
      if (it.selectedIndex === 2) {
        setTimeout(() => this.inProgress = false, 2000);
      }
    });
  }

  ngOnInit(): void {
  }

  @ViewChild(MatStepper) stepper: MatStepper = null!;

  public result = new ReprotDialogResult();
  public generalInfoForm: GeneralInfoFormGroup;
  public inProgress: boolean = true;
}
