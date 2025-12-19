namespace SpriteKind {
    export const InstrumentEditor = SpriteKind.create();
    export const InstrumentEditorComponent = SpriteKind.create();
}

namespace piano {
    export enum InstrumentEditorPage {
        Overview,
        AmpEnvelope,
        PitchEnvelope,
        AmpLFO,
        PitchLFO
    }

    const waveforms = [
        3,  // sine
        1,  // triangle
        2,  // sawtooth
        15, // square (50%)
        14, // square (40%)
        13, // square (30%)
        12, // square (20%)
        11, // square (10%)
        4,  // tunable noise
        16, // cycle 16
        17, // cycle 32
        18, // cycle 64
        5,  // white noise
    ];

    export class InstrumentEditor extends ui.BaseComponent {
        activeComponents: ui.BaseComponent[] = [];
        activeParameters: ui.Parameter[] = [];
        currentPage: InstrumentEditorPage | null = null;
        backCallback: () => void;

        constructor(public instrument: piano.Instrument) {
            super(SpriteKind.InstrumentEditor);

            this.setDimensions(160, 120);
            this.left = 0;
            this.top = 0;

            this.openPage(InstrumentEditorPage.Overview);
        }

        openPage(page: InstrumentEditorPage) {
            if (this.currentPage !== null) {
                this.saveCurrentPage();
            }

            for (const component of this.activeComponents) {
                component.destroy();
            }

            this.activeComponents = [];
            this.activeParameters = [];

            this.currentPage = page;

            switch (page) {
                case InstrumentEditorPage.Overview:
                    this.openOverviewPage();
                    break;
                case InstrumentEditorPage.AmpEnvelope:
                    this.addBackButton();
                    this.openEnvelopePage(this.instrument.def.ampEnvelope);
                    break;
                case InstrumentEditorPage.PitchEnvelope:
                    this.addBackButton();
                    this.openEnvelopePage(this.instrument.def.pitchEnvelope, true);
                    break;
                case InstrumentEditorPage.AmpLFO:
                    this.addBackButton();
                    this.openLFOPage(this.instrument.def.ampLFO, false);
                    break;
                case InstrumentEditorPage.PitchLFO:
                    this.addBackButton();
                    this.openLFOPage(this.instrument.def.pitchLFO, true);
                    break;
            }

            for (const component of this.activeComponents) {
                component.z += this.z
            }
        }

        draw(left: number, top: number) {
            screen.fillRect(left, top, this.width, this.height, 15);
        }

        protected openOverviewPage() {
            const iconSelector = new ui.IconSelectorComponent(
                ui.getInstrumentIcons(),
                undefined,
                SpriteKind.InstrumentEditorComponent
            );

            const backButton = new ui.ButtonComponent("Back", ui.backArrow);
            backButton.left = 4;
            backButton.top = 2;
            backButton.onClick(() => {
                if (this.backCallback) {
                    this.backCallback();
                }
            });
            this.activeComponents.push(backButton);


            iconSelector.left = 100;
            iconSelector.top = 22;
            iconSelector.param.value = this.instrument.iconIndex;
            this.activeComponents.push(iconSelector);
            this.activeParameters.push(iconSelector.param);

            const iconText = new ui.ButtonComponent("Icon");
            iconText.left = 4;
            iconText.y = iconSelector.y;
            this.activeComponents.push(iconText);

            const waveformSelector = new ui.IconSelectorComponent(
                ui.getWaveformIcons(),
                waveforms,
                SpriteKind.InstrumentEditorComponent
            );

            waveformSelector.left = 100;
            waveformSelector.top = iconSelector.bottom + 4;
            waveformSelector.param.value = this.instrument.def.waveform;
            this.activeComponents.push(waveformSelector);
            this.activeParameters.push(waveformSelector.param);

            const waveformText = new ui.ButtonComponent("Waveform");
            waveformText.left = 4;
            waveformText.y = waveformSelector.y;
            this.activeComponents.push(waveformText);

            const ampEnvButton = new ui.ButtonComponent("Volume Envelope");
            ampEnvButton.left = 4;
            ampEnvButton.top = waveformSelector.bottom + 8;
            ampEnvButton.onClick(() => {
                this.openPage(InstrumentEditorPage.AmpEnvelope);
            });
            this.activeComponents.push(ampEnvButton);

            const pitchEnvButton = new ui.ButtonComponent("Pitch Envelope");
            pitchEnvButton.left = 4;
            pitchEnvButton.top = ampEnvButton.bottom + 4;
            pitchEnvButton.onClick(() => {
                this.openPage(InstrumentEditorPage.PitchEnvelope);
            });
            this.activeComponents.push(pitchEnvButton);

            const ampLFOButton = new ui.ButtonComponent("Volume LFO (Tremolo)");
            ampLFOButton.left = 4;
            ampLFOButton.top = pitchEnvButton.bottom + 4;
            ampLFOButton.onClick(() => {
                this.openPage(InstrumentEditorPage.AmpLFO);
            });
            this.activeComponents.push(ampLFOButton);

            const pitchLFOButton = new ui.ButtonComponent("Pitch LFO (Vibrato)");
            pitchLFOButton.left = 4;
            pitchLFOButton.top = ampLFOButton.bottom + 4;
            pitchLFOButton.onClick(() => {
                this.openPage(InstrumentEditorPage.PitchLFO);
            });
            this.activeComponents.push(pitchLFOButton);
        }

