export class Audio {
    audioContext!: AudioContext;
    helper!: boolean;
    filename: string;

    constructor(filename: string) {
        (window as any).AudioContext =
            (window as any).AudioContext || (window as any).webkitAudioContext;

        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            alert("Web Audio API is not supported in this browser");
        }

        this.filename = filename;
        this.helper = false;

        window.addEventListener("load", this.loadAudio.bind(this), false);
    }

    private createHelper() {
        const helperDOM = document.createElement("canvas");
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
                    const frequencyData = new Uint8Array(
                        analyser.frequencyBinCount
                    );

                    analyser.fftSize = 1024;

                    const source = audio.createBufferSource();
                    source.buffer = buffer;
                    source.connect(analyser);

                    // Music => speaker
                    source.connect(audio.destination);

                    // Start source (play the music)
                    source.start(0);

                    // Animation element with frequency
                    const renderFrame = () => {
                        analyser.getByteFrequencyData(frequencyData);
                        console.log(
                            `scale(${1 + (frequencyData[5] * 100) / 256 / 200})`
                        );
                        requestAnimationFrame(renderFrame);
                    };

                    renderFrame();
                });
            };

            request.send();
        }
    }
}
