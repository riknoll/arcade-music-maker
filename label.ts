namespace ui {
    export class ParameterLabel extends BaseComponent {
        protected font: fancyText.BaseFont;
        color = 1;

        constructor(public readonly param: Parameter, kind?: number) {
            super(kind);

            this.setFont(fancyText.geometric_sans_7);
        }

        draw(left: number, top: number) {
            fancyText.draw(
                this.param.name,
                screen,
                left,
                top,
                0,
                this.color,
                this.font
            );
        }

        setFont(font: fancyText.BaseFont) {
            this.font = font;
            this.setDimensions(fancyText.getTextWidth(this.font, this.param.name), this.font.lineHeight);
        }
    }

    export class ParameterValueText extends BaseComponent {
        protected font: fancyText.BaseFont;
        protected monospaceCharWidth: number;

        protected isMonospace = true;
        protected includeUnit = true;
        protected unitSpacing = 5;

        editText: string;

        color = 1;

        constructor(public readonly param: Parameter, kind?: number) {
            super(kind);

            this.setFont(fancyText.geometric_sans_7);
        }

        draw(left: number, top: number) {
            let text: string;
            const isPercentage = this.param.displayMode === ParameterDisplayMode.Percentage;

            if (this.editText) {
                text = this.editText;
            }
            else if (this.param.displayMode === ParameterDisplayMode.Semitone) {
                text = toStringFixedDecimal(this.param.semitones(), 1);
            }
            else if (this.param.displayMode === ParameterDisplayMode.Float) {
                text = toStringFixedDecimal(this.param.value, 1);
            }
            else if (isPercentage) {
                text = ((this.param.percentage() * 100) | 0) + "";
            }
            else {
                text = (this.param.value | 0) + "";
            }

            let unit = this.param.unit || "";
            if (!unit && this.param.displayMode === ParameterDisplayMode.Percentage) {
                unit = "%";
            }

            if (this.isMonospace) {
                const digits = this.maxDigits();

                let startOffset = digits - text.length;
                for (let i = 0; i < text.length; i++) {
                    fancyText.draw(
                        text.charAt(i),
                        screen,
                        left + (startOffset + i) * this.monospaceCharWidth,
                        top,
                        0,
                        this.color,
                        this.font
                    )
                }

                if (this.includeUnit) {
                    fancyText.draw(
                        unit,
                        screen,
                        left + digits * this.monospaceCharWidth + this.unitSpacing,
                        top,
                        0,
                        this.color,
                        this.font
                    )
                }
            }
            else {
                fancyText.draw(
                    text,
                    screen,
                    left,
                    top,
                    0,
                    this.color,
                    this.font
                )

                if (this.includeUnit) {
                    fancyText.draw(
                        unit,
                        screen,
                        left + fancyText.getTextWidth(this.font, text) + this.unitSpacing,
                        top,
                        0,
                        this.color,
                        this.font
                    );
                }
            }
        }

        setFont(font: fancyText.BaseFont) {
            const numbers = "-.0123456789";

            this.font = font;
            this.monospaceCharWidth = 0;

            for (let i = 0; i < numbers.length; i++) {
                this.monospaceCharWidth = Math.max(this.monospaceCharWidth, font.charWidth(numbers.charCodeAt(i)))
            }

            this.monospaceCharWidth ++;

            this.setDimensions(this.textWidth(), this.font.lineHeight);
        }

        setIsMonospace(monospace: boolean) {
            this.isMonospace = monospace;
            this.setFont(this.font);
        }

        setUnitVisible(visible: boolean) {
            this.includeUnit = visible;
            this.setFont(this.font);
        }

        setUnitSpacing(spacing: number) {
            this.unitSpacing = spacing;
            this.setFont(this.font);
        }

        maxDigits() {
            if (this.param.displayMode === ParameterDisplayMode.Percentage) {
                return 3;
            }
            if (this.param.displayMode === ParameterDisplayMode.Semitone) {
                // -XX.X
                return 5;
            }

            if (this.param.displayMode === ParameterDisplayMode.Float) {
                return Math.max(toStringFixedDecimal(this.param.min, 1).length, toStringFixedDecimal(this.param.max, 1).length);
            }

            return Math.max((this.param.min + "").length, (this.param.max + "").length);
        }

        textWidth() {
            let unitWidth = 0;
            if (this.includeUnit) {
                if (this.param.unit) {
                    unitWidth = fancyText.getTextWidth(this.font, this.param.unit);
                }
                else if (this.param.displayMode === ParameterDisplayMode.Percentage) {
                    unitWidth = this.font.charWidth("%".charCodeAt(0));
                }
            }

            if (unitWidth) {
                unitWidth += this.unitSpacing;
            }

            if (this.isMonospace) {
                return unitWidth + this.monospaceCharWidth * this.maxDigits();
            }
            else {
                return unitWidth + fancyText.getTextWidth(this.font, "" + this.param.value);
            }
        }
    }

    function toStringFixedDecimal(value: number, decimalPlaces: number): string {
        const factor = Math.pow(10, decimalPlaces);
        const intValue = Math.round(Math.abs(value) * factor);
        const intPart = (intValue / factor) | 0;
        let fracPart = Math.abs(intValue % factor).toString();

        while (fracPart.length < decimalPlaces) {
            fracPart = "0" + fracPart;
        }

        return (value < 0 ? "-" : "") + intPart + "." + fracPart;
    }
}