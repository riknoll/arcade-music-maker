// const test = new ui.ADSRGraph();
// test.setDimensions(152, test.height)
// test.left = 4;
// test.top = 10;

// controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
//     test.attack.value += 100
// })

// const components = ui.createSliders([
//     test.attack,
//     test.decay,
//     test.sustain,
//     test.release
// ]);

// for (const component of components) {
//     component.top += test.bottom + 4;
// }

// const instrument = new piano.Instrument();
// instrument.id = 0;
// instrument.name = "Test Instrument";
// instrument.iconIndex = 0;
// instrument.def = new music.sequencer.Instrument();
// instrument.def.waveform = 1;

// const editor = new piano.InstrumentEditor(instrument)

const testSong = new piano.Song();
const metrics = new piano.dimensions.Metrics();

const testEvent = new piano.NoteEvent();

testEvent.notes = [0];
testEvent.startTick = 0;
testEvent.endTick = 40;


testEvent.pitchBend = [
    new piano.NoteBendEvent(8, 3),
    new piano.NoteBendEvent(16, 3),
    new piano.NoteBendEvent(24, -1),
    new piano.NoteBendEvent(32, 0)
];

// testSong.tracks[0].patterns[0].notes.push(testEvent);

const patternEditor = new piano.PatternEditor(metrics, testSong, 0, 0);



game.stats = true