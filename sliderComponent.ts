namespace ui {
    const DEFAULT_SLIDER_WIDTH = 80;
    const DEFAULT_SLIDER_HEIGHT = 16;

    export class SliderComponent extends NumberParameterComponent {
        handleColor = 12;
        trackColor = 11;

        label: ParameterLabel;

        focusColor = 5;

        constructor(param: Parameter, kind?: number) {
            super(param, kind);

            this.setDimensions(DEFAULT_SLIDER_WIDTH, DEFAULT_SLIDER_HEIGHT);
            this.setFocusable(true);
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent): void {
            if (event !== browserEvents.MouseButtonEvent.Pressed) return;

            this.focus();
            this.updateMouseValue(x);
        }

        handleMouseMove(x: number, y: number): void {
            if (this.isFocused() && browserEvents.MouseLeft.isPressed()) {
                this.updateMouseValue(x);
            }
        }

        protected updateMouseValue(x: number) {
            let percent = (x - this.left) / this.width;
            if (x - this.left < 1) {
                percent = 0;
            }
            else if (x - this.left >= this.width - 1) {
                percent = 1;
            }

            this.param.setPercentage(Math.max(0, Math.min(1, percent)));
        }

        draw(left: number, top: number) {
            const trackHeight = 4;
            screen.fillRect(
                left,
                top + (this.height - trackHeight) / 2,
                this.width,
                trackHeight,
                this.trackColor
            );

            const handleWidth = 4;
            const handleX = (left + (this.param.percentage() * this.width)) | 0;
            screen.fillRect(
                handleX - (handleWidth >> 1),
                top,
                handleWidth,
                this.height,
                this.handleColor
            );

            if (this.isFocused()) {
                let focusRectLeft = this.left;
                let focusRectRight = this.right;

                if (this.label) {
                    focusRectLeft = Math.min(focusRectLeft, this.label.left);
                    focusRectRight = Math.max(focusRectLeft, this.label.right);
                }

                if (this.valueText) {
                    focusRectLeft = Math.min(focusRectLeft, this.valueText.left);
                    focusRectRight = Math.max(focusRectLeft, this.valueText.right);
                }

                screen.drawRect(
                    focusRectLeft - 2,
                    this.top - 2,
                    focusRectRight - focusRectLeft + 4,
                    this.height + 4,
                    this.focusColor
                );
            }
        }
    }

    export function createSliders(params: Parameter[], kind?: number): BaseComponent[] {
        const labels: BaseComponent[] = [];
        const values: BaseComponent[] = [];
        const sliders: BaseComponent[] = [];

        let maxLabelWidth = 0;
        let maxParamWidth = 0;

        for (const param of params) {
            labels.push(new ParameterLabel(param, kind));
            values.push(new ParameterValueText(param, kind));
            sliders.push(new SliderComponent(param, kind));

            maxLabelWidth = Math.max(maxLabelWidth, labels[labels.length - 1].width);
            maxParamWidth = Math.max(maxParamWidth, values[values.length - 1].width);
        }

        const spacing = 4;
        let y = 0;

        for (let i = 0; i < params.length; i++) {
            const label = labels[i] as ParameterLabel;
            label.left = spacing;

            const slider = sliders[i] as SliderComponent;
            slider.setDimensions(screen.width - (maxLabelWidth + maxParamWidth + (spacing * 4)), 8);
            slider.left = maxLabelWidth + (spacing * 2);

            const value = values[i] as ParameterValueText;
            value.right = screen.width - spacing;

            label.top = y + ((slider.height - label.height) >> 1);
            slider.top = y;
            value.top = y + ((slider.height - value.height) >> 1);
            y += slider.height + spacing;

            slider.label = label;
            slider.valueText = value;
        }

        return labels.concat(sliders).concat(values);
    }
}