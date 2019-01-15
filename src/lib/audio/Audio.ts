import { AudioHelper } from "./AudioHelper";

export interface IAudio {
  sizeFFT: 32 | 64 | 128 | 256 | 512 | 1024;
  helper: boolean;
}

export class Audio {
  audioContext!: AudioContext;
  helper: boolean;
  filename: string;
  audioHelper!: AudioHelper;
  sizeFFT: 32 | 64 | 128 | 256 | 512 | 1024;
  frequencyData!: Uint8Array;
  isPlaying: boolean;

  constructor(filename: string, options?: IAudio) {
    (window as any).AudioContext =
      (window as any).AudioContext || (window as any).webkitAudioContext;

    this.filename = filename;
    this.helper = options && options.helper ? options.helper : false;
    this.sizeFFT = options && options.sizeFFT ? options.sizeFFT : 64;
    this.isPlaying = false;

    try {
      this.audioContext = new AudioContext();
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }

    this.audioHelper = new AudioHelper();

    window.addEventListener("load", this.loadAudio.bind(this), false);
  }

  public getAverageFrequency() {
    if (this.frequencyData) {
      let value = 0;
      let data = this.frequencyData;

      for (var i = 0; i < data.length; i++) {
        value += data[i];
      }

      return value / data.length;
    }
  }

  public getTonality(tonality: number) {
    if (this.frequencyData) {
      return this.frequencyData[tonality];
    }
  }

  private loadAudio() {
    if (this.audioContext) {
      const audio = this.audioContext;

      let request = new XMLHttpRequest();

      request.open("GET", this.filename, true);

      request.responseType = "arraybuffer";

      request.onload = () => {
        audio.decodeAudioData(request.response, (buffer: any) => {
          // Create analyser
          const analyser = audio.createAnalyser();
          const frequencyData = new Uint8Array(analyser.frequencyBinCount);

          analyser.fftSize = this.sizeFFT;

          const source = audio.createBufferSource();
          source.buffer = buffer;
          source.connect(analyser);

          source.connect(audio.destination);

          source.start(0);
          this.isPlaying = true;

          window.addEventListener("click", () => {
            this.isPlaying ? audio.suspend() : audio.resume();
            this.isPlaying = !this.isPlaying;
          })

          // Animation element with frequency
          const renderFrame = () => {
            analyser.getByteFrequencyData(frequencyData);
            // console.log(
            //     `scale(${1 + (frequencyData[5] * 100) / 256 / 200})`
            // );
            this.frequencyData = frequencyData;
            // Create Helper
            if (this.helper) {
              this.audioHelper.renderHelper(
                frequencyData,
                analyser.frequencyBinCount
              );
            }
            requestAnimationFrame(renderFrame);
          };

          renderFrame();
        });
      };

      request.send();
    }
  }
}
