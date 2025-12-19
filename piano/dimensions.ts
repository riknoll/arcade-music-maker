namespace piano.dimensions {
    export class Metrics {
        public gridLineWidth = 1;
        public octaveHeight = 84;
        public whiteKeyWidth = 23;

        public topBarHeight = 12;

        public scrollbarWidth = 9;


        constructor() {
        }

        get whiteKeyHeight() {
            return Math.idiv(this.octaveHeight - this.gridLineWidth * 7, 7);
        }

        get blackKeyHeight() {
            return Math.idiv(this.whiteKeyHeight * 2, 3);
        }

        get gridCellHeight() {
            return Math.idiv(this.octaveHeight - this.gridLineWidth * 12, 12);
        }

        get blackKeyWidth() {
            return Math.idiv(this.whiteKeyWidth * 2, 3);
        }

        get measureWidth() {
            return 64
        }

        get measureGridWidth() {
            return this.gridCellWidth * 8 + this.gridLineWidth * 7;
        }

        get gridCellWidth() {
            return Math.idiv(this.measureWidth - this.gridLineWidth * 8, 8);
        }

        get pianoWidth() {
            return this.whiteKeyWidth + this.gridLineWidth;
        }
    }
}