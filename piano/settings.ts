namespace piano.preferences {
    export enum AccidentalsPreference {
        Sharps,
        Flats
    }

    export function getAccidentalsPreference() {
        return AccidentalsPreference.Sharps;
    }
}