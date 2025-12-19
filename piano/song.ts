namespace piano {
    export class Song {
        tracks: Track[];
        tempo: number;
        ticksPerBeat: number;
        beatsPerMeasure: number;
        player: SongPlayer;

        constructor() {
            this.tracks = [
                new Track(getBuiltinInstument(0)),
                new Track(getBuiltinInstument(1)),
                new Track(getBuiltinInstument(2)),
                new Track(getBuiltinInstument(3))
            ];

            this.tempo = 120;
            this.ticksPerBeat = 8;
            this.beatsPerMeasure = 4;
        }

        ticksToMs(ticks: number) {
            return (ticks / this.ticksPerBeat) * (60000 / this.tempo);
        }

        msToTicks(ms: number) {
            return (ms / (60000 / this.tempo)) * this.ticksPerBeat;
        }

        ticksPerPattern(): number {
            return 2 * this.beatsPerMeasure * this.ticksPerBeat;
        }
    }

    export class Track {
        instrument: Instrument;
        patterns: Pattern[] = [];
        sequence: number[] = [];

        constructor(instrument: Instrument) {
            this.instrument = instrument;
            this.patterns.push(new Pattern());
            this.sequence = [0, 0, 0, 0];
        }
    }

    export class Instrument {
        id: number;
        iconIndex: number;
        name: string;
        def: music.sequencer.Instrument;

        constructor() {
            this.def = new music.sequencer.Instrument();
        }

        save() {
            const keyPrefix = this.keyPrefix();
            settings.writeBuffer(keyPrefix + "data", this.serialize());
            settings.writeString(keyPrefix + "name", this.name);
        }

        load(id: number) {
            this.id = id;
            const keyPrefix = this.keyPrefix();
            this.name = settings.readString(keyPrefix + "name");
            this.deserialize(settings.readBuffer(keyPrefix + "data"));
        }

        serialize() {
            const out = control.createBuffer(2 + 1 + this.def.buf.length);

            out.setNumber(NumberFormat.UInt16LE, 0, this.id);
            out.setNumber(NumberFormat.UInt8LE, 2, this.iconIndex);
            out.write(3, this.def.buf);

            return out;
        }

        deserialize(buf: Buffer) {
            this.id = buf.getNumber(NumberFormat.UInt16LE, 0);
            this.iconIndex = buf.getNumber(NumberFormat.UInt8LE, 2);
            this.def = new music.sequencer.Instrument();
            this.def.buf = buf.slice(3);
        }

        protected keyPrefix(): string {
            return "I-" + this.id + "-";
        }
    }

    export class Pattern {
        measures: number;
        notes: NoteEvent[];

        constructor() {
            this.measures = 2;
            this.notes = [];
        }

        getNoteEventAtTick(tick: number): NoteEvent {
            for (const note of this.notes) {
                if (note.startTick <= tick && note.endTick > tick) {
                    return note;
                }
            }

            return undefined;
        }

        sortNotes() {
            this.notes.sort((a, b) => a.startTick - b.startTick);
        }

        clone(): Pattern {
            const cloned = new Pattern();
            cloned.measures = this.measures;
            cloned.notes = this.notes.map(note => note.clone());
            return cloned;
        }
    }

    export class NoteBendEvent {
        constructor(
            public tick: number,
            public offset: number
        ) {}

        clone(): NoteBendEvent {
            return new NoteBendEvent(this.tick, this.offset);
        }
    }

    export class NoteEvent {
        notes: number[] = [];
        pitchBend: NoteBendEvent[];
        startTick: number;
        endTick: number;

        constructor() {
            this.notes = [];
            this.pitchBend = [];
            this.startTick = 0;
            this.endTick = 0;
        }

        getOffsetAtTick(tick: number): number {
            if (this.pitchBend.length === 0) {
                return 0;
            }

            for (let i = 0; i < this.pitchBend.length; i++) {
                const event = this.pitchBend[i];

                if (event.tick === tick) {
                    return event.offset;
                }

                if (event.tick > tick) {
                    if (i === 0) {
                        return 0;
                    }
                    else {
                        const prevEvent = this.pitchBend[i - 1];
                        const offsetDiff = event.offset - prevEvent.offset;
                        const tickProgress = (tick - prevEvent.tick) / (event.tick - prevEvent.tick);

                        return prevEvent.offset + offsetDiff * tickProgress;
                    }
                }
            }

            return this.pitchBend[this.pitchBend.length - 1].offset;
        }

        sortBendEvents() {
            this.pitchBend.sort((a, b) => a.tick - b.tick);
        }

        clone(): NoteEvent {
            const cloned = new NoteEvent();
            cloned.notes = this.notes.slice(0);
            cloned.startTick = this.startTick;
            cloned.endTick = this.endTick;
            cloned.pitchBend = this.pitchBend.map(bend => bend.clone());
            return cloned;
        }

        render(instrument: Instrument, song: Song): Buffer[] {
            const result: Buffer[] = [];

            const gateLength = song.ticksToMs(this.endTick - this.startTick);

            for (const note of this.notes) {
                const frequency = music.lookupFrequency(note);
                const pitchBend = this.pitchBend.map(bend => {
                    return new PitchBendOffset(
                        song.ticksToMs(bend.tick - this.startTick),
                        bend.offset
                    );
                })

                result.push(
                    renderInstrument(
                        instrument.def,
                        frequency,
                        gateLength,
                        pitchBend,
                        music.volume()
                    )
                );
            }

            return result;
        }

        play(instrument: Instrument, song: Song) {
            const buffers = this.render(instrument, song);

            for (const buffer of buffers) {
                music.playInstructions(0, buffer);
            }
        }
    }
}