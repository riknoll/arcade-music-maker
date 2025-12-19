namespace ui {
    export enum ParameterDisplayMode {
        Float,
        Integer,
        Percentage,
        Semitone
    }

    export class Parameter {
        constructor(
            public readonly name: string,
            public value: number,
            public readonly min: number,
            public readonly max: number,
            public readonly displayMode: ParameterDisplayMode,
            public readonly unit?: string,
            public readonly step?: number
        ) {}

        percentage() {
            return (this.value - this.min) / (this.max - this.min)
        }

        setPercentage(percent: number) {
            this.value = this.min + percent * (this.max - this.min);
        }

        semitones() {
            return modAmplitudeToSemitones(this.value);
        }

        setSemitones(semitones: number) {
            this.value = Math.min(Math.max(0, semitonesToModAmplitude(semitones)), 1024);
        }
    }

    export function modAmplitudeToSemitones(amplitude: number): number {
        return (((amplitude / 1024) * 2) - 1) * piano.MAX_PITCH_MOD_RANGE
    }

    export function semitonesToModAmplitude(semitones: number): number {
        return (((semitones / piano.MAX_PITCH_MOD_RANGE) + 1) / 2) * 1024
    }
}