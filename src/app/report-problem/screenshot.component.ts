import { Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialogContainer } from "@angular/material/dialog";

@Component({
  selector: 'cr-screenshot',
  templateUrl: './screenshot.component.html'
})
export class ScreenshotComponent {

  constructor(
    public dialogContainer: MatDialogContainer
  ) {
  }

  @ViewChild("video")
  public video: ElementRef | null = null;

  @ViewChild("canvas")
  public canvas: ElementRef | null = null;

  @ViewChild("img")
  public img: ElementRef | null = null;

  public async makeScreenshot(ev: Event) {

    ev.stopPropagation();
    ev.preventDefault();

    Array.from(document.querySelectorAll('mat-dialog-container'))
      .forEach(node => (<HTMLElement>node).style.display = 'none');

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
    } finally {
      Array.from(document.querySelectorAll('mat-dialog-container'))
      .forEach(node => (<HTMLElement>node).style.display = '');
    }
  }

}