        protected addBackButton() {
            const backButton = new ui.ButtonComponent(
                "Back",
                ui.backArrow
            );
            backButton.left = 4;
            backButton.top = 2;
            backButton.onClick(() => {
                this.saveCurrentPage();
                this.openPage(InstrumentEditorPage.Overview);
            });

            this.activeComponents.push(backButton);
        }

        protected openEnvelopePage(envelope: music.sequencer.Envelope, isPitch: boolean = false) {
            const adsrGraph = new ui.ADSRGraph(SpriteKind.InstrumentEditor);
            adsrGraph.setDimensions(152, adsrGraph.height - (isPitch ? 10 : 0));
            adsrGraph.left = 4;
            adsrGraph.top = 14;
            this.activeComponents.push(adsrGraph);

            adsrGraph.attack.value = envelope.attack;
            adsrGraph.decay.value = envelope.decay;
            adsrGraph.sustain.value = envelope.sustain;
            adsrGraph.release.value = envelope.release;

            const sliderParams = [
                adsrGraph.attack,
                adsrGraph.decay,
                adsrGraph.sustain,
                adsrGraph.release
            ];

            if (isPitch) {
                sliderParams.push(new ui.Parameter(
                    "Semitones",
                    envelope.amplitude,
                    0,
                    1024,
                    ui.ParameterDisplayMode.Semitone,
                    )
                );
            }

            const slidersComponents = ui.createSliders(sliderParams, SpriteKind.InstrumentEditor);

            let top = adsrGraph.bottom + 4;
            for (const component of slidersComponents) {
                component.top += top;
                this.activeComponents.push(component);
            }

            this.activeParameters = sliderParams
        }

        protected openLFOPage(lfo: music.sequencer.LFO, isPitch: boolean) {
            let depth: ui.Parameter

            if (isPitch) {
                depth = new ui.Parameter(
                    "Semitones",
                    lfo.amplitude,
                    0,
                    1024,
                    ui.ParameterDisplayMode.Semitone,
                    null,
                    10
                )
            }
            else {
                depth = new ui.Parameter(
                    "Depth",
                    lfo.amplitude,
                    0,
                    1024,
                    ui.ParameterDisplayMode.Percentage,
                    null,
                    1024 / 100
                )
            }

            const lfoGraph = new ui.LFOGraphComponent(depth, SpriteKind.InstrumentEditor);
            lfoGraph.setDimensions(152, lfoGraph.height);
            lfoGraph.left = 4;
            lfoGraph.top = 14;
            this.activeComponents.push(lfoGraph);

            lfoGraph.frequency.value = lfo.frequency / 10;

            const slidersComponents = ui.createSliders([
                lfoGraph.frequency,
                lfoGraph.depth
            ], SpriteKind.InstrumentEditor);

            let top = lfoGraph.bottom + 4;
            for (const component of slidersComponents) {
                component.top += top;
                this.activeComponents.push(component);
            }

            this.activeParameters = [
                lfoGraph.frequency,
                lfoGraph.depth
            ];
        }

        saveCurrentPage() {
            switch (this.currentPage) {
                case InstrumentEditorPage.Overview:
                    this.instrument.iconIndex = this.activeParameters[0].value;
                    this.instrument.def.waveform = this.activeParameters[1].value;
                    break;
                case InstrumentEditorPage.AmpEnvelope:
                    this.instrument.def.ampEnvelope.attack = this.activeParameters[0].value;
                    this.instrument.def.ampEnvelope.decay = this.activeParameters[1].value;
                    this.instrument.def.ampEnvelope.sustain = this.activeParameters[2].value;
                    this.instrument.def.ampEnvelope.release = this.activeParameters[3].value;
                    break;
                case InstrumentEditorPage.PitchEnvelope:
                    this.instrument.def.pitchEnvelope.attack = this.activeParameters[0].value;
                    this.instrument.def.pitchEnvelope.decay = this.activeParameters[1].value;
                    this.instrument.def.pitchEnvelope.sustain = this.activeParameters[2].value;
                    this.instrument.def.pitchEnvelope.release = this.activeParameters[3].value;
                    this.instrument.def.pitchEnvelope.amplitude = this.activeParameters[4].value;
                    break;
                case InstrumentEditorPage.AmpLFO:
                    this.instrument.def.ampLFO.frequency = this.activeParameters[0].value * 10;
                    this.instrument.def.ampLFO.amplitude = this.activeParameters[1].value;
                    break;
                case InstrumentEditorPage.PitchLFO:
                    this.instrument.def.pitchLFO.frequency = this.activeParameters[0].value * 10;
                    this.instrument.def.pitchLFO.amplitude = this.activeParameters[1].value;
                    break;
            }
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            this.saveCurrentPage();
            super.destroy(effect, duration);

            for (const component of this.activeComponents) {
                component.destroy();
            }
            this.activeComponents = [];
            this.activeParameters = [];
            this.currentPage = null;
        }
    }
}