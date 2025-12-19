namespace piano {
    const SCHEDULE_AHEAD_TICKS = 8;

    export class SongPlayer {
        protected song: Song;
        protected startTime: number;
        protected lastScheduledTick: number;
        protected updateHandler: control.FrameCallback;

        constructor() {
            this.updateHandler = game.currentScene().eventContext.registerFrameHandler(scene.UPDATE_PRIORITY, () => this.update());
        }

        playSong(song: Song) {
            this.song = song;
            this.startTime = control.millis();
            this.lastScheduledTick = -1;
            this.song.player = this;
        }

        getCurrentTick(): number {
            const elapsedMs = control.millis() - this.startTime;
            return this.song.msToTicks(elapsedMs);
        }

        getCurrentPatternTick(): number {
            const currentTick = this.getCurrentTick();
            return currentTick % this.song.ticksPerPattern();
        }

        getTimeForTick(tick: number): number {
            const msPerTick = (60000 / this.song.tempo) / this.song.ticksPerBeat;
            return this.startTime + (tick * msPerTick);
        }

        timeDelayForTick(tick: number): number {
            const scheduledTime = this.getTimeForTick(tick);
            return scheduledTime - control.millis();
        }

        update() {
            if (!this.song) return;

            const currentTick = this.getCurrentTick();
            const scheduledTick = currentTick + SCHEDULE_AHEAD_TICKS;
            const sequenceIndex = Math.floor(scheduledTick / this.song.ticksPerPattern());

            // console.log(`Current tick: ${currentTick}, scheduling up to tick ${scheduledTick} (sequence index ${sequenceIndex})`);


            for (let i = 0; i < 2; i++) {
                const patternStartTick = (sequenceIndex + i) * this.song.ticksPerPattern();
                for (const track of this.song.tracks) {
                    const patternIndex = track.sequence[(sequenceIndex + i) % track.sequence.length];
                    const pattern = track.patterns[patternIndex];

                    for (const noteEvent of pattern.notes) {
                        const eventTick = patternStartTick + noteEvent.startTick;
                        if (eventTick > scheduledTick) {
                            break;
                        }

                        // console.log(`Considering note event starting at tick ${noteEvent.startTick} currently at scheduled tick ${scheduledTick} (absolute tick ${eventTick})`);

                        if (eventTick > this.lastScheduledTick && eventTick <= scheduledTick) {
                            const rendered = noteEvent.render(track.instrument, this.song);
                            console.log(`Scheduling note at tick ${eventTick} (delay ${this.timeDelayForTick(eventTick)} ms)`);

                            for (const instructions of rendered) {
                                music.playInstructions(
                                    this.timeDelayForTick(eventTick),
                                    instructions
                                );
                            }
                        }
                    }
                }
            }

            this.lastScheduledTick = scheduledTick;
        }

        dispose() {
            game.currentScene().eventContext.unregisterFrameHandler(this.updateHandler);
            if (this.song && this.song.player === this) {
                this.song.player = null;
            }
        }
    }
}