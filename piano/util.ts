namespace piano {
    export enum Note {
        C,
        CSharp,
        D,
        DSharp,
        E,
        F,
        FSharp,
        G,
        GSharp,
        A,
        ASharp,
        B,

        DFlat = Note.CSharp,
        EFlat = Note.DSharp,
        GFlat = Note.FSharp,
        AFlat = Note.GSharp,
        BFlat = Note.ASharp
    }

    export function getNoteLetter(note: number) {
        if (preferences.getAccidentalsPreference() === preferences.AccidentalsPreference.Sharps) {
            return _getNoteLetterSharp(note % 12);
        }
        else {
            return _getNoteLetterFlat(note % 12);
        }
    }

    export function getNoteOctave(note: number) {
        return Math.idiv(note, 12) - 1;
    }

    export function getNoteAccidental(note: number) {
        if (!isSharpOrFlat(note)) return " ";

        const sharpPreference = preferences.getAccidentalsPreference() === preferences.AccidentalsPreference.Sharps
        return sharpPreference ? "#" : "b";
    }

    export function getNoteSpelling(note: number) {
        const letter = getNoteLetter(note);
        const accidental = getNoteAccidental(note);

        return letter + accidental + (getNoteOctave(note) + "").charAt(0)
    }

    export function isSharpOrFlat(note: number) {
        switch (note % 12) {
            case Note.CSharp:
            case Note.DSharp:
            case Note.FSharp:
            case Note.GSharp:
            case Note.ASharp:
                return true;
        }

        return false;
    }

    function _getNoteLetterFlat(note: Note) {
        switch (note) {
            case Note.C:
                return "C";
            case Note.D:
            case Note.DFlat:
                return "D";
            case Note.E:
            case Note.EFlat:
                return "E";
            case Note.F:
                return "F";
            case Note.G:
            case Note.GFlat:
                return "G";
            case Note.A:
            case Note.AFlat:
                return "A";
            case Note.B:
            case Note.BFlat:
                return "B";
        }

        return "?";
    }

    function _getNoteLetterSharp(note: Note) {
        switch (note) {
            case Note.C:
            case Note.CSharp:
                return "C";
            case Note.D:
            case Note.DSharp:
                return "D";
            case Note.E:
                return "E";
            case Note.F:
            case Note.FSharp:
                return "F";
            case Note.G:
            case Note.GSharp:
                return "G";
            case Note.A:
            case Note.ASharp:
                return "A";
            case Note.B:
                return "B";
        }

        return "?";
    }
}