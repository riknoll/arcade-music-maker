namespace ui {
    export class IconSelectorComponent extends BaseComponent {
        public param: ui.Parameter;

        constructor(
            protected icons: Image[],
            protected values?: number[],
            kind?: number
        ) {
            super(kind);

            this.setFocusable(true);

            if (values) {
                let min = 0;
                let max = 0;

                for (const v of values) {
                    if (v < min) {
                        min = v;
                    }
                    if (v > max) {
                        max = v;
                    }
                }

                this.param = new ui.Parameter(
                    "Value",
                    min,
                    max,
                    min,
                    ui.ParameterDisplayMode.Integer
                );
            }
            else {
                this.param = new ui.Parameter(
                    "Value",
                    0,
                    icons.length - 1,
                    0,
                    ui.ParameterDisplayMode.Integer
                );
            }

            this.setDimensions(
                icons[0].width + 8 + leftArrow.width + rightArrow.width,
                Math.max(Math.max(icons[0].height, leftArrow.height), rightArrow.height)
            );
        }

        draw(left: number, top: number) {
            screen.drawTransparentImage(
                leftArrow,
                left,
                top + ((this.height - leftArrow.height) >> 1)
            );

            screen.drawTransparentImage(
                this.icons[this.getIconIndex()],
                left + leftArrow.width + 4,
                top + ((this.height - this.icons[0].height) >> 1)
            );

            screen.drawTransparentImage(
                rightArrow,
                left + this.width - rightArrow.width,
                top + ((this.height - rightArrow.height) >> 1)
            );

            if (this.isFocused()) {
                screen.drawRect(
                    left - 2,
                    top - 2,
                    this.width + 4,
                    this.height + 4,
                    5
                )
            }
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent): void {
            if (event !== browserEvents.MouseButtonEvent.Pressed) return;

            if (x - this.left <= leftArrow.width) {
               this.nextIndex(false);
            }
            else if (x - this.left >= this.width - rightArrow.width) {
                this.nextIndex(true);
            }
        }

        handleButtonEvent(event: ui.ButtonEvent): void {
            if (event.eventType === ControllerButtonEvent.Pressed || event.eventType === ControllerButtonEvent.Repeated) {
                if (event.button === controller.left) {
                    this.nextIndex(false);
                }
                else if (event.button === controller.right) {
                    this.nextIndex(true);
                }
            }
        }

        protected nextIndex(forward: boolean) {
            const index = this.getIconIndex();
            if (forward) {
                const newIndex = (index + 1) % this.icons.length;
                this.param.value = this.values ? this.values[newIndex] : newIndex;
            } else {
                const newIndex = (index + (this.icons.length - 1)) % this.icons.length;
                this.param.value = this.values ? this.values[newIndex] : newIndex;
            }
        }

        protected getIconIndex() {
            return this.values ? this.values.indexOf(this.param.value) : this.param.value;
        }
    }
}