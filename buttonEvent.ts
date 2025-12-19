namespace ui {
    export class ButtonEvent {
        preventDefault = false;

        constructor(
            public readonly button: controller.Button,
            public readonly eventType: ControllerButtonEvent
        ) {}
    }

    export class KeyboardEvent {
        preventDefault = false;

        constructor(
            public readonly key: browserEvents.KeyButton,
            public readonly eventType: browserEvents.KeyEvent
        ) {}
    }

    export function isNumericalKey(key: browserEvents.KeyButton): boolean {
        return key === browserEvents.Zero ||
               key === browserEvents.One ||
               key === browserEvents.Two ||
               key === browserEvents.Three ||
               key === browserEvents.Four ||
               key === browserEvents.Five ||
               key === browserEvents.Six ||
               key === browserEvents.Seven ||
               key === browserEvents.Eight ||
               key === browserEvents.Nine;
    }

    export function numericalKeyToDigit(key: browserEvents.KeyButton): number {
        if (key === browserEvents.Zero) return 0;
        if (key === browserEvents.One) return 1;
        if (key === browserEvents.Two) return 2;
        if (key === browserEvents.Three) return 3;
        if (key === browserEvents.Four) return 4;
        if (key === browserEvents.Five) return 5;
        if (key === browserEvents.Six) return 6;
        if (key === browserEvents.Seven) return 7;
        if (key === browserEvents.Eight) return 8;
        if (key === browserEvents.Nine) return 9;

        return -1;
    }
}