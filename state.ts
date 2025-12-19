namespace ui {
    export class State {
        focusOrder: BaseComponent[] = [];
        focusedIndex = -1;
        globalMouseMoveListeners: ((x: number, y: number) => void)[] = [];

        constructor() {
            this.registerButtonHandlers();
            this.registerKeyHandlers();

            for (const event of [browserEvents.MouseButtonEvent.Pressed, browserEvents.MouseButtonEvent.Released]) {
                browserEvents.MouseLeft.onEvent(event, (x, y) => {
                    for (const component of this.focusOrder) {
                        if (component.disabled) continue;
                        if (x >= component.left && x < component.right && y >= component.top && y < component.bottom) {
                            component.handleClick(x, y, event);
                            break;
                        }
                    }
                })
            }


            browserEvents.onMouseMove((x, y) => {
                for (const listener of this.globalMouseMoveListeners) {
                    listener(x, y);
                }

                for (const component of this.focusOrder) {
                    if (component.disabled) continue;
                    if (x >= component.left && x < component.right && y >= component.top && y < component.bottom) {
                        component.handleMouseMove(x, y);
                        break;
                    }
                }
            })
        }

        addGlobalMouseMoveListener(listener: (x: number, y: number) => void) {
            this.globalMouseMoveListeners.push(listener);
        }

        removeGlobalMouseMoveListener(listener: (x: number, y: number) => void) {
            this.globalMouseMoveListeners.removeElement(listener);
        }

        registerFocusable(component: BaseComponent) {
            if (this.focusOrder.indexOf(component) === -1) {
                this.focusOrder.push(component);
            }

            this.sortFocusOrder();
        }

        unregisterFocusable(component: BaseComponent) {
            this.focusOrder.removeElement(component);
        }

        sortFocusOrder() {
            const focused = this.getFocusedComponent();

            this.focusOrder.sort((a, b) => {
                if (a.focusIndex === b.focusIndex) {
                    if (a.y === b.y) {
                        return a.x - b.x;
                    }
                    return a.y - b.y;
                }
                return a.focusIndex - b.focusIndex;
            });

            if (focused) {
                this.focusedIndex = this.focusOrder.indexOf(focused);
            }
        }

        getFocusedComponent(): BaseComponent {
            if (this.focusedIndex >= 0 && this.focusedIndex < this.focusOrder.length) {
                return this.focusOrder[this.focusedIndex];
            }
            return null;
        }

        focusNext() {
            if (this.focusOrder.length === 0) {
                return;
            }

            this.setFocusedIndex((this.focusedIndex + 1) % this.focusOrder.length);
        }

        focusPrevious() {
            if (this.focusOrder.length === 0) {
                return;
            }

            this.setFocusedIndex((this.focusedIndex - 1 + this.focusOrder.length) % this.focusOrder.length);
        }

        setFocusedIndex(index: number) {
            if (index >= 0 && index < this.focusOrder.length) {
                for (let i = 0; i < this.focusOrder.length; i++) {
                    const component = this.focusOrder[(i + index) % this.focusOrder.length];
                    if (!component.disabled) {
                        this.setFocusedComponent(component);
                        return;
                    }
                }
            }
            else if (this.getFocusedComponent()) {
                this.getFocusedComponent().setFocused(false);
                this.focusedIndex = -1;
            }
        }

        setFocusedComponent(component: BaseComponent) {
            const currentFocused = this.getFocusedComponent();
            if (currentFocused && currentFocused !== component) {
                currentFocused.setFocused(false);
            }

            const index = this.focusOrder.indexOf(component);
            if (index >= 0) {
                this.focusedIndex = index;
                component.setFocused(true);
            }
        }

        protected registerButtonHandlers() {
            const buttonEvents = [
                ControllerButtonEvent.Pressed,
                ControllerButtonEvent.Released,
                ControllerButtonEvent.Repeated
            ];

            for (const button of getButtons()) {
                for (const event of buttonEvents) {
                    button.onEvent(event, () => {
                        const eventObject = new ButtonEvent(button, event);
                        const focusedComponent = this.getFocusedComponent();

                        if (focusedComponent) {
                            focusedComponent.handleButtonEvent(eventObject);
                        }

                        if (eventObject.preventDefault) {
                            return;
                        }

                        this.handleButtonEvent(eventObject);
                    });
                }
            }
        }

        protected registerKeyHandlers() {
            const buttonEvents = [
                browserEvents.KeyEvent.Pressed,
                browserEvents.KeyEvent.Released,
                browserEvents.KeyEvent.Repeat
            ];

            for (const button of getKeys()) {
                for (const event of buttonEvents) {
                    button.onEvent(event, () => {
                        const eventObject = new KeyboardEvent(button, event);
                        const focusedComponent = this.getFocusedComponent();

                        if (focusedComponent) {
                            focusedComponent.handleKeyboardEvent(eventObject);
                        }

                        if (eventObject.preventDefault) {
                            return;
                        }

                        this.handleKeyboardEvent(eventObject);
                    });
                }
            }
        }

        protected handleButtonEvent(event: ui.ButtonEvent) {
            if (event.eventType === ControllerButtonEvent.Pressed) {
                if (event.button === controller.down) {
                    this.focusNext();
                }
                else if (event.button === controller.up) {
                    this.focusPrevious();
                }
            }
        }

        protected handleKeyboardEvent(event: ui.KeyboardEvent) {
            if (event.eventType === browserEvents.KeyEvent.Pressed) {
                if (event.key === browserEvents.Tab) {
                    if (browserEvents.Shift.isPressed()) {
                        this.focusPrevious();
                    }
                    else {
                        this.focusNext();
                    }
                }
            }
        }
    }

    function stateFactory() {
        return new State();
    }

    export function _state() {
        return __util.getState(stateFactory);
    }

    function getButtons() {
        return [
            controller.A,
            controller.B,
            controller.up,
            controller.down,
            controller.left,
            controller.right,
            controller.menu
        ];
    }

    function getKeys() {
        return [
            browserEvents.Zero,
            browserEvents.One,
            browserEvents.Two,
            browserEvents.Three,
            browserEvents.Four,
            browserEvents.Five,
            browserEvents.Six,
            browserEvents.Seven,
            browserEvents.Eight,
            browserEvents.Nine,
            browserEvents.Enter,
            browserEvents.Backspace,
            browserEvents.Tab
        ];
    }
}