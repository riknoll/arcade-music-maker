namespace piano {

    export function getBuiltinInstument(id: number): Instrument {
        const instrument = new Instrument();
        instrument.def.ampEnvelope.amplitude = 1024;
        instrument.def.pitchEnvelope.amplitude = 512;
        instrument.def.ampLFO.frequency = 10;
        instrument.def.pitchLFO.amplitude = 512;
        instrument.def.pitchLFO.frequency = 10;

        switch (id) {
            case 0:
                instrument.id = 0;
                instrument.iconIndex = 19;
                instrument.name = "Dog";
                instrument.def.waveform = 1;
                instrument.def.octave = 4;
                instrument.def.ampEnvelope.attack = 10;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 500;
                instrument.def.ampEnvelope.release = 100;
                instrument.def.ampEnvelope.amplitude = 1024;
                return instrument;
            case 1:
                instrument.id = 1;
                instrument.iconIndex = 12;
                instrument.name = "Duck";
                instrument.def.waveform = 15;
                instrument.def.octave = 4;
                instrument.def.ampEnvelope.attack = 5;
                instrument.def.ampEnvelope.decay = 530;
                instrument.def.ampEnvelope.sustain = 705;
                instrument.def.ampEnvelope.release = 450;
                instrument.def.ampEnvelope.amplitude = 1024;
                instrument.def.pitchEnvelope.attack = 5;
                instrument.def.pitchEnvelope.decay = 40;
                instrument.def.pitchEnvelope.sustain = 0;
                instrument.def.pitchEnvelope.release = 100;
                instrument.def.pitchEnvelope.amplitude = ui.semitonesToModAmplitude(1);
                instrument.def.ampLFO.frequency = 30;
                instrument.def.ampLFO.amplitude = 20;
                instrument.def.pitchLFO.frequency = 60;
                instrument.def.pitchLFO.amplitude = ui.semitonesToModAmplitude(0.2);
                return instrument;
            case 2:
                instrument.id = 2;
                instrument.iconIndex = 18;
                instrument.name = "Cat";
                instrument.def.waveform = 12;
                instrument.def.octave = 5;
                instrument.def.ampEnvelope.attack = 150;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 365;
                instrument.def.ampEnvelope.release = 400;
                instrument.def.ampEnvelope.amplitude = 1024;
                instrument.def.pitchEnvelope.attack = 120;
                instrument.def.pitchEnvelope.decay = 300;
                instrument.def.pitchEnvelope.sustain = 0;
                instrument.def.pitchEnvelope.release = 100;
                instrument.def.pitchEnvelope.amplitude = ui.semitonesToModAmplitude(0.1);
                instrument.def.pitchLFO.frequency = 100;
                instrument.def.pitchLFO.amplitude = ui.semitonesToModAmplitude(0.5);
                return instrument;
            case 3:
                instrument.id = 3;
                instrument.iconIndex = 17;
                instrument.name = "Fish";
                instrument.def.waveform = 1;
                instrument.def.octave = 3;
                instrument.def.ampEnvelope.attack = 220;
                instrument.def.ampEnvelope.decay = 105;
                instrument.def.ampEnvelope.sustain = 1024;
                instrument.def.ampEnvelope.release = 350;
                instrument.def.ampEnvelope.amplitude = 1024;
                instrument.def.ampLFO.frequency = 50;
                instrument.def.ampLFO.amplitude = 100;
                instrument.def.pitchLFO.frequency = 10;
                instrument.def.pitchLFO.amplitude = ui.semitonesToModAmplitude(0.4);
                return instrument;
            case 4:
                instrument.id = 4;
                instrument.iconIndex = 32;
                instrument.name = "Car";
                instrument.def.waveform = 16;
                instrument.def.octave = 4;
                instrument.def.ampEnvelope.attack = 5;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 1024;
                instrument.def.ampEnvelope.release = 30;
                instrument.def.ampEnvelope.amplitude = 1024;
                instrument.def.pitchLFO.frequency = 100;
                instrument.def.pitchLFO.amplitude = ui.semitonesToModAmplitude(0.4);
                return instrument;
            case 5:
                instrument.id = 5;
                instrument.iconIndex = 20;
                instrument.name = "Computer";
                instrument.def.waveform = 15;
                instrument.def.octave = 2;
                instrument.def.ampEnvelope.attack = 10;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 500;
                instrument.def.ampEnvelope.release = 10;
                instrument.def.ampEnvelope.amplitude = 1024;
                return instrument;
            case 6:
                instrument.id = 6;
                instrument.iconIndex = 0;
                instrument.name = "Burger";
                instrument.def.waveform = 1;
                instrument.def.octave = 2;
                instrument.def.ampEnvelope.attack = 10;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 500;
                instrument.def.ampEnvelope.release = 100;
                instrument.def.ampEnvelope.amplitude = 1024;
                return instrument;
            case 7:
                instrument.id = 7;
                instrument.iconIndex = 10;
                instrument.name = "Cherry";
                instrument.def.waveform = 2;
                instrument.def.octave = 3;
                instrument.def.ampEnvelope.attack = 10;
                instrument.def.ampEnvelope.decay = 100;
                instrument.def.ampEnvelope.sustain = 500;
                instrument.def.ampEnvelope.release = 100;
                instrument.def.ampEnvelope.amplitude = 1024;
                return instrument;
            case 8:
                instrument.id = 8;
                instrument.iconIndex = 3;
                instrument.name = "Lemon";
                instrument.def.waveform = 14;
                instrument.def.octave = 2;
                instrument.def.ampEnvelope.attack = 5;
                instrument.def.ampEnvelope.decay = 70;
                instrument.def.ampEnvelope.sustain = 870;
                instrument.def.ampEnvelope.release = 50;
                instrument.def.ampEnvelope.amplitude = 1024;
                instrument.def.pitchEnvelope.attack = 10;
                instrument.def.pitchEnvelope.decay = 45;
                instrument.def.pitchEnvelope.sustain = 0;
                instrument.def.pitchEnvelope.release = 100;
                instrument.def.pitchEnvelope.amplitude = ui.semitonesToModAmplitude(1);
                instrument.def.ampLFO.frequency = 10;
                instrument.def.ampLFO.amplitude = 50;
                instrument.def.pitchLFO.frequency = 20;
                instrument.def.pitchLFO.amplitude = ui.semitonesToModAmplitude(0.1);
                return instrument;
            default:
                return null;
        }
    }
}