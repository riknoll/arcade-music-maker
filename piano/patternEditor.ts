namespace SpriteKind {
    export const PatternEditorComponent = SpriteKind.create();
}

namespace piano {
    const TOP_BAR_HEIGHT = 12;

    export class PatternEditor extends ui.BaseComponent {
        measureGrid: MeasureGridComponent;
        piano: PianoComponent;
        scrollbar: ui.ScrollbarComponent;
        playButton: ui.ButtonComponent;
        backButton: ui.ButtonComponent;
        instrumentButton: ui.ButtonComponent;

        yScroll = 0;
        xScroll = 0;

        constructor(protected metrics: dimensions.Metrics, protected song: Song, protected trackIndex: number, protected patternIndex: number, kind?: number) {
            super(kind);

            this.setDimensions(
                160,
                120
            );
            this.left = 0;
            this.top = 0;



            this.scrollbar = new ui.ScrollbarComponent(
                metrics.octaveHeight * 8,
                this.height - TOP_BAR_HEIGHT,
                SpriteKind.PatternEditorComponent
            );
            this.scrollbar.left = this.right - this.scrollbar.width;
            this.scrollbar.top = TOP_BAR_HEIGHT;
            this.scrollbar.z = 2;

            this.piano = new PianoComponent(this.metrics, this.scrollbar.scroll, SpriteKind.PatternEditorComponent);
            this.piano.left = 0;
            this.piano.top = TOP_BAR_HEIGHT;
            this.piano.setDimensions(this.piano.width, this.height - TOP_BAR_HEIGHT);

            this.measureGrid = new MeasureGridComponent(this.metrics, song, trackIndex, patternIndex, this.scrollbar.scroll, SpriteKind.PatternEditorComponent);
            this.measureGrid.setDimensions(this.measureGrid.width, this.height - TOP_BAR_HEIGHT);
            this.measureGrid.top = TOP_BAR_HEIGHT;
            this.measureGrid.left = this.piano.right;

            this.backButton = new ui.ButtonComponent(null, ui.backArrow, SpriteKind.PatternEditorComponent);
            this.backButton.left = 2;
            this.backButton.top = 1;
            this.backButton.z = 6;

            this.playButton = new ui.ButtonComponent(null, ui.playIcon, SpriteKind.PatternEditorComponent);
            this.playButton.left = this.backButton.right + 2;
            this.playButton.top = 1;
            this.playButton.z = 6;

            this.playButton.onClick(() => {
                music.stopAllSounds();
                if (this.song.player) {
                    this.song.player.dispose();
                    this.playButton.icon = ui.playIcon
                }
                else {
                    const player = new piano.SongPlayer();
                    player.playSong(this.song);
                    this.playButton.icon = ui.pauseIcon
                }
            })

            this.instrumentButton = new ui.ButtonComponent(null, ui.trumpetIcon, SpriteKind.PatternEditorComponent);
            this.instrumentButton.left = this.playButton.right + 2;
            this.instrumentButton.top = 1;
            this.instrumentButton.z = 6;

            this.instrumentButton.onClick(() => {
                if (this.song.player) {
                    this.song.player.dispose();
                    this.playButton.icon = ui.playIcon
                }

                this.setDisabled(true);

                const instrument = this.song.tracks[this.trackIndex].instrument;
                const editor = new piano.InstrumentEditor(instrument);
                editor.z = 10;
                editor.openPage(piano.InstrumentEditorPage.Overview);
                editor.backCallback = () => {
                    editor.destroy();
                    this.setDisabled(false);
                }

            })

            this.z = 5;
        }

        draw(drawLeft: number, drawTop: number): void {
            screen.fillRect(drawLeft, drawTop, this.width, TOP_BAR_HEIGHT, 11);
            screen.fillRect(drawLeft, drawTop + TOP_BAR_HEIGHT - 1, this.width, 1, 15);
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);
            this.measureGrid.destroy();
            this.piano.destroy();
            this.scrollbar.destroy();
            this.playButton.destroy();
            this.backButton.destroy();
            this.instrumentButton.destroy();
        }

        setDisabled(disabled: boolean) {
            this.backButton.disabled = disabled;
            this.playButton.disabled = disabled;
            this.instrumentButton.disabled = disabled;
            this.measureGrid.disabled = disabled;
            this.piano.disabled = disabled;
            this.scrollbar.disabled = disabled;
        }
    }
}