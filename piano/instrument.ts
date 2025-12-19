namespace piano {
    const BUFFER_SIZE = 12;
    export const MAX_PITCH_MOD_RANGE = 12;

    export class PitchBendOffset {
        constructor(
            public time: number,
            public frequencyOffset: number
        ) {}
    }

    /**
     * Renders a single note played on an instrument into a buffer of sound instructions.
     *
     * @param instrument The instrument being played
     * @param noteFrequency The frequency of the note being played. In other words, "the key being pressed on the piano"
     * @param gateLength The length of time that the "piano key" is held down in ms. The total duration
     *      of the sound instructions will be longer than this if the amplitude envelope of the
     *      instrument has a nonzero release time
     * @param volume The peak volume of the note to play (0-1024). Also called the "velocity"
     */
    export function renderInstrument(instrument: music.sequencer.Instrument, noteFrequency: number, gateLength: number, pitchBend: PitchBendOffset[], volume: number) {
        // We cut off the sound at the end of the amplitude envelope's release time. This is to prevent
        // the amp envelope from making the sound keep playing forever
        const totalDuration = gateLength + instrument.ampEnvelope.release;

        // Our goal is to calculate the frequency and amplitude at all of the inflection points in this note's lifetime

        // For the ADSR envelopes, the inflection points are:
        //     1. The end of the envelope atack (which is when the decay begins)
        //     2. The end of the envelope decay (which is when the sustain begins)
        //     3. The end of the gateLength (which is when the release begins)
        //     4. The end of the envelope release
        // If the gateLength ends before any of these stages (e.g. it's shorter than the envelope's attack), then
        // we ignore the other stages and go straight to the release stage.

        // For the triangle LFOs, the inflections points occur every time the slope goes from positive to negative. In
        // other words, it's half the period of the triangle wave.

        const ampLFOInterval = instrument.ampLFO.amplitude ? Math.max(500 / instrument.ampLFO.frequency, 50) : 50;
        const pitchLFOInterval = instrument.pitchLFO.amplitude ? Math.max(500 / instrument.pitchLFO.frequency, 50) : 50;
        let pbIndex = 0;

        // We're going to add the timepoints to this array in order so that it doesn't need to be sorted
        let timePoints = [0];

        // For each LFO and envelope, keep track of the next inflection point. If any of the LFOs or envelopes have
        // an amplitude of 0, we can ignore them entirely.
        let nextAETime = instrument.ampEnvelope.attack;
        let nextPETime = instrument.pitchEnvelope.amplitude ? instrument.pitchEnvelope.attack : totalDuration;
        let nextPLTime = instrument.pitchLFO.amplitude ? pitchLFOInterval : totalDuration;
        let nextALTime = instrument.ampLFO.amplitude ? ampLFOInterval : totalDuration;
        let nextPBTime = pitchBend.length > 0 ? pitchBend[0].time : totalDuration;

        let time = 0;
        while (time < totalDuration) {
            // Amp envelope
            if (nextAETime <= nextPETime && nextAETime <= nextPLTime && nextAETime <= nextALTime && nextAETime <= nextPBTime) {
                time = nextAETime;
                timePoints.push(nextAETime);

                // Check if the end of the decay stage is next
                if (time < instrument.ampEnvelope.attack + instrument.ampEnvelope.decay && instrument.ampEnvelope.attack + instrument.ampEnvelope.decay < gateLength) {
                    nextAETime = instrument.ampEnvelope.attack + instrument.ampEnvelope.decay;
                }
                // Then check for the end of the sustain stage
                else if (time < gateLength) {
                    nextAETime = gateLength;
                }
                // Otherwise it must be the end of the release
                else {
                    nextAETime = totalDuration;
                }
            }
            // Pitch envelope
            else if (nextPETime <= nextPLTime && nextPETime <= nextALTime && nextPETime < totalDuration && nextPETime <= nextPBTime) {
                time = nextPETime;
                timePoints.push(nextPETime);

                // Check if the end of the decay stage is next
                if (time < instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay && instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay < gateLength) {
                    nextPETime = instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay;
                }
                // Then check for the end of the sustain stage
                else if (time < gateLength) {
                    nextPETime = gateLength;
                }
                // Otherwise it must be the end of the release
                else if (time < gateLength + instrument.pitchEnvelope.release) {
                    nextPETime = Math.min(totalDuration, gateLength + instrument.pitchEnvelope.release);
                }
                // If we reach the end of the release before the amp envelope is finished, bail out
                else {
                    nextPETime = totalDuration
                }
            }
            // Pitch LFO
            else if (nextPLTime <= nextALTime && nextPLTime < totalDuration && nextPLTime <= nextPBTime) {
                time = nextPLTime;
                timePoints.push(nextPLTime);
                nextPLTime += pitchLFOInterval;
            }
            // Amp LFO
            else if (nextALTime < totalDuration && nextALTime <= nextPBTime) {
                time = nextALTime;
                timePoints.push(nextALTime);
                nextALTime += ampLFOInterval;
            }
            else if (nextPBTime < totalDuration) {
                time = nextPBTime;
                timePoints.push(nextPBTime);
                pbIndex++;
                nextPBTime = pbIndex < pitchBend.length ? pitchBend[pbIndex].time : totalDuration;
            }


            if (time >= totalDuration) {
                break;
            }

            // Now that we've advanced the time, we need to check all of the envelopes/LFOs again
            // to see if any of them also need to be pushed forward (e.g. they had the same inflection point
            // as the one we just added to the array)
            if (nextAETime <= time) {
                if (time < instrument.ampEnvelope.attack + instrument.ampEnvelope.decay && instrument.ampEnvelope.attack + instrument.ampEnvelope.decay < gateLength) {
                    nextAETime = instrument.ampEnvelope.attack + instrument.ampEnvelope.decay;
                }
                else if (time < gateLength) {
                    nextAETime = gateLength;
                }
                else {
                    nextAETime = totalDuration;
                }
            }
            if (nextPETime <= time) {
                if (time < instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay && instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay < gateLength) {
                    nextPETime = instrument.pitchEnvelope.attack + instrument.pitchEnvelope.decay;
                }
                else if (time < gateLength) {
                    nextPETime = gateLength;
                }
                else if (time < gateLength + instrument.pitchEnvelope.release) {
                    nextPETime = Math.min(totalDuration, gateLength + instrument.pitchEnvelope.release);
                }
                else {
                    nextPETime = totalDuration
                }
            }
            if (nextPBTime <= time) {
                pbIndex++;
                nextPBTime = pbIndex < pitchBend.length ? pitchBend[pbIndex].time : totalDuration;
            }
            while (nextALTime <= time) {
                nextALTime += ampLFOInterval;
            }
            while (nextPLTime <= time) {
                nextPLTime += pitchLFOInterval;
            }
        }

        // Once we've calculated the inflection points, calculate the frequency and amplitude at
        // each step and interpolate between them with sound instructions
        let prevAmp = instrumentVolumeAtTime(instrument, gateLength, 0, volume) | 0;
        let prevPitch = instrumentPitchAtTime(instrument, noteFrequency, pitchBend, gateLength, 0) | 0;
        let prevTime = 0;

        let nextAmp: number;
        let nextPitch: number;
        const out = control.createBuffer(BUFFER_SIZE * timePoints.length);
        for (let i = 1; i < timePoints.length; i++) {
            if (timePoints[i] - prevTime < 5) {
                prevTime = timePoints[i];
                continue;
            }

            nextAmp = instrumentVolumeAtTime(instrument, gateLength, timePoints[i], volume) | 0;
            nextPitch = instrumentPitchAtTime(instrument, noteFrequency, pitchBend, gateLength, timePoints[i]) | 0;

            music.addNote(
                out,
                (i - 1) * 12,
                (timePoints[i] - prevTime) | 0,
                prevAmp,
                nextAmp,
                instrument.waveform,
                prevPitch,
                255,
                nextPitch
            )

            prevAmp = nextAmp;
            prevPitch = nextPitch;
            prevTime = timePoints[i];
        }

        // Finally, add one extra step to move the amplitude to 0 without
        // clipping just in case the amp LFO caused it to be nonzero
        music.addNote(
            out,
            (timePoints.length - 1) * 12,
            10,
            prevAmp,
            0,
            instrument.waveform,
            prevPitch,
            255,
            prevPitch
        )
        return out;
    }

    function instrumentPitchAtTime(instrument: music.sequencer.Instrument, noteFrequency: number, pitchBend: PitchBendOffset[], gateLength: number, time: number) {
        let mod = 0;
        if (instrument.pitchEnvelope.amplitude) {
            const pitchAmp = (instrument.pitchEnvelope.amplitude / 1024) * MAX_PITCH_MOD_RANGE;
            mod += (envelopeValueAtTime(instrument.pitchEnvelope, 1024, time, gateLength) / 1024) * pitchAmp;
        }
        if (instrument.pitchLFO.amplitude) {
            const lfoAmp = (instrument.pitchLFO.amplitude / 1024) * MAX_PITCH_MOD_RANGE;
            mod += (lfoValueAtTime(instrument.pitchLFO, instrument.pitchLFO.amplitude, time) / 1024) * lfoAmp;
        }
        mod += pitchBendValueAtTime(pitchBend, time);
        return scaleFrequency(noteFrequency, mod);
    }

    function instrumentVolumeAtTime(instrument: music.sequencer.Instrument, gateLength: number, time: number, maxVolume: number) {
        let mod = 1;
        if (instrument.ampEnvelope.amplitude) {
            mod *= (envelopeValueAtTime(instrument.ampEnvelope, instrument.ampEnvelope.amplitude,time, gateLength) / 1024)
        }
        if (instrument.ampLFO.amplitude) {
            mod *= (1 - (lfoValueAtTime(instrument.ampLFO, instrument.ampLFO.amplitude, time) / 1024))
        }
        return (mod * maxVolume) | 0;
    }

    /**
     * Calculates the value of an ADSR envelope at the given time for a given gate length.
     *
     * @param envelope The ADSR envelope
     * @param time The point and time to calculate the value at
     * @param gateLength The length of time that the "piano key" is held down in ms. The total duration
     *      of the sound instructions will be longer than this if the amplitude envelope of the
     *      instrument has a nonzero release time
     */
    function envelopeValueAtTime(envelope: music.sequencer.Envelope, amplitude: number, time: number, gateLength: number) {
        // ADSR envelopes consist of 4 stages. They are (in order):
        //     1. The attack stage, where the value starts at 0 and rises to the maximum value
        //     2. The decay stage, where the value falls from the maximum value to the sustain value
        //     3. The sustain stage, where the value holds steady at the sustain value until the gate length ends
        //     4. The release stage, where the value falls to 0 after the gate length ends
        // If the gate length ends before the sustain stage, we immediately skip to the release stage. All stages
        // use a linear function for the value
        const adjustedSustain = (envelope.sustain / 1024) * amplitude;

        // First check to see if we are already in the release stage
        if (time > gateLength) {
            if (time - gateLength > envelope.release) return 0;

            // Did the gate length end before the attack stage finished?
            else if (time < envelope.attack) {
                const height = (amplitude / envelope.attack) * gateLength;
                return height - ((height / envelope.release) * (time - gateLength))
            }
            // Did the gate length end before the decay stage finished?
            else if (time < envelope.attack + envelope.decay) {
                const height2 = amplitude - ((amplitude - adjustedSustain) / envelope.decay) * (gateLength - envelope.attack);
                return height2 - ((height2 / envelope.release) * (time - gateLength))
            }
            else {
                return adjustedSustain - (adjustedSustain / envelope.release) * (time - gateLength)
            }
        }
        else if (time < envelope.attack) {
            return (amplitude / envelope.attack) * time
        }
        else if (time < envelope.attack + envelope.decay) {
            return amplitude - ((amplitude - adjustedSustain) / envelope.decay) * (time - envelope.attack)
        }
        else {
            return adjustedSustain;
        }
    }

    /**
     * Calculates the value of the LFO at the given time.
     *
     * TODO: might be nice to give options to shift the phase of the LFO or let it run free
     *
     * @param lfo The LFO to calculate the value of
     * @param time The time to calculate the value at
     */
    function lfoValueAtTime(lfo: music.sequencer.LFO, amplitude: number, time: number) {
        // Use cosine to smooth out the value somewhat
        return ((1 + Math.cos(((time / 1000) * lfo.frequency / 10) * 2 * Math.PI)) / 2) * amplitude
    }

    function pitchBendValueAtTime(pitchBend: PitchBendOffset[], time: number) {
        if (pitchBend.length === 0) {
            return 0;
        }

        // Find the two pitch bend points that the time is between
        let nextPoint = pitchBend[pitchBend.length - 1];
        let prevTime = 0;
        let prevOffset = 0;

        for (let i = 0; i < pitchBend.length; i++) {
            if (pitchBend[i].time > time) {
                if (i > 0) {
                    prevTime = pitchBend[i - 1].time;
                    prevOffset = pitchBend[i - 1].frequencyOffset;
                }
                nextPoint = pitchBend[i];
                break;
            }
        }

        if (nextPoint.time === prevTime) {
            return prevOffset;
        }

        // Linearly interpolate between the two points
        const t = (time - prevTime) / (nextPoint.time - prevTime);
        return prevOffset + t * (nextPoint.frequencyOffset - prevOffset);
    }

    export function printSoundInstructions(buffer: Buffer) {
        for (let i = 0; i < buffer.length; i += 12) {
            const soundWave = buffer.getNumber(NumberFormat.UInt8LE, i);
            const hz = buffer.getNumber(NumberFormat.UInt16LE, i + 2);
            const ms = buffer.getNumber(NumberFormat.UInt16LE, i + 4);
            const beg = buffer.getNumber(NumberFormat.UInt16LE, i + 6);
            const end = buffer.getNumber(NumberFormat.UInt16LE, i + 8);
            const endHz = buffer.getNumber(NumberFormat.UInt16LE, i + 10);

            console.log(`Sound Instruction ${i / 12}: Wave=${soundWave}, Freq=${hz}Hz, Duration=${ms}ms, AmpStart=${beg}, AmpEnd=${end}, FreqEnd=${endHz}Hz`);
        }
    }

    export function scaleFrequency(frequency: number, semitones: number): number {
        return frequency * Math.pow(2, semitones / 12);
    }
}