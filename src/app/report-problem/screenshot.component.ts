import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialogContainer } from "@angular/material/dialog";
import { IObjectURL } from "./video-recorder";

@Component({
  selector: 'cr-screenshot',
  templateUrl: './screenshot.component.html'
})
export class ScreenshotComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogContainer: MatDialogContainer,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  @ViewChild("video")
  public video: ElementRef | null = null;

  @ViewChild("canvas")
  public canvas: ElementRef | null = null;

  @ViewChild("img")
  public img: ElementRef | null = null;

  @ViewChild('recordedVideo')
  public recordedVideo: ElementRef | null = null;

  @Input() public videoUrl: IObjectURL | null = null;

  async ngOnInit() {
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.recordedVideo && this.videoUrl) {
      this.recordedVideo.nativeElement.src = this.videoUrl.url;
    }
    else {
      await this.makeScreenshot();
    }
  }

  public async makeScreenshot() {

    Array.from(document.querySelectorAll('mat-dialog-container'))
      .forEach(node => (<HTMLElement>node).style.display = 'none');

    this.changeDetector.detectChanges();

    try {
      if (
        this.video
        &&
        this.canvas
        &&
        this.img
      ) {
        const mediaDevices: any = window.navigator.mediaDevices;
        const constraints: any = {
          video: true,
          audio: false
        };
        const mediaStream: MediaStream = await mediaDevices.getDisplayMedia(constraints);
        this.video.nativeElement.srcObject = mediaStream;
        await this.video.nativeElement.play();

        const trackSettings = mediaStream.getVideoTracks()[0].getSettings();
        const height = trackSettings.height;
        const width = trackSettings.width;

        this.canvas.nativeElement.height = height;
        this.canvas.nativeElement.width = width;
        await this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, width, height);
        this.img.nativeElement.src = this.canvas.nativeElement.toDataURL();
        mediaStream.getTracks().forEach(it => it.stop());
      }
    }
    finally {
      Array.from(document.querySelectorAll('mat-dialog-container'))
        .forEach(node => (<HTMLElement>node).style.display = '');
      this.changeDetector.detectChanges();
    }
  }

}
