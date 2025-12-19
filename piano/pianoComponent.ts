namespace piano {
    export class PianoComponent extends ui.BaseComponent {
        constructor(protected metrics: dimensions.Metrics, protected scroll: ui.Parameter, kind?: number) {
            super(kind);
            this.setDimensions(metrics.pianoWidth, screen.height);
        }

        draw(left: number, top: number) {
            let y = top - this.scroll.value;
            for (let octave = 0; octave < 8; octave++) {
                if (y + this.metrics.octaveHeight < top) {
                    y += this.metrics.octaveHeight;
                    continue;
                }
                if (y > top + this.height) {
                    break;
                }
                drawPianoOctave(left, y, 7 - octave, this.metrics);
                y += this.metrics.octaveHeight;
            }
        }
    }
}