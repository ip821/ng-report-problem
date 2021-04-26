import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { Subscription } from "rxjs";
import { IDialogData } from "./dialog-data";
import { GeneralInfoFormGroup } from "./general-info.component";

@Component({
  templateUrl: './dialog.html'
})
export class ReportDialogComponent implements AfterViewInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.generalInfoForm = new GeneralInfoFormGroup();
  }

  @ViewChild(MatStepper) stepper: MatStepper = null!;

  public generalInfoForm: GeneralInfoFormGroup;
  public inProgress: boolean = true;
  private subscription: Subscription | null = null;

  ngAfterViewInit(): void {
    this.subscription = this.stepper.selectionChange.subscribe(it => {
      if (it.selectedIndex === 2) {
        setTimeout(() => this.inProgress = false, 2000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
