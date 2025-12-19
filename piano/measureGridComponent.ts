namespace piano {
    enum DragType {
        Create,
        EditDuration,
        PitchBend,
        Unknown
    }

    export class MeasureGridComponent extends ui.BaseComponent {
        cursorTick = 0;
        cursorY = 0;

        hoverX = 0;
        hoverY = 0;

        mouseMoveListener: (x: number, y: number) => void;

        dragStartTick = 0;
        dragStartOffset = 0;
        dragPattern: Pattern = null;
        dragType: DragType = DragType.Unknown;

        displayPattern: Pattern = null;

        constructor(protected metrics: dimensions.Metrics, protected song: Song, protected trackIndex: number, protected patternIndex: number, protected scroll: ui.Parameter, kind?: number) {
            super(kind);
            this.setDimensions(
                screen.width - metrics.pianoWidth - metrics.scrollbarWidth,
                screen.height
            )

            this.setFocusable(true);

            this.displayPattern = this.song.tracks[this.trackIndex].patterns[this.patternIndex].clone();

            this.mouseMoveListener = (x: number, y: number) => {
                if (x < this.left || x >= this.right || y < this.top || y >= this.bottom) {
                    this.dragPattern = null;
                    return;
                }

                this.cursorTick = Math.idiv(this.xToTick(x), this.ticksPerCell) * this.ticksPerCell;
                this.cursorY = this.yToNoteOffset(y);

                if (this.dragPattern) {
                    this.displayPattern = this.dragPattern.clone();
                    this.dragType = applyDrag(
                        this.displayPattern,
                        this.dragStartTick | 0,
                        this.dragStartOffset | 0,
                        this.xToTick(x) | 0,
                        this.cursorY | 0,
                        this.dragType
                    );
                }
            }

            ui._state().addGlobalMouseMoveListener(this.mouseMoveListener);
        }


        get ticksPerCell(): number {
            return this.song.ticksPerBeat >> 1;
        }

        handleClick(x: number, y: number, event: browserEvents.MouseButtonEvent): void {
            if (event === browserEvents.MouseButtonEvent.Released) {
                if (this.dragPattern && this.dragType === DragType.Unknown) {
                    applyClick(
                        this.song.tracks[this.trackIndex].patterns[this.patternIndex],
                        this.dragStartTick | 0,
                        this.dragStartOffset | 0,
                        this.ticksPerCell,
                        this.song.tracks[this.trackIndex].instrument,
                        this.song
                    );
                }
                else {
                    applyDrag(
                        this.song.tracks[this.trackIndex].patterns[this.patternIndex],
                        this.dragStartTick | 0,
                        this.dragStartOffset | 0,
                        this.xToTick(x) | 0,
                        this.cursorY | 0,
                        this.dragType
                    );
                }
                this.dragPattern = null;
                this.displayPattern = this.song.tracks[this.trackIndex].patterns[this.patternIndex].clone();
                return;
            }

            this.dragPattern = this.song.tracks[this.trackIndex].patterns[this.patternIndex].clone();
            this.dragStartTick = this.xToTick(x);
            this.dragStartOffset = this.yToNoteOffset(y);
            this.dragType = DragType.Unknown;

            this.focus();
        }

        xToTick(x: number): number {
            return (x - this.left) * (this.ticksPerCell) / (this.metrics.gridCellWidth + this.metrics.gridLineWidth);
        }

        tickToX(tick: number): number {
            return this.left + (tick / this.ticksPerCell) * (this.metrics.gridCellWidth + this.metrics.gridLineWidth);
        }

        yToNoteOffset(y: number): number {
            return 8 * 12 - Math.idiv(y + this.scroll.value - this.top, this.metrics.gridCellHeight + this.metrics.gridLineWidth) - 1;
        }

        noteOffsetToY(offset: number): number {
            return this.top + (8 * 12 - offset - 1) * (this.metrics.gridCellHeight + this.metrics.gridLineWidth) - this.scroll.value;
        }

        draw(left: number, top: number) {
            let x = left;

            for (let measure = 0; measure < this.song.measuresPerPattern; measure++) {
                if (x + this.metrics.measureWidth < left) {
                    x += this.metrics.measureWidth;
                    continue;
                }

                if (x > left + this.width) {
                    break;
                }

                let y = top - this.scroll.value;

                for (let octave = 0; octave < 8; octave++) {
                    if (y + this.metrics.octaveHeight < top) {
                        y += this.metrics.octaveHeight;
                        continue;
                    }
                    if (y > top + this.height) {
                        break;
                    }

                    drawMeasureGrid(x, y, this.metrics);

                    y += this.metrics.octaveHeight;
                }

                x += this.metrics.measureWidth;
            }

            for (const note of this.displayPattern.notes) {
                this.drawNoteEvent(note, left, top - this.scroll.value, 0);
                this.drawNoteEvent(note, left, top - this.scroll.value, 6);
            }

            if (!this.dragPattern) {
                const cursorEvent = this.displayPattern.getNoteEventAtTick(this.cursorTick);
                if (cursorEvent) {
                    const event = new NoteEvent();
                    event.startTick = cursorEvent.startTick;
                    event.endTick = cursorEvent.endTick;
                    event.notes = [this.cursorY];
                    event.pitchBend = cursorEvent.pitchBend;

                    this.drawNoteEvent(event, left, top - this.scroll.value, 4);
                }
                else {
                    screen.drawRect(
                        this.tickToX(this.cursorTick) - 1,
                        this.noteOffsetToY(this.cursorY),
                        this.metrics.gridCellWidth + 2,
                        this.metrics.gridCellHeight + 2,
                        4
                    )
                }
            }

            if (this.song.player) {
                const patternTick = this.song.player.getCurrentPatternTick();
                screen.fillRect(
                    this.tickToX(patternTick),
                    top,
                    this.metrics.gridLineWidth,
                    this.height,
                    2
                )
            }
        }

        drawNoteEvent(noteEvent: NoteEvent, left: number, top: number, outline: number) {
            const tickWidth = (this.metrics.gridCellWidth + this.metrics.gridLineWidth) / this.ticksPerCell;

            const fillColor = 7;

            const drawSegment = (startTick: number, endTick: number, startOffset: number, endOffset: number) => {
                const startX = left + tickWidth * startTick;
                const endX = left + tickWidth * endTick;

                if (startOffset === endOffset) {
                    for (const note of noteEvent.notes) {
                        if (outline) {
                            screen.fillRect(
                                startX,
                                this.noteOffsetToY(note + startOffset),
                                endX - startX,
                                this.metrics.gridLineWidth,
                                outline
                            )
                            screen.fillRect(
                                startX,
                                this.noteOffsetToY(note + startOffset - 1),
                                endX - startX,
                                this.metrics.gridLineWidth,
                                outline
                            )
                        }
                        else {
                            screen.fillRect(
                                startX,
                                this.noteOffsetToY(note + startOffset),
                                endX - startX,
                                this.metrics.gridCellHeight + this.metrics.gridLineWidth * 2,
                                fillColor
                            )
                        }
                    }
                }
                else {
                    for (const note of noteEvent.notes) {
                        if (outline) {
                            screen.drawLine(
                                startX,
                                this.noteOffsetToY(note + startOffset),
                                endX,
                                this.noteOffsetToY(note + endOffset),
                                outline
                            );
                            screen.drawLine(
                                startX,
                                this.noteOffsetToY(note + startOffset - 1),
                                endX,
                                this.noteOffsetToY(note + endOffset - 1),
                                outline
                            );
                        }
                        else {
                            screen.fillPolygon4(
                                startX,
                                this.noteOffsetToY(note + startOffset),
                                endX,
                                this.noteOffsetToY(note + endOffset),
                                endX,
                                this.noteOffsetToY(note + endOffset - 1),
                                startX,
                                this.noteOffsetToY(note + startOffset - 1),
                                fillColor
                            )
                        }
                    }
                }
            };

            let currentTick = noteEvent.startTick;
            let currentNoteOffset = 0;

            if (outline) {
                for (const note of noteEvent.notes) {
                    screen.fillRect(
                        this.tickToX(noteEvent.startTick) - 1,
                        this.noteOffsetToY(note + currentNoteOffset),
                        1,
                        this.metrics.gridCellHeight + this.metrics.gridLineWidth + 1,
                        outline
                    )
                }
            }

            for (const bend of noteEvent.pitchBend) {
                drawSegment(
                    currentTick,
                    bend.tick,
                    currentNoteOffset,
                    bend.offset
                );
                currentTick = bend.tick;
                currentNoteOffset = bend.offset;
            }

            if (currentTick < noteEvent.endTick) {
                drawSegment(
                    currentTick,
                    noteEvent.endTick,
                    currentNoteOffset,
                    currentNoteOffset
                );
            }

            if (outline) {
                for (const note of noteEvent.notes) {
                    screen.fillRect(
                        this.tickToX(noteEvent.endTick) - 1,
                        this.noteOffsetToY(note + currentNoteOffset),
                        1,
                        this.metrics.gridCellHeight + this.metrics.gridLineWidth + 1,
                        outline
                    )
                }
            }
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);

            ui._state().removeGlobalMouseMoveListener(this.mouseMoveListener);
        }
    }

    function applyClick(pattern: Pattern, tick: number, offset: number, ticksPerCell: number, instrument: Instrument, song: Song): void {
        const editingEvent = pattern.getNoteEventAtTick(tick);

        if (!editingEvent) {
            const newNoteEvent = new NoteEvent();
            newNoteEvent.startTick = Math.idiv(tick, ticksPerCell) * ticksPerCell;
            const nextEvent = pattern.notes.find(e => e.startTick > newNoteEvent.startTick);
            newNoteEvent.endTick = Math.min(nextEvent ? nextEvent.startTick : newNoteEvent.startTick + ticksPerCell, newNoteEvent.startTick + ticksPerCell);
            newNoteEvent.notes = [offset];

            pattern.notes.push(newNoteEvent);
            pattern.sortNotes();

            newNoteEvent.play(instrument, song);

            return;
        }


        if (editingEvent.notes.indexOf(offset) === -1) {
            editingEvent.notes.push(offset);

            if (editingEvent.notes.length > 4) {
                editingEvent.notes.shift();
            }
        }
        else {
            editingEvent.notes.removeElement(offset);

            if (editingEvent.notes.length === 0) {
                pattern.notes.removeElement(editingEvent);
            }
        }

        editingEvent.play(instrument, song)
    }

    function applyDrag(
        pattern: Pattern,
        startTick: number,
        startOffset: number,
        endTick: number,
        endOffset: number,
        dragType: DragType
    ): DragType {
        const editingEvent = pattern.getNoteEventAtTick(startTick);

        if (!editingEvent) {
            dragType = DragType.Create;

            const newNoteEvent = new NoteEvent();
            newNoteEvent.startTick = Math.min(startTick, endTick);;
            newNoteEvent.endTick = Math.max(startTick, endTick);
            newNoteEvent.notes = [startOffset];

            const toRemove: NoteEvent[] = [];

            for (const existing of pattern.notes) {
                if (existing.endTick < newNoteEvent.startTick || existing.startTick > newNoteEvent.endTick) {
                    continue;
                }

                if (existing.startTick >= newNoteEvent.startTick && existing.endTick <= newNoteEvent.endTick) {
                    toRemove.push(existing);
                    continue;
                }

                if (existing.endTick > newNoteEvent.startTick) {
                    existing.endTick = newNoteEvent.startTick;
                    existing.pitchBend = existing.pitchBend.filter(bend => bend.tick > existing.startTick && bend.tick < existing.endTick);
                    continue;
                }

                if (existing.startTick < newNoteEvent.endTick) {
                    existing.startTick = newNoteEvent.endTick;
                    existing.pitchBend = existing.pitchBend.filter(bend => bend.tick > existing.startTick && bend.tick < existing.endTick);
                }
            }

            pattern.notes.push(newNoteEvent);
            for (const note of toRemove) {
                pattern.notes.removeElement(note);
            }
            pattern.sortNotes();

            return dragType;
        }

        let newDragType = dragType;

        if (dragType === DragType.Unknown) {
            if (startOffset !== endOffset) {
                newDragType = DragType.PitchBend;
                dragType = DragType.PitchBend;
            }
            else {
                dragType = DragType.EditDuration;

                if (Math.abs(endTick - startTick) > 3) {
                    newDragType = DragType.EditDuration;
                }
            }
        }

        if (dragType === DragType.EditDuration) {
            if (endTick > startTick) {
                editingEvent.endTick = Math.max(editingEvent.endTick, endTick);

                let startBendTick = editingEvent.startTick;
                let bendOffset = 0;

                for (const bendEvent of editingEvent.pitchBend) {
                    bendOffset = bendEvent.offset;

                    if (bendEvent.tick >= startTick) {
                        break;
                    }
                    startBendTick = bendEvent.tick;
                }

                editingEvent.pitchBend = editingEvent.pitchBend.filter(bend => bend.tick <= startBendTick || bend.tick > endTick);
                editingEvent.pitchBend.push(new NoteBendEvent(endTick, bendOffset));
                editingEvent.sortBendEvents();

                const noteEventsToRemove: NoteEvent[] = [];

                for (const otherEvent of pattern.notes) {
                    if (otherEvent === editingEvent || otherEvent.endTick < editingEvent.startTick || otherEvent.startTick > editingEvent.endTick) {
                        continue;
                    }

                    if (otherEvent.startTick >= editingEvent.startTick && otherEvent.endTick <= editingEvent.endTick) {
                        noteEventsToRemove.push(otherEvent);
                        continue;
                    }

                    if (otherEvent.startTick < editingEvent.endTick) {
                        otherEvent.startTick = editingEvent.endTick;
                        otherEvent.pitchBend = otherEvent.pitchBend.filter(bend => bend.tick > otherEvent.startTick && bend.tick < otherEvent.endTick);
                    }
                }

                for (const note of noteEventsToRemove) {
                    pattern.notes.removeElement(note);
                }
            }
            else {
                const startBend = editingEvent.getOffsetAtTick(startTick) | 0;

                if (endTick < editingEvent.startTick) {
                    editingEvent.startTick = endTick;
                    for (let i = 0; i < editingEvent.notes.length; i++) {
                        editingEvent.notes[i] += startBend;
                    }

                    for (const offsetEvent of editingEvent.pitchBend) {
                        offsetEvent.offset -= startBend;
                    }
                }

                let startBendTick = editingEvent.endTick;
                let bendOffset = 0;

                for (let i = editingEvent.pitchBend.length - 1; i >= 0; i--) {
                    const bendEvent = editingEvent.pitchBend[i];
                    bendOffset = bendEvent.offset;
                    if (bendEvent.tick <= startTick) {
                        break;
                    }
                    startBendTick = bendEvent.tick;
                }

                editingEvent.pitchBend = editingEvent.pitchBend.filter(bend => bend.tick < endTick || bend.tick >= startBendTick);
                editingEvent.pitchBend.push(new NoteBendEvent(endTick, bendOffset));
                editingEvent.sortBendEvents();

                const noteEventsToRemove: NoteEvent[] = [];
                for (const otherEvent of pattern.notes) {
                    if (otherEvent === editingEvent || otherEvent.endTick < editingEvent.startTick || otherEvent.startTick > editingEvent.endTick) {
                        continue;
                    }

                    if (otherEvent.startTick >= editingEvent.startTick && otherEvent.endTick <= editingEvent.endTick) {
                        noteEventsToRemove.push(otherEvent);
                        continue;
                    }

                    if (otherEvent.endTick > editingEvent.startTick) {
                        otherEvent.endTick = editingEvent.startTick;
                        otherEvent.pitchBend = otherEvent.pitchBend.filter(bend => bend.tick > otherEvent.startTick && bend.tick < otherEvent.endTick);
                    }
                }

                for (const note of noteEventsToRemove) {
                    pattern.notes.removeElement(note);
                }
            }
        }
        else if (dragType === DragType.PitchBend) {
            const offset = editingEvent.getOffsetAtTick(startTick);
            if (endTick > startTick) {
                editingEvent.pitchBend = editingEvent.pitchBend.filter(bend => bend.tick < startTick || bend.tick > endTick);

                editingEvent.pitchBend.push(new NoteBendEvent(startTick, offset));
                editingEvent.pitchBend.push(new NoteBendEvent(endTick, endOffset - startOffset + offset));
                editingEvent.sortBendEvents();

                editingEvent.endTick = Math.max(editingEvent.endTick, endTick);

                const noteEventsToRemove: NoteEvent[] = [];

                for (const otherEvent of pattern.notes) {
                    if (otherEvent === editingEvent || otherEvent.endTick < editingEvent.startTick || otherEvent.startTick > editingEvent.endTick) {
                        continue;
                    }

                    if (otherEvent.startTick >= editingEvent.startTick && otherEvent.endTick <= editingEvent.endTick) {
                        noteEventsToRemove.push(otherEvent);
                        continue;
                    }

                    if (otherEvent.startTick < editingEvent.endTick) {
                        otherEvent.startTick = editingEvent.endTick;
                        otherEvent.pitchBend = otherEvent.pitchBend.filter(bend => bend.tick > otherEvent.startTick && bend.tick < otherEvent.endTick);
                    }
                }

                for (const note of noteEventsToRemove) {
                    pattern.notes.removeElement(note);
                }
            }
            else {
                editingEvent.pitchBend = editingEvent.pitchBend.filter(bend => bend.tick < endTick || bend.tick > startTick);

                editingEvent.pitchBend.push(new NoteBendEvent(startTick, offset));

                const startBend = endOffset - startOffset + offset;

                editingEvent.pitchBend.push(new NoteBendEvent(endTick, startBend));
                editingEvent.sortBendEvents();

                if (endTick < editingEvent.startTick) {
                    editingEvent.startTick = endTick;
                    for (let i = 0; i < editingEvent.notes.length; i++) {
                        editingEvent.notes[i] += startBend;
                    }

                    for (const offsetEvent of editingEvent.pitchBend) {
                        offsetEvent.offset -= startBend;
                    }
                }

                const noteEventsToRemove: NoteEvent[] = [];
                for (const otherEvent of pattern.notes) {
                    if (otherEvent === editingEvent || otherEvent.endTick < editingEvent.startTick || otherEvent.startTick > editingEvent.endTick) {
                        continue;
                    }

                    if (otherEvent.startTick >= editingEvent.startTick && otherEvent.endTick <= editingEvent.endTick) {
                        noteEventsToRemove.push(otherEvent);
                        continue;
                    }

                    if (otherEvent.endTick > editingEvent.startTick) {
                        otherEvent.endTick = editingEvent.startTick;
                        otherEvent.pitchBend = otherEvent.pitchBend.filter(bend => bend.tick > otherEvent.startTick && bend.tick < otherEvent.endTick);
                    }
                }

                for (const note of noteEventsToRemove) {
                    pattern.notes.removeElement(note);
                }
            }
        }
        return newDragType
    }

    export function printNoteEvent(noteEvent: NoteEvent): void {
        console.log(`NoteEvent: startTick=${noteEvent.startTick}, endTick=${noteEvent.endTick}, notes=[${noteEvent.notes.join(", ")}], pitchBend=[${noteEvent.pitchBend.map(bend => `{tick=${bend.tick}, offset=${bend.offset}}`).join(", ")}]`);
    }
}