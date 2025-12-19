namespace ui {
    export class NumberParameterComponent extends BaseComponent {
        protected isEditingText = false;
        protected editBuffer = "";

        valueText: ParameterValueText;

        constructor(public readonly param: Parameter, kind?: number) {
            super(kind);
        }

        handleKeyboardEvent(event: ui.KeyboardEvent): void {
            if (event.eventType === browserEvents.KeyEvent.Pressed) {
                if (isNumericalKey(event.key)) {
                    if (!this.isEditingText) {
                        this.isEditingText = true;
                        this.editBuffer = "";
                    }

                    this.editBuffer += numericalKeyToDigit(event.key);
                }
                else if (event.key === browserEvents.Backspace) {
                    if (this.isEditingText) {
                        this.editBuffer = this.editBuffer.substr(0, this.editBuffer.length - 1);
                    }
                    else {
                        this.isEditingText = true;
                        this.editBuffer = "";
                    }
                }
                else if (event.key === browserEvents.Enter) {
                    if (this.isEditingText) {
                        this.stopEditing();
                    }
                }
            }

            if (this.isEditingText && this.valueText) {
                this.valueText.editText = this.editBuffer;
            }
        }

        protected handleFocusChange(): void {
            if (!this.isFocused()) {
                this.stopEditing();
            }
        }

        handleButtonEvent(event: ui.ButtonEvent): void {
            if (this.isEditingText) {
                this.stopEditing();
            }
            else if (event.eventType === ControllerButtonEvent.Pressed || event.eventType === ControllerButtonEvent.Repeated) {
                if (event.button === controller.left) {
                    this.param.value = Math.max(this.param.min, this.param.value - (this.param.step || 1));
                }
                else if (event.button === controller.right) {
                    this.param.value = Math.min(this.param.max, this.param.value + (this.param.step || 1));
                }
            }

        }

        protected stopEditing() {
            if (this.isEditingText) {
                let newValue = parseFloat(this.editBuffer);
                if (!isNaN(newValue)) {
                    if (this.param.displayMode === ParameterDisplayMode.Percentage) {
                        newValue = Math.max(0, Math.min(100, newValue));
                        this.param.setPercentage(newValue / 100);
                    }
                    else if (this.param.displayMode === ParameterDisplayMode.Semitone) {
                        newValue = Math.max(-piano.MAX_PITCH_MOD_RANGE, Math.min(piano.MAX_PITCH_MOD_RANGE, newValue));
                        this.param.setSemitones(newValue);
                    }
                    else {
                        newValue = Math.max(this.param.min, Math.min(this.param.max, newValue));
                        this.param.value = newValue;
                    }
                }

                this.editBuffer = "";
                this.isEditingText = false;
            }

            if (this.valueText) {
                this.valueText.editText = null;
            }
        }
    }
}