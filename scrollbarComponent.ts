namespace ui {
    export class ScrollbarComponent extends BaseComponent {
        scroll: ui.Parameter
        constructor(protected contentHeight: number, protected viewHeight: number, kind?: number) {
            super(kind);

            this.setDimensions(9, viewHeight);

            this.scroll = new ui.Parameter(
                "Scroll",
                0,
                0,
                Math.max(0, contentHeight - viewHeight),
                ui.ParameterDisplayMode.Integer
            );

            this.setFocusable(true);

            browserEvents.onWheel((dx, dy, dz) => {
                this.scroll.value = Math.max(0, Math.min(this.scroll.max, this.scroll.value + dy / 2));
            })
        }

        draw(left: number, top: number) {
            drawScrollBar(left, top, this.height, this.contentHeight, this.scroll.value);

            if (this.isFocused()) {
                screen.drawRect(
                    this.left,
                    this.top,
                    this.width,
                    this.height,
                    5
                )
            }
        }


        handleMouseMove(x: number, y: number): void {
            if (this.isFocused() && browserEvents.MouseLeft.isPressed()) {
                this.updateScrollFromMouse(y);
            }
        }

        handleButtonEvent(event: ui.ButtonEvent): void {
            if (event.eventType === ControllerButtonEvent.Pressed || event.eventType === ControllerButtonEvent.Repeated) {
                if (event.button === controller.up) {
                    this.scroll.value = Math.max(0, this.scroll.value - 5);
                    event.preventDefault = true;
                }
                else if (event.button === controller.down) {
                    this.scroll.value = Math.min(this.scroll.max, this.scroll.value + 5);
                    event.preventDefault = true;
                }
            }
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent): void {
            if (event !== browserEvents.MouseButtonEvent.Pressed) return;

            this.focus();

            // console.log(`Scrollbar click at y=${y} (top=${this.top}, bottom=${this.bottom}, height=${this.height}, scrollValue=${this.scroll.value}) width=${this.width}`);

            if (y - this.top < this.width) {
                this.scroll.value = Math.max(0, this.scroll.value - 5);
            }
            else if (this.bottom - y < this.width) {
                this.scroll.value = Math.min(this.scroll.max, this.scroll.value + 5);
            }
            else {
                this.updateScrollFromMouse(y);
            }
        }

        updateScrollFromMouse(y: number) {
            const BAR_HEIGHT = this.height - scrollbarUp.height - scrollbarDown.height + 2;
            const handleHeight = Math.min(BAR_HEIGHT, Math.max(8, (this.height / this.contentHeight) * BAR_HEIGHT)) | 0;

            const offset = y - this.top - scrollbarUp.height - (handleHeight >> 1);

            this.scroll.value = Math.max(0, Math.min(this.scroll.max, (offset / (BAR_HEIGHT - handleHeight)) * this.scroll.max));
        }
    }

    function drawScrollBar(left: number, top: number, scrollBarHeight: number, contentHeight: number, scroll: number) {
        const SCROLL_BAR_WIDTH = scrollbarDown.width;
        const BAR_HEIGHT = scrollBarHeight - scrollbarUp.height - scrollbarDown.height + 2;

        screen.drawImage(
            scrollbarUp,
            left,
            top
        );
        screen.drawImage(
            scrollbarDown,
            left,
            top + scrollBarHeight - scrollbarDown.height
        );

        const handleHeight = Math.min(BAR_HEIGHT, Math.max(8, (scrollBarHeight / contentHeight) * BAR_HEIGHT)) | 0;
        const handleTop = (top + scrollbarUp.height - 1 + BAR_HEIGHT * (scroll / contentHeight)) | 0;

        screen.drawRect(
            left,
            top + scrollbarUp.height,
            SCROLL_BAR_WIDTH,
            BAR_HEIGHT - 1,
            15
        );

        screen.fillRect(
            left + 1,
            top + scrollbarUp.height,
            SCROLL_BAR_WIDTH - 2,
            BAR_HEIGHT - 2,
            11
        );

        screen.drawRect(
            left,
            handleTop,
            SCROLL_BAR_WIDTH,
            handleHeight,
            15
        );
        screen.fillRect(
            left + 1,
            handleTop + 1,
            SCROLL_BAR_WIDTH - 2,
            handleHeight - 3,
            12
        );
        screen.fillRect(
            left + 1,
            handleTop + handleHeight - 2,
            SCROLL_BAR_WIDTH - 2,
            1,
            11
        );
    }
}