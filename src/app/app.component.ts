import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from './report-problem/dialog';
import { IDialogData } from './report-problem/dialog-data';
import { IObjectURL, VideoRecorder } from './report-problem/video-recorder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private dialog: MatDialog
  ) {
  }

  public async takeScreenshot() {
    await this.openDialog();
  }

  public async recordVideo() {
    const videRecorder = new VideoRecorder();
    const recordedVideoUrl = await videRecorder.record();
    await this.openDialog(recordedVideoUrl);
  }

  public async openDialog(recordedVideoUrl: IObjectURL | null = null) {
    const dialogData: IDialogData = {
      videoUrl: recordedVideoUrl
    };
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: dialogData,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: "700px",
      height: "520px",
    });
    const dialogResult = await dialogRef.afterClosed().toPromise();
  }


}
