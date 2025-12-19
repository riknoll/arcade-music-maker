namespace piano {
    export function drawPianoOctave(left: number, top: number, octave: number, metrics: dimensions.Metrics) {
        for (let i = 0; i < 7; i++) {
            const offset = top + i * (metrics.whiteKeyHeight + metrics.gridLineWidth);
            screen.fillRect(
                left,
                offset,
                metrics.whiteKeyWidth,
                metrics.gridLineWidth,
                theme.pianoBorderColor
            )
            screen.fillRect(
                left,
                offset + metrics.gridLineWidth,
                metrics.whiteKeyWidth,
                metrics.whiteKeyHeight,
                theme.whiteKeyColor
            )
            screen.fillRect(
                left + metrics.whiteKeyWidth,
                offset,
                metrics.gridLineWidth,
                metrics.whiteKeyHeight + metrics.gridLineWidth,
                theme.pianoBorderColor
            )
        }

        for (let i = 0; i < 6; i++) {
            if (i === 3) continue;

            const offset = top + (i + 1) * (metrics.whiteKeyHeight + metrics.gridLineWidth) - (metrics.blackKeyHeight >> 1)

            screen.fillRect(
                left,
                offset,
                metrics.blackKeyWidth,
                metrics.blackKeyHeight,
                theme.blackKeyColor
            )
        }

        const octaveText = (octave + "").charAt(0);
        fancyText.draw(
            octaveText,
            screen,
            left + metrics.whiteKeyWidth - theme.pianoOctaveFont.charWidth(octaveText.charCodeAt(0)) - metrics.gridLineWidth,
            top + metrics.octaveHeight - theme.pianoOctaveFont.lineHeight,
            0,
            theme.pianoOctaveColor,
            theme.pianoOctaveFont
        )
    }


    export function drawMeasureGrid(x: number, y: number, metrics: dimensions.Metrics) {
        for (let j = 0; j < 8; j++) {
            const left = x + j * (metrics.gridCellWidth + metrics.gridLineWidth);

            for (let i = 0; i < 12; i++) {
                const offset = y + i * (metrics.gridCellHeight + metrics.gridLineWidth);
                screen.fillRect(
                    left,
                    offset,
                    metrics.gridCellWidth,
                    metrics.gridLineWidth,
                    i === 0 ? theme.gridlineMajorColor : theme.gridlineColor
                );
                screen.fillRect(
                    left + metrics.gridCellWidth,
                    offset,
                    metrics.gridLineWidth,
                    metrics.gridCellHeight + metrics.gridLineWidth,
                    j === 7 ? theme.gridlineMajorColor : theme.gridlineColor
                );

                screen.fillRect(
                    left,
                    offset + metrics.gridLineWidth,
                    metrics.gridCellWidth,
                    metrics.gridCellHeight,
                    isSharpOrFlat(11 - i) ? theme.blackKeyCellColor : theme.whiteKeyCellColor
                );
            }
        }
    }
}