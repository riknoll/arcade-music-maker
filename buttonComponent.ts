namespace ui {
    export class ButtonComponent extends BaseComponent {
        label: string;
        icon: Image | undefined;

        protected font: fancyText.BaseFont;

        iconOnLeft = true;
        color = 1;

        protected clickHandler: (() => void) | undefined;

        constructor(label?: string, icon?: Image, kind?: number) {
            super(kind);
            this.label = label || "";
            this.icon = icon;

            this.setFont(fancyText.geometric_sans_7);
        }

        onClick(handler: () => void) {
            this.clickHandler = handler;
            this.setFocusable(true);
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent): void {
            if (event !== browserEvents.MouseButtonEvent.Pressed) return;

            if (this.clickHandler) {
                this.focus();
                this.clickHandler();
            }
        }

        handleKeyboardEvent(event: ui.KeyboardEvent): void {
            if (event.eventType === browserEvents.KeyEvent.Pressed) {
                if (event.key === browserEvents.Enter || event.key === browserEvents.Space) {
                    if (this.clickHandler) {
                        this.clickHandler();
                    }
                }
            }
        }

        handleButtonEvent(event: ui.ButtonEvent): void {
            if (event.eventType === ControllerButtonEvent.Pressed) {
                if (event.button === controller.A) {
                    if (this.clickHandler) {
                        this.clickHandler();
                    }
                }
            }
        }

        draw(left: number, top: number) {
            let textLeft = left;

            if (this.icon && this.iconOnLeft) {
                textLeft += this.icon.width + 4;
                screen.drawTransparentImage(this.icon, left, top + ((this.height - this.icon.height) >> 1));
            }

            fancyText.draw(
                this.label,
                screen,
                textLeft,
                top + ((this.height - this.font.lineHeight) >> 1),
                0,
                this.color,
                this.font
            );

            if (this.icon && !this.iconOnLeft) {
                screen.drawTransparentImage(this.icon, left + this.width - this.icon.width, top + ((this.height - this.icon.height) >> 1));
            }

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

        setFont(font: fancyText.BaseFont) {
            this.font = font;
            this.setDimensions(
                fancyText.getTextWidth(this.font, this.label) + (this.icon ? this.icon.width + 4 : 0),
                Math.max(this.font.lineHeight, this.icon ? this.icon.height : 0)
            );
        }
    }
}