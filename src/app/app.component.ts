import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from './report-problem/dialog';
import { ReportDialogData } from './report-problem/dialog-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public async reportProblemClicked() {
    const dialogData = new ReportDialogData();
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: dialogData,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: "700px",
      height: "520px",
    });
    const dialogResult = await dialogRef.afterClosed().toPromise();
  }


}
