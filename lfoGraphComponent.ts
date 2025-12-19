namespace ui {
    const DEFAULT_WIDTH = 140;
    const DEFAULT_HEIGHT = 50;

    export class LFOGraphComponent extends ui.BaseComponent {
        frequency = new ui.Parameter(
            "Frequency",
            1,
            0.5,
            40,
            ui.ParameterDisplayMode.Float,
            "Hz",
            0.1
        )

        depth: ui.Parameter;

        backgroundColor = 12;
        waveColor = 1;
        gridlineColor = 1;


        constructor(depth: ui.Parameter, kind?: number) {
            super(kind);

            this.depth = depth;
            this.setDimensions(DEFAULT_WIDTH, DEFAULT_HEIGHT);
        }

        draw(left: number, top: number) {
            const centerY = top + this.height / 2;

            screen.fillRect(left, top, this.width, this.height, this.backgroundColor);

            for (let x = 0; x < this.width; x += 2) {
                screen.setPixel(left + x, centerY, this.gridlineColor);
            }

            const maxCycleWidth = this.width;
            const minCycleWidth = 16;

            const cycleWidth = minCycleWidth + ((maxCycleWidth - minCycleWidth) * (1 - this.frequency.percentage()));

            const usableHeight = this.height - 4;
            const halfHeight = usableHeight / 2;;

            let previousY = halfHeight;
            let previousX = this.width / 2;

            let x = this.width / 2;
            let stage = 0;
            let y = halfHeight;

            const scale = this.depth.displayMode == ParameterDisplayMode.Semitone ? this.depth.semitones() / 12 : this.depth.percentage();


            while (x < this.width - 1) {
                x += cycleWidth / 4;
                switch (stage) {
                    case 0:
                        y = halfHeight + (scale * halfHeight);
                        break;
                    case 1:
                        y = halfHeight;
                        break;
                    case 2:
                        y = halfHeight - (scale * halfHeight);
                        break;
                    case 3:
                        y = halfHeight;
                        break;
                }
                stage = (stage + 1) % 4;



                if (x > this.width - 1) {
                    const progress = 1 - ((x - (this.width - 1)) / (x - previousX));
                    x = this.width - 1;
                    y = previousY + progress * (y - previousY);
                }


                drawLine(
                    left + previousX,
                    top + previousY + 2,
                    left + x,
                    top + y + 2,
                    this.waveColor
                )
                drawLine(
                    left + this.width - previousX,
                    top + usableHeight - previousY + 2,
                    left + this.width - x,
                    top + usableHeight - y + 2,
                    this.waveColor
                )

                // screen.drawLine(
                //     previousX,
                //     previousY,
                //     x,
                //     y,
                //     this.waveColor
                // )

                previousX = x;
                previousY = y;
            }
        }
    }

    function drawLine(
        x0: number,
        y0: number,
        x1: number,
        y1: number,
        color: number
    ) {
        screen.drawLine(x0, y0, x1, y1, color)
        screen.drawLine(x0 - 1, y0, x1 - 1, y1, color)
        screen.drawLine(x0, y0 - 1, x1, y1 - 1, color)
        screen.drawLine(x0 + 1, y0, x1 + 1, y1, color)
        screen.drawLine(x0, y0 + 1, x1, y1 + 1, color)
    }
}