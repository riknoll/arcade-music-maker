namespace ui {
    export class BaseComponent extends sprites.ExtendableSprite {
        private _focusable = false;
        private _focusIndex = -1;
        private _focused = false;

        disabled: boolean = false;

        get focusIndex(): number {
            return this._focusIndex;
        }

        set focusIndex(index: number) {
            this._focusIndex = index;

            if (this._focusable) {
                _state().sortFocusOrder();
            }
        }

        constructor(kind?: number) {
            super(img`.`, kind);
        }

        setFocusable(focusable: boolean, index?: number) {
            const wasFocusable = this._focusable;

            this._focusable = focusable;
            if (index !== undefined) {
                this._focusIndex = index;
            }

            if (this._focusable) {
                _state().registerFocusable(this)
            }
            else if (wasFocusable) {
                _state().unregisterFocusable(this);
            }
        }

        setFocused(focused: boolean) {
            if (this._focused === focused) {
                return;
            }

            this._focused = focused;
            this.handleFocusChange();
        }

        isFocused(): boolean {
            return this._focused;
        }

        focus() {
            _state().setFocusedComponent(this);
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);

            if (this._focusable) {
                _state().unregisterFocusable(this);
            }
        }

        handleButtonEvent(event: ui.ButtonEvent) {
            // Override in subclasses
        }

        handleKeyboardEvent(event: ui.KeyboardEvent) {
            // Override in subclasses
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent) {
            // Override in subclasses
        }

        handleMouseMove(x: number, y: number) {
        }

        protected handleFocusChange() {
            // Override in subclasses
        }
    }
}