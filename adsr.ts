namespace ui {
    const DEFAULT_WIDTH = 140;
    const DEFAULT_HEIGHT = 50;
    const SUSTAIN_PERCENT = 0.2;

    export class ADSRGraph extends BaseComponent {
        attack = new ui.Parameter(
            "Attack",
            100,
            0,
            5000,
            ui.ParameterDisplayMode.Integer,
            "ms",
            10
        );

        attackColor = 2;

        decay = new ui.Parameter(
            "Decay",
            100,
            0,
            5000,
            ui.ParameterDisplayMode.Integer,
            "ms",
            10
        );

        decayColor = 6;

        sustain = new ui.Parameter(
            "Sustain",
            512,
            0,
            1024,
            ui.ParameterDisplayMode.Percentage,
            null,
            1024 / 100
        )
        sustainColor = 4;

        release = new ui.Parameter(
            "Release",
            100,
            0,
            5000,
            ui.ParameterDisplayMode.Integer,
            "ms",
            10
        );
        releaseColor = 5;

        backgroundColor = 12;


        constructor(kind?: number) {
            super(kind);

            this.setDimensions(DEFAULT_WIDTH, DEFAULT_HEIGHT)
        }

        draw(left: number, top: number) {
            const sustainWidth = (SUSTAIN_PERCENT * this.width) | 0;

            const maxParamWidth = ((this.width - sustainWidth) / 3) | 0;

            screen.fillRect(left, top, this.width, this.height, 12)

            const attackWidth = (logScale(this.attack.percentage()) * maxParamWidth) | 0
            const decayWidth = (logScale(this.decay.percentage()) * maxParamWidth) | 0
            const releaseWidth = (logScale(this.release.percentage()) * maxParamWidth) | 0

            const bottom = top + this.height - 2;
            let x = left + 1;
            drawLine(
                x, bottom, x + attackWidth, top + 1, this.attackColor
            )

            // screen.fillRect(x, top, attackWidth, this.height, 2)
            x += attackWidth

            const sustainY = top + 1 + (1 - this.sustain.percentage()) * (this.height - 3);

            drawLine(
                x, top + 1, x + decayWidth, sustainY, this.decayColor
            )
            // screen.fillRect(x, top, decayWidth, this.height, 3)
            x += decayWidth
            drawLine(
                x, sustainY, x + sustainWidth, sustainY, this.sustainColor
            )
            // screen.fillRect(x, top, sustainWidth, this.height, 4)
            x += sustainWidth
            drawLine(
                x, sustainY, x + releaseWidth, bottom, this.releaseColor
            )
            // screen.fillRect(x, top, releaseWidth, this.height, 5)
        }
    }

    function logScale(x: number) {
        for (let i = 0; i < 6; i++) {
            x = (Math.log(1 + x) / Math.log(2))
        }
        return x
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