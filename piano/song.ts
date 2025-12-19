namespace piano {
    /**
     * Byte encoding format for songs
     *
     * song(8 + length of all tracks bytes)
     *     0 version
     *     1 beats per minute
     *     3 beats per measure
     *     4 ticks per beat
     *     5 measures per pattern
     *     6 sequence length
     *     7 number of tracks
     *     ...tracks
     *
     * track(9 + instrument length + patterns length + sequence length bytes)
     *     0 id
     *     1 flags
     *     2 instrument byte length
     *     4...instrument
     *     pattern byte length (2 bytes)
     *     ...patterns
     *     sequence length (1 byte)
     *     ...sequence (1 byte each)
     *
     * instrument (3 + instrument def length bytes)
     *     0 id
     *     2 icon index
     *     3...instrument def
     *
     * instrument def (28 bytes)
     *     0 waveform
     *     1 amp attack
     *     3 amp decay
     *     5 amp sustain
     *     7 amp release
     *     9 amp amp
     *     11 pitch attack
     *     13 pitch decay
     *     15 pitch sustain
     *     17 pitch release
     *     19 pitch amp
     *     21 amp lfo freq
     *     22 amp lfo amp
     *     24 pitch lfo freq
     *     25 pitch lfo amp
     *     27 octave
     *
     * pattern (2 + note event length bytes)
     *    0 note event byte length
     *    2...note events
     *
     * drum(5 + 7 * steps bytes)
     *     0 steps
     *     1 start freq
     *     3 start amp
     *     5...steps
     *
     * drum step(7 bytes)
     *     0 waveform
     *     1 freq
     *     3 volume
     *     5 duration
     *
     * note event(6 + 1 * polyphony bytes + 3 * pitch bend event count bytes)
     *     0 start tick
     *     2 end tick
     *     4 polyphony
     *     5...notes (1 byte each)
     *     5 + n pitch bend event count
     *    ...pitch bend events
     *
     * pitch bend event(3 bytes)
     *    0 tick
     *    2 offset + 64
     *
     */
    export class Song {
        tracks: Track[];
        tempo: number;
        ticksPerBeat: number;
        beatsPerMeasure: number;
        measuresPerPattern: number;
        sequenceLength: number;
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
            this.measuresPerPattern = 2;
            this.sequenceLength = 4;
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

        serialize(): Buffer {
            let tracksLength = 0;
            const trackBuffers: Buffer[] = [];

            for (const track of this.tracks) {
                const trackBuf = track.serialize();
                trackBuffers.push(trackBuf);
                tracksLength += trackBuf.length;
            }

            const buf = control.createBuffer(8 + tracksLength);
            buf.setNumber(NumberFormat.UInt8LE, 0, 1); // version
            buf.setNumber(NumberFormat.UInt16LE, 1, this.tempo);
            buf.setNumber(NumberFormat.UInt8LE, 3, this.beatsPerMeasure);
            buf.setNumber(NumberFormat.UInt8LE, 4, this.ticksPerBeat);
            buf.setNumber(NumberFormat.UInt8LE, 5, this.measuresPerPattern);
            buf.setNumber(NumberFormat.UInt8LE, 6, this.sequenceLength);
            buf.setNumber(NumberFormat.UInt8LE, 7, this.tracks.length);

            let offset = 8;
            for (const trackBuf of trackBuffers) {
                buf.write(offset, trackBuf);
                offset += trackBuf.length;
            }

            return buf;
        }
    }

    export class Track {
        static deserialize(buf: Buffer): Track {
            const out = new Track(null);

            const id = buf.getNumber(NumberFormat.UInt8LE, 0);
            const instrumentLength = buf.getNumber(NumberFormat.UInt16LE, 2);
            const instrumentBuf = buf.slice(4, instrumentLength);
            out.instrument = Instrument.deserialize(instrumentBuf);

            let offset = 4 + instrumentLength;
            const patternsLength = buf.getNumber(NumberFormat.UInt16LE, offset);
            offset += 2;
            const patternsEnd = offset + patternsLength;

            out.patterns = [];
            while (offset < patternsEnd) {
                const fullPatternBuf = buf.slice(offset, Pattern.byteLengthAtOffset(buf, offset));
                const pattern = Pattern.deserialize(fullPatternBuf);
                out.patterns.push(pattern);
                offset += fullPatternBuf.length;
            }

            const sequenceLength = buf.getNumber(NumberFormat.UInt8LE, offset);
            out.sequence = [];
            offset += 1;

            for (let i = 0; i < sequenceLength; i++) {
                const patternIndex = buf.getNumber(NumberFormat.UInt8LE, offset + i);
                out.sequence.push(patternIndex);
            }

            return out;
        }

        instrument: Instrument;
        patterns: Pattern[] = [];
        sequence: number[] = [];

        constructor(instrument: Instrument) {
            this.instrument = instrument;
            this.patterns.push(new Pattern());
            this.sequence = [0, 0, 0, 0];
        }

        serialize(): Buffer {
            let patternLength = 0;
            let allPatterns: Buffer[] = [];

            for (const pattern of this.patterns) {
                const serialized = pattern.serialize();
                allPatterns.push(serialized);
                patternLength += serialized.length;
            }

            const instrumentBuf = this.instrument.serialize();

            const buf = control.createBuffer(
                1 + // track id
                1 + // flags
                2 + // instrument byte length
                instrumentBuf.length +
                2 + // patterns byte length
                patternLength +
                1 + // sequence length
                this.sequence.length
            );

            buf.setNumber(NumberFormat.UInt8LE, 0, this.instrument.id);
            buf.setNumber(NumberFormat.UInt8LE, 1, 0); // flags
            buf.setNumber(NumberFormat.UInt16LE, 2, instrumentBuf.length);
            buf.write(4, instrumentBuf);

            let offset = 4 + instrumentBuf.length;
            buf.setNumber(NumberFormat.UInt16LE, offset, patternLength);
            offset += 2;

            for (const patternBuf of allPatterns) {
                buf.write(offset, patternBuf);
                offset += patternBuf.length;
            }

            buf.setNumber(NumberFormat.UInt8LE, offset, this.sequence.length);
            offset += 1;

            for (let i = 0; i < this.sequence.length; i++) {
                buf.setNumber(NumberFormat.UInt8LE, offset + i, this.sequence[i]);
            }

            return buf;
        }
    }

    export class Instrument {
        static deserialize(buf: Buffer): Instrument {
            const instrument = new Instrument();
            instrument.id = buf.getNumber(NumberFormat.UInt16LE, 0);
            instrument.iconIndex = buf.getNumber(NumberFormat.UInt8LE, 2);
            instrument.def = new music.sequencer.Instrument();
            instrument.def.buf = buf.slice(3);
            return instrument;
        }

        static load(id: number): Instrument {
            const keyPrefix = Instrument.keyPrefix(id);
            const dataBuf = settings.readBuffer(keyPrefix + "data");

            if (dataBuf) {
                const out = Instrument.deserialize(dataBuf);
                out.name = settings.readString(keyPrefix + "name");
                return out;
            }

            return undefined;
        }

        protected static keyPrefix(id: number): string {
            return "I-" + id + "-";
        }

        id: number;
        iconIndex: number;
        name: string;
        def: music.sequencer.Instrument;

        constructor() {
            this.def = new music.sequencer.Instrument();
        }

        save() {
            const keyPrefix = Instrument.keyPrefix(this.id);
            settings.writeBuffer(keyPrefix + "data", this.serialize());
            settings.writeString(keyPrefix + "name", this.name);
        }

        serialize() {
            const out = control.createBuffer(2 + 1 + this.def.buf.length);

            out.setNumber(NumberFormat.UInt16LE, 0, this.id);
            out.setNumber(NumberFormat.UInt8LE, 2, this.iconIndex);
            out.write(3, this.def.buf);

            return out;
        }
    }

    export class Pattern {
        static byteLengthAtOffset(buf: Buffer, offset: number): number {
            const noteEventLength = buf.getNumber(NumberFormat.UInt16LE, offset);
            return 2 + noteEventLength;
        }

        static deserialize(buf: Buffer): Pattern {
            const pattern = new Pattern();
            const noteEventLength = buf.getNumber(NumberFormat.UInt16LE, 0);
            let offset = 2;

            while (offset < 2 + noteEventLength) {
                const noteEventBuf = buf.slice(offset, NoteEvent.byteLengthAtOffset(buf, offset));
                const noteEvent = NoteEvent.deserialize(noteEventBuf);
                pattern.notes.push(noteEvent);
                offset += noteEventBuf.length;
            }

            return pattern;
        }

        notes: NoteEvent[];

        constructor() {
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
            cloned.notes = this.notes.map(note => note.clone());
            return cloned;
        }

        serialize(): Buffer {
            const noteBuffers: Buffer[] = [];
            let totalLength = 0;

            for (const note of this.notes) {
                const noteBuf = note.serialize();
                noteBuffers.push(noteBuf);
                totalLength += noteBuf.length;
            }

            const buf = control.createBuffer(2 + totalLength);
            buf.setNumber(NumberFormat.UInt16LE, 0, totalLength);

            let offset = 2;
            for (const noteBuf of noteBuffers) {
                buf.write(offset, noteBuf);
                offset += noteBuf.length;
            }

            return buf;
        }
    }

    export class NoteBendEvent {
        static deserialize(buf: Buffer): NoteBendEvent {
            const tick = buf.getNumber(NumberFormat.UInt16LE, 0);
            const offset = buf.getNumber(NumberFormat.Int8LE, 2) - 64;
            return new NoteBendEvent(tick, offset);
        }

        constructor(
            public tick: number,
            public offset: number
        ) {}

        clone(): NoteBendEvent {
            return new NoteBendEvent(this.tick, this.offset);
        }

        serialize(): Buffer {
            const buf = control.createBuffer(3);
            buf.setNumber(NumberFormat.UInt16LE, 0, this.tick);
            buf.setNumber(NumberFormat.Int8LE, 2, this.offset + 64);
            return buf;
        }
    }

    export class NoteEvent {
        static deserialize(buf: Buffer): NoteEvent {
            const noteEvent = new NoteEvent();
            noteEvent.startTick = buf.getNumber(NumberFormat.UInt16LE, 0);
            noteEvent.endTick = buf.getNumber(NumberFormat.UInt16LE, 2);
            const polyphony = buf.getNumber(NumberFormat.UInt8LE, 4);
            let offset = 5;

            for (let i = 0; i < polyphony; i++) {
                const note = buf.getNumber(NumberFormat.UInt8LE, offset);
                noteEvent.notes.push(note);
                offset += 1;
            }

            const pitchBendCount = buf.getNumber(NumberFormat.UInt8LE, offset);
            offset += 1;

            for (let i = 0; i < pitchBendCount; i++) {
                const bendBuf = buf.slice(offset, 3);
                const bendEvent = NoteBendEvent.deserialize(bendBuf);
                noteEvent.pitchBend.push(bendEvent);
                offset += 3;
            }

            return noteEvent;
        }

        static byteLengthAtOffset(buf: Buffer, offset: number): number {
            const polyphony = buf.getNumber(NumberFormat.UInt8LE, offset + 4);
            const pitchBendCount = buf.getNumber(NumberFormat.UInt8LE, offset + 5 + polyphony);
            return 6 + polyphony + (3 * pitchBendCount);
        }

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

        serialize(): Buffer {
            const buf = control.createBuffer(6 + this.notes.length + this.pitchBend.length * 3);
            buf.setNumber(NumberFormat.UInt16LE, 0, this.startTick);
            buf.setNumber(NumberFormat.UInt16LE, 2, this.endTick);
            buf.setNumber(NumberFormat.UInt8LE, 4, this.notes.length);

            let offset = 5;
            for (const note of this.notes) {
                buf.setNumber(NumberFormat.UInt8LE, offset, note);
                offset += 1;
            }

            buf.setNumber(NumberFormat.UInt8LE, offset, this.pitchBend.length);
            offset += 1;

            for (const bend of this.pitchBend) {
                const bendBuf = bend.serialize();
                buf.write(offset, bendBuf);
                offset += bendBuf.length;
            }

            return buf;
        }
    }
}