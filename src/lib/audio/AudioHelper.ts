export class AudioHelper {
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D | null;
    widthHelper: number;
    heightHelper: number;

    constructor() {
        this.widthHelper = 150;
        this.heightHelper = 70;
    }

    private createHelper() {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", this.widthHelper.toString());
        this.canvas.setAttribute("height", this.heightHelper.toString());
        this.canvas.style.position = "absolute";
        this.canvas.style.zIndex = "2";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
    }

    public renderHelper(datas: Uint8Array, bufferLength: number) {
        if (this.ctx === undefined) this.createHelper();
        const width = this.canvas.width;
        const height = this.canvas.height;
        const barWidth = this.canvas.width / bufferLength;
        let x: number = 0;

        if (this.ctx) {
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(0, 0, width, height);

            for (var i = 0; i < bufferLength; i++) {
                const barHeight = -(datas[i] / 5);

                this.ctx.fillStyle = "white";
                this.ctx.fillRect(x, this.canvas.height, barWidth, barHeight);

                x += barWidth + 1;
            }
        }
    }
}
