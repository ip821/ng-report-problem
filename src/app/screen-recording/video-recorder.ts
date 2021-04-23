export interface IObjectURL {
  url: string;
}

export class VideoRecorder {

  public async record(): Promise<IObjectURL> {
    return new Promise(async resolve => {
      const mediaStream: MediaStream = await (<any>navigator.mediaDevices).getDisplayMedia({
        video: true,
        audio: false
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (blobEvent) => {
        resolve({
          url: URL.createObjectURL(blobEvent.data)
        });
      };
      mediaRecorder.start();
    });
  }
}
