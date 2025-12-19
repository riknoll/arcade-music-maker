namespace ui {
    export const backArrow = img`
        . . . . c . . . . .
        . . . c 1 c . . . .
        . . c 1 1 c c c c .
        . c 1 1 1 1 1 1 1 c
        c 1 1 1 1 1 1 1 1 c
        . c 1 1 1 1 1 1 1 c
        . . c 1 1 c c c c .
        . . . c 1 c . . . .
        . . . . c . . . . .
        `;

    export const playIcon = img`
        . c c . . . . . . .
        c 7 7 c c . . . . .
        c 7 7 7 7 c c . . .
        c 7 7 7 7 7 7 c c .
        c 7 7 7 7 7 7 7 7 c
        c 7 7 7 7 7 7 c c .
        c 7 7 7 7 c c . . .
        c 7 7 c c . . . . .
        . c c . . . . . . .
        `;

    export const pauseIcon = img`
        . c c c . . c c c .
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        c 2 2 2 c c 2 2 2 c
        . c c c . . c c c .
        `;

    export const trumpetIcon = img`
        . . . . . . . . . . . . c .
        . . . . . c . c . c . c 4 c
        . . . . c e c e c e c 4 4 c
        . . . c 4 4 4 4 4 4 4 4 4 c
        . c c 4 c e c e c e c 4 4 c
        c 1 4 4 4 4 4 4 4 4 c c 4 c
        . c c 4 c e c e c e 4 c c .
        . . . c 4 4 4 4 4 4 c . . .
        . . . . c c c c c c . . . .
        `;

    export const noteIcon = img`
        . . . c c c c c c .
        . . c 1 1 1 1 1 1 c
        . . c 1 c c c c 1 c
        . . c 1 c . . c 1 c
        . c c 1 c . c c 1 c
        c 1 1 1 c c 1 1 1 c
        c 1 1 1 c c 1 1 1 c
        c 1 1 1 c c 1 1 1 c
        . c c c . . c c c .
        `;

    export const keyboardIcon = img`
        . c c c c c c c c c c c c c c c c c c c .
        c 1 f f f 1 f f f 1 c 1 f f f 1 f f f 1 c
        c 1 f f f 1 f f f 1 c 1 f f f 1 f f f 1 c
        c 1 f f f 1 f f f 1 c 1 f f f 1 f f f 1 c
        c 1 f f f 1 f f f 1 c 1 f f f 1 f f f 1 c
        c 1 1 c 1 1 1 c 1 1 c 1 1 c 1 1 1 c 1 1 c
        c 1 1 c 1 1 1 c 1 1 c 1 1 c 1 1 1 c 1 1 c
        c 1 1 c 1 1 1 c 1 1 c 1 1 c 1 1 1 c 1 1 c
        . c c c c c c c c c c c c c c c c c c c .
        `;

    export const leftArrow = img`
        . . . . . c .
        . . . . c 1 c
        . . . c 1 1 c
        . . c 1 1 1 c
        . c 1 1 1 1 c
        c 1 1 1 1 1 c
        . c 1 1 1 1 c
        . . c 1 1 1 c
        . . . c 1 1 c
        . . . . c 1 c
        . . . . . c .
        `;

    export const rightArrow = img`
        . c . . . . .
        c 1 c . . . .
        c 1 1 c . . .
        c 1 1 1 c . .
        c 1 1 1 1 c .
        c 1 1 1 1 1 c
        c 1 1 1 1 c .
        c 1 1 1 c . .
        c 1 1 c . . .
        c 1 c . . . .
        . c . . . . .
        `;

    export const scrollbarDown = img`
        f f f f f f f f f
        f c c c c c c c f
        f c f f f f f c f
        f c f f f f f c f
        f c c f f f c c f
        f c c f f f c c f
        f c c c f c c c f
        f b b b b b b b f
        f f f f f f f f f
    `;

    export const scrollbarUp = img`
        f f f f f f f f f
        f c c c c c c c f
        f c c c f c c c f
        f c c f f f c c f
        f c c f f f c c f
        f c f f f f f c f
        f c f f f f f c f
        f b b b b b b b f
        f f f f f f f f f
    `;

    export function getInstrumentIcons(): Image[] {
        return [img`
            . . . . c c c b b b b b . . . .
            . . c c b 4 4 4 4 4 4 b b b . .
            . c c 4 4 4 4 4 5 4 4 4 4 b c .
            . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
            e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
            e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
            e b b 4 4 4 4 4 4 4 4 4 4 4 b e
            . e b 4 4 4 4 4 5 4 4 4 4 b e .
            8 7 e e b 4 4 4 4 4 4 b e e 6 8
            8 7 2 e e e e e e e e e e 2 7 8
            e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
            e c 6 7 6 6 7 7 7 6 6 7 6 c c e
            e b e 8 8 c c 8 8 c c c 8 e b e
            e e b e c c e e e e e c e b e e
            . e e b b 4 4 4 4 4 4 4 4 e e .
            . . . c c c c c e e e e e . . .
            `, img`
            . . . . . . . e c 7 . . . . . .
            . . . . e e e c 7 7 e e . . . .
            . . c e e e e c 7 e 2 2 e e . .
            . c e e e e e c 6 e e 2 2 2 e .
            . c e e e 2 e c c 2 4 5 4 2 e .
            c e e e 2 2 2 2 2 2 4 5 5 2 2 e
            c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
            . e e e 2 2 2 2 2 2 2 2 2 4 e .
            . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
            . . 2 e e 2 2 2 2 2 4 4 2 e . .
            . . . 2 2 e e 4 4 4 2 e e . . .
            . . . . . 2 2 e e e e . . . . .
            `, img`
            . . 2 2 b b b b b . . . . . . .
            . 2 b 4 4 4 4 4 4 b . . . . . .
            2 2 4 4 4 4 d d 4 4 b . . . . .
            2 b 4 4 4 4 4 4 d 4 b . . . . .
            2 b 4 4 4 4 4 4 4 d 4 b . . . .
            2 b 4 4 4 4 4 4 4 4 4 b . . . .
            2 b 4 4 4 4 4 4 4 4 4 e . . . .
            2 2 b 4 4 4 4 4 4 4 b e . . . .
            . 2 b b b 4 4 4 b b b e . . . .
            . . e b b b b b b b e e . . . .
            . . . e e b 4 4 b e e e b . . .
            . . . . . e e e e e e b d b b .
            . . . . . . . . . . . b 1 1 1 b
            . . . . . . . . . . . c 1 d d b
            . . . . . . . . . . . c 1 b c .
            . . . . . . . . . . . . c c . .
            `, img`
            4 4 4 . . 4 4 4 4 4 . . . . . .
            4 5 5 4 4 5 5 5 5 5 4 4 . . . .
            b 4 5 5 1 5 1 1 1 5 5 5 4 . . .
            . b 5 5 5 5 1 1 5 5 1 1 5 4 . .
            . b d 5 5 5 5 5 5 5 5 1 1 5 4 .
            b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 .
            c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4
            c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4
            c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4
            c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4
            . c 4 5 5 5 5 d d d 5 5 5 5 5 b
            . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c
            . . c 4 4 d 4 4 4 4 4 d d 5 d c
            . . . c 4 4 4 4 4 4 4 4 5 5 5 4
            . . . . c c b 4 4 4 b b 4 5 4 4
            . . . . . . c c c c c c b b 4 .
            `, img`
            . . . . . . 2 2 2 2 . . . . . .
            . . . . 2 2 3 3 3 3 2 e . . . .
            . . . 2 3 d 1 1 d d 3 2 e . . .
            . . 2 3 1 d 3 3 3 d d 3 e . . .
            . 2 3 1 3 3 3 3 3 d 1 3 b e . .
            . 2 1 d 3 3 3 3 d 3 3 1 3 b b .
            2 3 1 d 3 3 1 1 3 3 3 1 3 4 b b
            2 d 3 3 d 1 3 1 3 3 3 1 3 4 4 b
            2 d 3 3 3 1 3 1 3 3 3 1 b 4 4 e
            2 d 3 3 3 1 1 3 3 3 3 1 b 4 4 e
            e d 3 3 3 3 d 3 3 3 d d b 4 4 e
            e d d 3 3 3 d 3 3 3 1 3 b 4 b e
            e 3 d 3 3 1 d d 3 d 1 b b e e .
            . e 3 1 1 d d 1 1 1 b b e e e .
            . . e 3 3 3 3 3 3 b e e e e . .
            . . . e e e e e e e e e e . . .
            `, img`
            . . . . . . b b b b . . . . . .
            . . . . . . b 4 4 4 b . . . . .
            . . . . . . b b 4 4 4 b . . . .
            . . . . . b 4 b b b 4 4 b . . .
            . . . . b d 5 5 5 4 b 4 4 b . .
            . . . . b 3 2 3 5 5 4 e 4 4 b .
            . . . b d 2 2 2 5 7 5 4 e 4 4 e
            . . . b 5 3 2 3 5 5 5 5 e e e e
            . . b d 7 5 5 5 3 2 3 5 5 e e e
            . . b 5 5 5 5 5 2 2 2 5 5 d e e
            . b 3 2 3 5 7 5 3 2 3 5 d d e 4
            . b 2 2 2 5 5 5 5 5 5 d d e 4 .
            b d 3 2 d 5 5 5 d d d 4 4 . . .
            b 5 5 5 5 d d 4 4 4 4 . . . . .
            4 d d d 4 4 4 . . . . . . . . .
            4 4 4 4 . . . . . . . . . . . .
            `, img`
            . . . . . . b b b b a a . . . .
            . . . . b b d d d 3 3 3 a a . .
            . . . b d d d 3 3 3 3 3 3 a a .
            . . b d d 3 3 3 3 3 3 3 3 3 a .
            . b 3 d 3 3 3 3 3 b 3 3 3 3 a b
            . b 3 3 3 3 3 a a 3 3 3 3 3 a b
            b 3 3 3 3 3 a a 3 3 3 3 d a 4 b
            b 3 3 3 3 b a 3 3 3 3 3 d a 4 b
            b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e
            a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e
            a 3 3 3 3 3 3 3 d d a 4 4 4 e .
            a a 3 3 3 d d d a a 4 4 4 e e .
            . e a a a a a a 4 4 4 4 e e . .
            . . e e b b 4 4 4 4 b e e . . .
            . . . e e e e e e e e . . . . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . b b b . . .
            . . . . . . . . b e e 3 3 b . .
            . . . . . . b b e 3 2 e 3 a . .
            . . . . b b 3 3 e 2 2 e 3 3 a .
            . . b b 3 3 3 3 3 e e 3 3 3 a .
            b b 3 3 3 3 3 3 3 3 3 3 3 3 3 a
            b 3 3 3 d d d d 3 3 3 3 3 d d a
            b b b b b b b 3 d d d d d d 3 a
            b d 5 5 5 5 d b b b a a a a a a
            b 3 d d 5 5 5 5 5 5 5 d d d d a
            b 3 3 3 3 3 3 d 5 5 5 d d d d a
            b 3 d 5 5 5 3 3 3 3 3 3 b b b a
            b b b 3 d 5 5 5 5 5 5 5 d d b a
            . . . b b b 3 d 5 5 5 5 d d 3 a
            . . . . . . b b b b 3 d d d b a
            . . . . . . . . . . b b b a a .
            `, img`
            . . . . . 3 3 b 3 3 d d 3 3 . .
            . . . . 3 1 1 d 3 d 1 1 1 1 3 .
            . . . 3 d 1 1 1 d 1 1 1 d 3 1 3
            . . 3 d d 1 1 1 d d 1 1 1 3 3 3
            . 3 1 1 d 1 1 1 1 d d 1 1 b . .
            . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 .
            . b d 1 1 1 d 1 1 1 1 1 1 1 3 .
            . 4 b 1 1 1 1 d d 1 1 1 1 d 3 .
            . 4 4 d 1 1 1 1 1 1 d d d b b .
            . 4 d b d 1 1 1 1 1 1 1 1 3 . .
            4 d d 5 b d 1 1 1 1 1 1 1 3 . .
            4 5 d 5 5 b b d 1 1 1 1 d 3 . .
            4 5 5 d 5 5 d b b b d d 3 . . .
            4 5 5 5 d d d d 4 4 b 3 . . . .
            . 4 5 5 5 4 4 4 . . . . . . . .
            . . 4 4 4 . . . . . . . . . . .
            `, img`
            . . . . . . . 6 . . . . . . . .
            . . . . . . 8 6 6 . . . 6 8 . .
            . . . e e e 8 8 6 6 . 6 7 8 . .
            . . e 2 2 2 2 e 8 6 6 7 6 . . .
            . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
            . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
            e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
            e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
            e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
            e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
            e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
            e 2 2 2 2 2 2 2 4 e 2 e e c . .
            e e 2 e 2 2 4 2 2 e e e c . . .
            e e e e 2 e 2 2 e e e c . . . .
            e e e 2 e e c e c c c . . . . .
            . c c c c c c c . . . . . . . .
            `, img`
            . . . . . . . . . . . 6 6 6 6 6
            . . . . . . . . . 6 6 7 7 7 7 8
            . . . . . . 8 8 8 7 7 8 8 6 8 8
            . . e e e e c 6 6 8 8 . 8 7 8 .
            . e 2 5 4 2 e c 8 . . . 6 7 8 .
            e 2 4 2 2 2 2 2 c . . . 6 7 8 .
            e 2 2 2 2 2 2 2 c . . . 8 6 8 .
            e 2 e e 2 2 2 2 e e e e c 6 8 .
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
            . c 2 e e e 2 e 2 4 2 2 2 2 c .
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e
            . . . e c c e c 2 2 2 2 2 2 2 e
            . . . . . . . c 2 e e 2 2 e 2 c
            . . . . . . . c e e e e e e 2 c
            . . . . . . . . c e 2 2 2 2 c .
            . . . . . . . . . c c c c c . .
            `, img`
            . . . . . . . e e e e . . . . .
            . . . . . e e 4 5 5 5 e e . . .
            . . . . e 4 5 6 2 2 7 6 6 e . .
            . . . e 5 6 6 7 2 2 6 4 4 4 e .
            . . e 5 2 2 7 6 6 4 5 5 5 5 4 .
            . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4
            . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4
            e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4
            e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4
            e 5 c c e 5 4 5 5 5 4 5 5 5 e .
            e 5 c c 5 5 5 5 5 5 5 5 4 e . .
            e 5 e c 5 4 5 4 5 5 5 e e . . .
            e 5 e e 5 5 5 5 5 4 e . . . . .
            4 5 4 e 5 5 5 5 e e . . . . . .
            . 4 5 4 5 5 4 e . . . . . . . .
            . . 4 4 e e e . . . . . . . . .
            `, img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . . . . b c . . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 5 d f . .
            . . . . b 5 5 1 f f 5 d 4 c . .
            . . . . b 5 5 d f b d d 4 4 . .
            b d d d b b d 5 5 5 4 4 4 4 4 b
            b b d 5 5 5 b 5 5 4 4 4 4 4 b .
            b d c 5 5 5 5 d 5 5 5 5 5 b . .
            c d d c d 5 5 b 5 5 5 5 5 5 b .
            c b d d c c b 5 5 5 5 5 5 5 b .
            . c d d d d d d 5 5 5 5 5 d b .
            . . c b d d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
            `, img`
            . . . . . . f f f f . . . . . .
            . . . . f f f 2 2 f f f . . . .
            . . . f f f 2 2 2 2 f f f . . .
            . . f f f e e e e e e f f f . .
            . . f f e 2 2 2 2 2 2 e e f . .
            . . f e 2 f f f f f f 2 e f . .
            . . f f f f e e e e f f f f . .
            . f f e f b f 4 4 f b f e f f .
            . f e e 4 1 f d d f 1 4 e e f .
            . . f e e d d d d d d e e f . .
            . . . f e e 4 4 4 4 e e f . . .
            . . e 4 f 2 2 2 2 2 2 f 4 e . .
            . . 4 d f 2 2 2 2 2 2 f d 4 . .
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
            `, img`
            . . . . . . 5 . 5 . . . . . . .
            . . . . . f 5 5 5 f f . . . . .
            . . . . f 1 5 2 5 1 6 f . . . .
            . . . f 1 6 6 6 6 6 1 6 f . . .
            . . . f 6 6 f f f f 6 1 f . . .
            . . . f 6 f f d d f f 6 f . . .
            . . f 6 f d f d d f d f 6 f . .
            . . f 6 f d 3 d d 3 d f 6 f . .
            . . f 6 6 f d d d d f 6 6 f . .
            . f 6 6 f 3 f f f f 3 f 6 6 f .
            . . f f d 3 5 3 3 5 3 d f f . .
            . . f d d f 3 5 5 3 f d d f . .
            . . . f f 3 3 3 3 3 3 f f . . .
            . . . f 3 3 5 3 3 5 3 3 f . . .
            . . . f f f f f f f f f f . . .
            . . . . . f f . . f f . . . . .
            `, img`
            . . . . . f f 4 4 f f . . . . .
            . . . . f 5 4 5 5 4 5 f . . . .
            . . . f e 4 5 5 5 5 4 e f . . .
            . . f b 3 e 4 4 4 4 e 3 b f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . f 3 3 e b 3 e e 3 b e 3 3 f .
            . f 3 3 f f e e e e f f 3 3 f .
            . f b b f b f e e f b f b b f .
            . f b b e 1 f 4 4 f 1 e b b f .
            f f b b f 4 4 4 4 4 4 f b b f f
            f b b f f f e e e e f f f b b f
            . f e e f b d d d d b f e e f .
            . . e 4 c d d d d d d c 4 e . .
            . . e f b d b d b d b b f e . .
            . . . f f 1 d 1 d 1 d f f . . .
            . . . . . f f b b f f . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c c c c . . .
            . . . . . . c c 5 5 5 5 5 c . .
            . . . . . c 5 5 5 5 5 5 5 5 c .
            . . . . c b b b b b b 5 5 5 c .
            . . . . c 1 1 b b 1 b b c c . .
            . . . c 1 1 1 b b 1 1 1 c . . .
            . . . c 1 1 1 1 b 1 1 1 c . c c
            . . . c d 1 1 1 b 1 1 1 b b 5 c
            . . c c d 1 c 1 b 1 b 1 5 5 5 c
            . c c d d 1 1 1 1 1 b 1 b b 5 c
            f d d d 1 1 1 1 1 b b 1 f . c c
            f f f 1 1 1 1 1 1 b b b f . . .
            . . . f f 1 1 1 b b b 5 5 f . .
            . . . . . f f f 5 5 5 5 5 f . .
            . . . . . . . . f f f f f f . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c c c . . . .
            . . . . . . c c d d d d c . . .
            . . . . . c c c c c c d c . . .
            . . . . c c 4 4 4 4 d c c . . .
            . . . c 4 d 4 4 4 4 4 1 c . c c
            . . c 4 4 4 1 4 4 4 4 d 1 c 4 c
            . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c
            f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f
            f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f
            f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f
            . f 4 4 4 4 1 c 4 f 4 d f f f f
            . . f f 4 d 4 4 f f 4 c f c . .
            . . . . f f 4 4 4 4 c d b c . .
            . . . . . . f f f f d d d c . .
            . . . . . . . . . . c c c . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . e e e . . . . e e e . . . . .
            . c d d c . . c d d c . . . . .
            . c b d d f f d d b c . . . . .
            . c 3 b d d b d b 3 c . . . . .
            . f b 3 d d d d 3 b f . . . . .
            . e d d d d d d d d e . . . . .
            . e d f d d d d f d e . b f b .
            . f d d f d d f d d f . f d f .
            . f b d d b b d d 2 f . f d f .
            . . f 2 2 2 2 2 2 b b f f d f .
            . . f b d d d d d d b b d b f .
            . . f d d d d d b d d f f f . .
            . . f d f f f d f f d f . . . .
            . . f f . . f f . . f f . . . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . 4 4 4 . . . . 4 4 4 . . . .
            . 4 5 5 5 e . . e 5 5 5 4 . . .
            4 5 5 5 5 5 e e 5 5 5 5 5 4 . .
            4 5 5 4 4 5 5 5 5 4 4 5 5 4 . .
            e 5 4 4 5 5 5 5 5 5 4 4 5 e . .
            . e e 5 5 5 5 5 5 5 5 e e . . .
            . . e 5 f 5 5 5 5 f 5 e . . . .
            . . f 5 5 5 4 4 5 5 5 f . . f f
            . . f 4 5 5 f f 5 5 6 f . f 5 f
            . . . f 6 6 6 6 6 6 4 4 f 5 5 f
            . . . f 4 5 5 5 5 5 5 4 4 5 f .
            . . . f 5 5 5 5 5 4 5 5 f f . .
            . . . f 5 f f f 5 f f 5 f . . .
            . . . f f . . f f . . f f . . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . b b b b b b b b b . . . .
            . . b 1 d d d d d d d 1 b . . .
            . b 1 1 1 1 1 1 1 1 1 1 1 b . .
            . b d b c c c c c c c b d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 d 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c 6 6 6 6 6 6 6 c d b . .
            . b d c c c c c c c c c d b . .
            . c b b b b b b b b b b b c . .
            c b c c c c c c c c c c c b c .
            c 1 d d d d d d d d d d d 1 c .
            c 1 d 1 1 d 1 1 d 1 1 d 1 1 c .
            c b b b b b b b b b b b b b c .
            c c c c c c c c c c c c c c c .
            `, img`
            . . . . . f c c c c f . . . . .
            . . c c f b b 3 3 b b f c c . .
            . c b 3 3 b b c c b b 3 3 b c .
            . f 3 c c c b c c b c c c 3 f .
            f c b b c c b c c b c c b b c f
            c 3 c c b c c c c c c b c c 3 c
            c 3 c c c c c c c c c c c c 3 c
            . f b b c c c c c c c c b b f .
            . . f b b c 8 9 9 8 c b b f . .
            . . c c c f 9 3 1 9 f c c c . .
            . c 3 f f f 9 3 3 9 f f f 3 c .
            c 3 f f f f 8 9 9 8 f f f f 3 c
            f 3 c c f f f f f f f f c c 3 f
            f b 3 c b b f b b f b b c 3 b f
            . c b b 3 3 b 3 3 b 3 3 b b c .
            . . f f f f f f f f f f f f . .
            `, img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c 1 b b b 1 b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b 1 f f 1 c b b b b f . . . .
            f f 1 f f 1 f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            `, img`
            . . . . f f f f f . . . . . . .
            . . . f e e e e e f . . . . . .
            . . f d d d d e e e f . . . . .
            . c d f d d f d e e f f . . . .
            . c d f d d f d e e d d f . . .
            c d e e d d d d e e b d c . . .
            c d d d d c d d e e b d c . f f
            c c c c c d d d e e f c . f e f
            . f d d d d d e e f f . . f e f
            . . f f f f f e e e e f . f e f
            . . . . f e e e e e e e f f e f
            . . . f e f f e f e e e e f f .
            . . . f e f f e f e e e e f . .
            . . . f d b f d b f f e f . . .
            . . . f d d c d d b b d f . . .
            . . . . f f f f f f f f f . . .
            `, img`
            . . . . c c c c c c . . . . . .
            . . . c 6 7 7 7 7 6 c . . . . .
            . . c 7 7 7 7 7 7 7 7 c . . . .
            . c 6 7 7 7 7 7 7 7 7 6 c . . .
            . c 7 c 6 6 6 6 c 7 7 7 c . . .
            . f 7 6 f 6 6 f 6 7 7 7 f . . .
            . f 7 7 7 7 7 7 7 7 7 7 f . . .
            . . f 7 7 7 7 6 c 7 7 6 f c . .
            . . . f c c c c 7 7 6 f 7 7 c .
            . . c 7 2 7 7 7 6 c f 7 7 7 7 c
            . c 7 7 2 7 7 c f c 6 7 7 6 c c
            c 1 1 1 1 7 6 f c c 6 6 6 c . .
            f 1 1 1 1 1 6 6 c 6 6 6 6 f . .
            f 6 1 1 1 1 1 6 6 6 6 6 c f . .
            . f 6 1 1 1 1 1 1 6 6 6 f . . .
            . . c c c c c c c c c f . . . .
            `, img`
            . . . . . . b b b b . . . . . .
            . . . . b b 3 3 3 3 b b . . . .
            . . . c b 3 3 3 3 1 1 b c . . .
            . . c b 3 3 3 3 3 1 1 1 b c . .
            . c c 1 1 1 3 3 3 3 1 1 3 c c .
            c c d 1 1 1 3 3 3 3 3 3 3 b c c
            c b d d 1 3 3 3 3 3 1 1 1 b b c
            c b b b 3 3 1 1 3 3 1 1 d d b c
            c b b b b d d 1 1 3 b d d d b c
            . c b b b b d d b b b b b b c .
            . . c c b b b b b b b b c c . .
            . . . . c c c c c c c c . . . .
            . . . . . . b 1 1 b . . . . . .
            . . . . . . b 1 1 b b . . . . .
            . . . . . b b d 1 1 b . . . . .
            . . . . . b d d 1 1 b . . . . .
            `, img`
            . . . . . b b b b b b . . . . .
            . . . b b d d d d d d b b . . .
            . . b b d d b b b b d d b b . .
            . e d b d b d d d d b d b d e .
            . f d b d d b b b b d d b d e .
            . f b d b b d d d d b b d b e .
            . f e d d d b b b b d d d e e .
            . f f e b d d d d d d b e e f .
            . f f e e e e e e e e e e e f .
            . f f e e e f e e e e e e e f .
            . f f e f e e e f f e e f e e f
            . f e e f e f e f e f e f e e e
            f f e e e e f e e f f e f f e e
            f e e e e f f e e e e e f f f e
            e e e e f f f e f e e e e f f f
            e e e e f f f e f e e e e f f f
            `, img`
            . . . . . . . . . . . c c . . .
            . . . . . . . c c c c 6 3 c . .
            . . . . . . c 6 3 3 3 3 6 c . .
            . . c c . c 6 c c 3 3 3 3 3 c .
            . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
            . f f 5 c 6 c 5 f f 3 3 3 3 3 c
            . f f 5 c 6 c 5 f f 6 3 3 3 c c
            . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
            . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
            . c c 5 5 5 5 5 b c c 3 3 3 3 c
            c 5 5 4 5 5 5 4 b 5 5 c 3 3 c .
            b 5 4 b 4 4 4 4 b b 5 c b b . .
            c 4 5 5 b 4 b 5 5 5 4 c 4 5 b .
            c 5 5 5 c 4 c 5 5 5 c 4 c 5 c .
            c 5 5 5 5 c 5 5 5 5 c 4 c 5 c .
            . c c c c c c c c c . . c c c .
            `, img`
            . . . . . . f f f f . . . . . .
            . . . . f f 5 5 5 5 f f . . . .
            . . . f 5 5 5 5 5 5 5 5 f . . .
            . . f 5 5 5 5 5 5 5 5 5 5 f . .
            . . f 5 5 5 d b b d 5 5 5 f . .
            . f 5 5 5 b 4 4 4 4 b 5 5 5 f .
            . f 5 5 c c 4 4 4 4 c c 5 5 f .
            . f b b f b f 4 4 f b f b b f .
            . f b b 4 1 f d d f 1 4 b b f .
            . . f b f d d d d d d f b f . .
            . . f e f e 4 4 4 4 e f e f . .
            . . e 4 f 6 9 9 9 9 6 f 4 e . .
            . . 4 d c 9 9 9 9 9 9 c d 4 . .
            . . 4 f b 3 b 3 b 3 b b f 4 . .
            . . . f f 3 b 3 b 3 3 f f . . .
            . . . . . f f b b f f . . . . .
            `, img`
            . . f f f . f f f f . f f f . .
            . f f f f f c c c c f f f f f .
            . f f f f b c c c c b f f f f .
            . f f f c 3 c c c c 3 c f f f .
            . . f 3 3 c c c c c c 3 3 f . .
            . . f c c c c 4 4 c c c c f . .
            . . f f c c 4 4 4 4 c c f f . .
            . . f f f b f 4 4 f b f f f . .
            . . f f 4 1 f d d f 1 4 f f . .
            . . . f f d d d d d d f f . . .
            . . . e f e 4 4 4 4 e f e . . .
            . . e 4 f b 3 3 3 3 b f 4 e . .
            . . 4 d f 3 3 3 3 3 3 c d 4 . .
            . . 4 4 f 6 6 6 6 6 6 f 4 4 . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
            `, img`
            . . . . . . f f f f . . . . . .
            . . . . f f f f f f f f . . . .
            . . . f f f f f f c f f f . . .
            . . f f f f f f c c f f f c . .
            . . f f f c f f f f f f f c . .
            . . c c c f f f e e f f c c . .
            . . f f f f f e e f f c c f . .
            . . f f f b f e e f b f f f . .
            . . . f 4 1 f 4 4 f 1 4 f . . .
            . . . f e 4 4 4 4 4 4 e f . . .
            . . . f f f e e e e f f f . . .
            . . f e f b 7 7 7 7 b f e f . .
            . . e 4 f 7 7 7 7 7 7 f 4 e . .
            . . e e f 6 6 6 6 6 6 f e e . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
            `, img`
            . . . . . . f f f f . . . . . .
            . . . . f f e e e e f f . . . .
            . . . f f e e e e e e f f . . .
            . . f f f f 4 e e e f f f f . .
            . . f f f 4 4 4 e e f f f f . .
            . . f f f 4 4 4 4 e e f f f . .
            . . f 4 e 4 4 4 4 4 4 e 4 f . .
            . . f 4 4 f f 4 4 f f 4 4 f . .
            . . f e 4 d d d d d d 4 e f . .
            . . . f e d d b b d d e f . . .
            . . . f f e 4 4 4 4 e f f . . .
            . . e 4 f b 1 1 1 1 b f 4 e . .
            . . 4 d f 1 1 1 1 1 1 f d 4 . .
            . . 4 4 f 6 6 6 6 6 6 f 4 4 . .
            . . . . . f f f f f f . . . . .
            . . . . . f f . . f f . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . 2 2 2 2 2 2 2 2 . . . .
            . . . 2 4 2 2 2 2 2 2 c 2 . . .
            . . 2 c 4 2 2 2 2 2 2 c c 2 . .
            . 2 c c 4 4 4 4 4 4 2 c c 4 2 d
            . 2 c 2 e e e e e e e b c 4 2 2
            . 2 2 e b b e b b b e e b 4 2 2
            . 2 e b b b e b b b b e 2 2 2 2
            . e e 2 2 2 e 2 2 2 2 2 e 2 2 2
            . e e e e e e f e e e f e 2 d d
            . e e e e e e f e e f e e e 2 d
            . e e e e e e f f f e e e e e e
            . e f f f f e e e e f f f e e e
            . . f f f f f e e f f f f f e .
            . . . f f f . . . . f f f f . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . 3 3 3 3 3 3 3 3 . . . .
            . . . 3 d 3 3 3 3 3 3 c 3 . . .
            . . 3 c d 3 3 3 3 3 3 c c 3 . .
            . 3 c c d d d d d d 3 c c d 3 d
            . 3 c 3 a a a a a a a b c d 3 3
            . 3 3 a b b a b b b a a b d 3 3
            . 3 a b b b a b b b b a 3 3 3 3
            . a a 3 3 3 a 3 3 3 3 3 a 3 3 3
            . a a a a a a f a a a f a 3 d d
            . a a a a a a f a a f a a a 3 d
            . a a a a a a f f f a a a a a a
            . a f f f f a a a a f f f a a a
            . . f f f f f a a f f f f f a .
            . . . f f f . . . . f f f f . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . 6 6 6 6 6 6 6 6 . . . .
            . . . 6 9 6 6 6 6 6 6 c 6 . . .
            . . 6 c 9 6 6 6 6 6 6 c c 6 . .
            . 6 c c 9 9 9 9 9 9 6 c c 9 6 d
            . 6 c 6 8 8 8 8 8 8 8 b c 9 6 6
            . 6 6 8 b b 8 b b b 8 8 b 9 6 6
            . 6 8 b b b 8 b b b b 8 6 6 6 6
            . 8 8 6 6 6 8 6 6 6 6 6 8 6 6 6
            . 8 8 8 8 8 8 f 8 8 8 f 8 6 d d
            . 8 8 8 8 8 8 f 8 8 f 8 8 8 6 d
            . 8 8 8 8 8 8 f f f 8 8 8 8 8 8
            . 8 f f f f 8 8 8 8 f f f 8 8 8
            . . f f f f f 8 8 f f f f f 8 .
            . . . f f f . . . . f f f f . .
            . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . c c c c . . . .
            . . . . c c c c c c c c c . . .
            . . . c f c c a a a a c a c . .
            . . c c f f f f a a a c a a c .
            . . c c a f f c a a f f f a a c
            . . c c a a a a b c f f f a a c
            . c c c c a c c b a f c a a c c
            c a f f c c c a b b 6 b b b c c
            c a f f f f c c c 6 b b b a a c
            c a a c f f c a 6 6 b b b a a c
            c c b a a a a b 6 b b a b b a .
            . c c b b b b b b b a c c b a .
            . . c c c b c c c b a a b c . .
            . . . . c b a c c b b b c . . .
            . . . . c b b a a 6 b c . . . .
            . . . . . . b 6 6 c c . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . f f f f f f . f f f f f f .
            . f f 3 3 3 3 f f f 3 3 3 3 f f
            . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
            . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
            . f 3 3 3 3 3 b b b 1 1 1 3 3 f
            . f 3 3 3 3 b b b b b 3 3 3 3 f
            . f f 3 3 b b b b b b b 3 3 f f
            . . f f 3 b b b b b b b 3 f f .
            . . . f f b b b b b b b f f . .
            . . . . f f b b b b b f f . . .
            . . . . . f f b b b f f . . . .
            . . . . . . f f b f f . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . . . . . . . . . . .
            `, img`
            . 3 . . . . . . . . . . . 4 . .
            . 3 3 . . . . . . . . . 4 4 . .
            . 3 d 3 . . 4 4 . . 4 4 d 4 . .
            . . 3 5 3 4 5 5 4 4 d d 4 4 . .
            . . 3 d 5 d 1 1 d 5 5 d 4 4 . .
            . . 4 5 5 1 1 1 1 5 1 1 5 4 . .
            . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 .
            . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 .
            . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 .
            . . 4 3 d 5 5 5 d 5 5 d d d 4 .
            . 4 5 5 d 5 5 5 d d d 5 5 4 . .
            . 4 5 5 d 3 5 d d 3 d 5 5 4 . .
            . 4 4 d d 4 d d d 4 3 d d 4 . .
            . . 4 5 4 4 4 4 4 4 4 4 4 . . .
            . 4 5 4 . . 4 4 4 . . . 4 4 . .
            . 4 4 . . . . . . . . . . 4 4 .
            `, img`
            . . . . 2 2 2 2 2 2 2 2 . . . .
            . . . 2 4 4 4 5 5 4 4 4 2 2 2 .
            . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 .
            . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2
            . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2
            2 4 5 5 d 5 5 5 d d d 5 5 5 4 4
            2 4 5 5 4 4 4 d 5 5 d 5 5 5 4 4
            4 4 4 4 . . 2 4 5 5 . . 4 4 4 4
            . . b b b b 2 4 4 2 b b b b . .
            . b d d d d 2 4 4 2 d d d d b .
            b d d b b b 2 4 4 2 b b b d d b
            b d d b b b b b b b b b b d d b
            b b d 1 1 3 1 1 d 1 d 1 1 d b b
            . . b b d d 1 1 3 d d 1 b b . .
            . . 2 2 4 4 4 4 4 4 4 4 2 2 . .
            . . . 2 2 4 4 4 4 4 2 2 2 . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . b b b b . . . . . .
            . . . . b b 1 1 1 1 b b . . . .
            . . . . b 1 1 1 3 3 1 b . . . .
            . . . b 1 1 1 1 3 3 3 1 b . . .
            . . . b 1 1 3 1 1 3 3 1 b . . .
            . . b d 1 1 1 1 1 1 1 1 d b . .
            . . b d 3 3 1 1 1 1 1 1 d b . .
            . . b b 3 3 1 1 1 1 3 3 d b . .
            . . c b b d 1 1 1 3 3 b d c . .
            . . c d d d d d d b b b d c . .
            . . c b d d b b d b b d b c . .
            . . . c d d b b d d d d c . . .
            . . . . c b d d d d b c . . . .
            . . . . . c c c c c c . . . . .
            `, img`
            . . . . . . c c c . . . . . . .
            . . . . . . c 5 b c . . . . . .
            . . . . c c c 5 5 c c c . . . .
            . . c c c c 5 5 5 5 c b c c . .
            . c b b 5 b 5 5 5 5 b 5 b b c .
            . c b 5 5 b b 5 5 b b 5 5 b c .
            . . c 5 5 5 b b b b 5 5 5 f . .
            . . f f 5 5 5 5 5 5 5 5 f f . .
            . . f f f b f e e f b f f f . .
            . . f f f 1 f b b f 1 f f f . .
            . . . f f b b b b b b f f . . .
            . . . e e f e e e e f e e . . .
            . . e b f b 5 b b 5 b c b e . .
            . . e e f 5 5 5 5 5 5 f e e . .
            . . . . c b 5 5 5 5 b c . . . .
            . . . . . f f f f f f . . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . c c c c . . . . . . . .
            . . c c 5 5 5 5 c c . . . . . .
            . c 5 5 5 5 5 5 5 5 c . . . . .
            c 5 5 5 5 5 1 f 5 5 5 c . . . .
            c 5 5 5 5 5 f f 5 5 5 5 c . . .
            c 5 5 5 5 5 5 5 5 5 5 5 c . . .
            c c b b 1 b 5 5 5 5 5 5 d c . .
            c 5 3 3 3 5 5 5 5 5 d d d c . .
            . b 5 5 5 5 5 5 5 5 d d d c . .
            . . c b b c 5 5 b d d d d c c .
            . c b b c 5 5 b b d d d d c d c
            . c c c c c c d d d d d d d d c
            . . . c c c c d 5 5 b d d d c .
            . . c c c c c b 5 5 b c c c . .
            . . c b b b c d 5 5 b c . . . .
            `, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . b b d d b b . . . . .
            . . . . b 1 1 3 3 1 1 b . . . .
            . . . . b 1 3 5 5 3 1 b . . . .
            . . . . b d 3 5 5 3 d b . . . .
            . . . . c 1 1 d d 1 1 c . . . .
            . . . . c d 1 d d 1 d c . . . .
            . . . . . c c 7 6 c c . . . . .
            . . . . . . 6 7 6 . . . . . . .
            . . . . . . 6 6 8 8 8 6 . . . .
            . . . . . . 6 8 7 7 7 6 . . . .
            . . . . . . 8 7 7 7 6 . . . . .
            . . . . . . 8 8 8 6 . . . . . .
        `];
    }

    export function getWaveformIcons(): Image[] {
        return [img`
            . . . . . . . . . . . . . . . . .
            . . . . c c . . . . . . . . . . .
            . . . c 1 1 c . . . . . . . . . .
            . . c 1 1 1 1 c . . . . . . . . .
            . c 1 1 c c 1 1 c . . . . . . . .
            . c 1 1 c c 1 1 c . . . . . . c .
            c 1 1 c . . c 1 1 c . . . . c 1 c
            c 1 1 c . . c 1 1 c . . . . c 1 c
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            c 1 c . . . . c 1 1 c . . c 1 1 c
            c 1 c . . . . c 1 1 c . . c 1 1 c
            . c . . . . . . c 1 1 c c 1 1 c .
            . . . . . . . . c 1 1 c c 1 1 c .
            . . . . . . . . . c 1 1 1 1 c . .
            . . . . . . . . . . c 1 1 c . . .
            . . . . . . . . . . . c c . . . .
            `, img`
            . . . . . . c . . . . . . . . . .
            . . . . . c 1 c . . . . . . . . .
            . . . . c 1 1 1 c . . . . . . c .
            . . . . c 1 1 1 c . . . . . c 1 c
            . . . c 1 1 1 1 1 c . . . c 1 1 c
            . . . c 1 1 1 1 1 c . . . c 1 1 c
            . . c 1 1 1 c 1 1 1 c . c 1 1 1 c
            . . c 1 1 1 c 1 1 1 c . c 1 1 1 c
            . c 1 1 1 c . c 1 1 1 c 1 1 1 c .
            . c 1 1 1 c . c 1 1 1 c 1 1 1 c .
            c 1 1 1 c . . . c 1 1 1 1 1 c . .
            c 1 1 1 c . . . c 1 1 1 1 1 c . .
            c 1 1 c . . . . . c 1 1 1 c . . .
            c 1 c . . . . . . c 1 1 1 c . . .
            . c . . . . . . . . c 1 c . . . .
            . . . . . . . . . . . c . . . . .
            `, img`
            . . . . . . . . . . . . . c . . .
            . . . . . . . . . . . . c 1 c . .
            . . . . . . . . . . . c 1 1 c . .
            . . . . . . . . . . c 1 1 1 c . .
            . . . . . . . . . c 1 1 1 1 c . .
            . . . . . . . . c 1 1 1 1 1 c . .
            . . . . . . . c 1 1 1 c 1 1 c . .
            . . . . . . c 1 1 1 c c 1 1 c . .
            . . . . . c 1 1 1 c . c 1 1 c . .
            . . . . c 1 1 1 c . . c 1 1 c . .
            . . . c 1 1 1 c . . . c 1 1 c . .
            . c c 1 1 1 c . . . . c 1 1 c c .
            c 1 1 1 1 c . . . . . c 1 1 1 1 c
            c 1 1 1 c . . . . . . c 1 1 1 1 c
            . c c c . . . . . . . . c c c c .
            . . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . . .
            . c c c c c c c c c . . . . . . .
            c 1 1 1 1 1 1 1 1 1 c . . . . . .
            c 1 1 1 1 1 1 1 1 1 c . . . . . .
            c 1 1 c c c c c 1 1 c . . . . . .
            c 1 1 c . . . c 1 1 c . . . c c .
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            c 1 1 c . . . c 1 1 c . . c 1 1 c
            . c c . . . . c 1 1 c . . c 1 1 c
            . . . . . . . c 1 1 c c c c 1 1 c
            . . . . . . . c 1 1 1 1 1 1 1 1 c
            . . . . . . . c 1 1 1 1 1 1 1 1 c
            . . . . . . . . c c c c c c c c .
            `, img`
            . . . . . . . . . . . . . . . . .
            . c c c c c c c c . . . . . . . .
            c 1 1 1 1 1 1 1 1 c . . . . . . .
            c 1 1 1 1 1 1 1 1 c . . . . . . .
            c 1 1 c c c c 1 1 c . . . . . . .
            c 1 1 c . . c 1 1 c . . . . c c .
            c 1 1 c . . c 1 1 c . . . c 1 1 c
            c 1 1 c . . c 1 1 c . . . c 1 1 c
            c 1 1 c . . c 1 1 c . . . c 1 1 c
            c 1 1 c . . c 1 1 c . . . c 1 1 c
            c 1 1 c . . c 1 1 c . . . c 1 1 c
            . c c . . . c 1 1 c . . . c 1 1 c
            . . . . . . c 1 1 c c c c c 1 1 c
            . . . . . . c 1 1 1 1 1 1 1 1 1 c
            . . . . . . c 1 1 1 1 1 1 1 1 1 c
            . . . . . . . c c c c c c c c c .
            `, img`
            . . . . . . . . . . . . . . . . .
            . c c c c c c c . . . . . . . . .
            c 1 1 1 1 1 1 1 c . . . . . . . .
            c 1 1 1 1 1 1 1 c . . . . . . . .
            c 1 1 c c c 1 1 c . . . . . . . .
            c 1 1 c . c 1 1 c . . . . . c c .
            c 1 1 c . c 1 1 c . . . . c 1 1 c
            c 1 1 c . c 1 1 c . . . . c 1 1 c
            c 1 1 c . c 1 1 c . . . . c 1 1 c
            c 1 1 c . c 1 1 c . . . . c 1 1 c
            c 1 1 c . c 1 1 c . . . . c 1 1 c
            . c c . . c 1 1 c . . . . c 1 1 c
            . . . . . c 1 1 c c c c c c 1 1 c
            . . . . . c 1 1 1 1 1 1 1 1 1 1 c
            . . . . . c 1 1 1 1 1 1 1 1 1 1 c
            . . . . . . c c c c c c c c c c .
            `, img`
            . . . . . . . . . . . . . . . . .
            . c c c c c c . . . . . . . . . .
            c 1 1 1 1 1 1 c . . . . . . . . .
            c 1 1 1 1 1 1 c . . . . . . . . .
            c 1 1 c c 1 1 c . . . . . . . . .
            c 1 1 c c 1 1 c . . . . . . c c .
            c 1 1 c c 1 1 c . . . . . c 1 1 c
            c 1 1 c c 1 1 c . . . . . c 1 1 c
            c 1 1 c c 1 1 c . . . . . c 1 1 c
            c 1 1 c c 1 1 c . . . . . c 1 1 c
            c 1 1 c c 1 1 c . . . . . c 1 1 c
            . c c . c 1 1 c . . . . . c 1 1 c
            . . . . c 1 1 c c c c c c c 1 1 c
            . . . . c 1 1 1 1 1 1 1 1 1 1 1 c
            . . . . c 1 1 1 1 1 1 1 1 1 1 1 c
            . . . . . c c c c c c c c c c c .
            `, img`
            . . . . . . . . . . . . . . . . .
            . c c c c c . . . . . . . . . . .
            c 1 1 1 1 1 c . . . . . . . . . .
            c 1 1 1 1 1 c . . . . . . . . . .
            c 1 1 c 1 1 c . . . . . . . . . .
            c 1 1 c 1 1 c . . . . . . . c c .
            c 1 1 c 1 1 c . . . . . . c 1 1 c
            c 1 1 c 1 1 c . . . . . . c 1 1 c
            c 1 1 c 1 1 c . . . . . . c 1 1 c
            c 1 1 c 1 1 c . . . . . . c 1 1 c
            c 1 1 c 1 1 c . . . . . . c 1 1 c
            . c c c 1 1 c . . . . . . c 1 1 c
            . . . c 1 1 c c c c c c c c 1 1 c
            . . . c 1 1 1 1 1 1 1 1 1 1 1 1 c
            . . . c 1 1 1 1 1 1 1 1 1 1 1 1 c
            . . . . c c c c c c c c c c c c .
            `, img`
            . . . . . . . . . . . . . . . . .
            . . . . . c c c c c c . . . . . .
            . . . . c 1 1 1 1 1 1 c . . c . .
            . . . . c 1 1 1 1 1 1 c . c 1 c .
            . c c c c 1 1 c c 1 1 c c 1 1 c .
            c 1 1 1 1 1 1 c c 1 1 c . c 1 c .
            c 1 1 1 1 1 1 c c 1 1 c . c 1 c .
            c 1 1 c c c c . c 1 1 c . c 1 c .
            c 1 1 c . . . . c 1 1 c c 1 1 1 c
            c 1 1 c . . . . c 1 1 c . c c c .
            c 1 1 c . . . . c 1 1 c c c c . .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            . c c . . . . . . c c c c c c . .
            . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . . .
            . . . . . c c c c c c . . . . . .
            . . . . c 1 1 1 1 1 1 c . . c . .
            . . . . c 1 1 1 1 1 1 c . c 1 c .
            . c c c c 1 1 c c 1 1 c c 1 c 1 c
            c 1 1 1 1 1 1 c c 1 1 c . c c 1 c
            c 1 1 1 1 1 1 c c 1 1 c . c 1 c .
            c 1 1 c c c c . c 1 1 c c 1 c c .
            c 1 1 c . . . . c 1 1 c c 1 1 1 c
            c 1 1 c . . . . c 1 1 c . c c c .
            c 1 1 c . . . . c 1 1 c c c c . .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            . c c . . . . . . c c c c c c . .
            . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . . .
            . . . . . c c c c c c . . . . . .
            . . . . c 1 1 1 1 1 1 c . . c . .
            . . . . c 1 1 1 1 1 1 c . c 1 c .
            . c c c c 1 1 c c 1 1 c c 1 c 1 c
            c 1 1 1 1 1 1 c c 1 1 c . c c 1 c
            c 1 1 1 1 1 1 c c 1 1 c . c 1 c .
            c 1 1 c c c c . c 1 1 c . c c 1 c
            c 1 1 c . . . . c 1 1 c c 1 1 c .
            c 1 1 c . . . . c 1 1 c . c c . .
            c 1 1 c . . . . c 1 1 c c c c . .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            . c c . . . . . . c c c c c c . .
            . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . . .
            . . . . . c c c c c c . . . . . .
            . . . . c 1 1 1 1 1 1 c . c . c .
            . . . . c 1 1 1 1 1 1 c c 1 c 1 c
            . c c c c 1 1 c c 1 1 c c 1 c 1 c
            c 1 1 1 1 1 1 c c 1 1 c c 1 c 1 c
            c 1 1 1 1 1 1 c c 1 1 c c 1 1 1 c
            c 1 1 c c c c . c 1 1 c . c c 1 c
            c 1 1 c . . . . c 1 1 c . . c 1 c
            c 1 1 c . . . . c 1 1 c . . . c .
            c 1 1 c . . . . c 1 1 c c c c . .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            c 1 1 c . . . . c 1 1 1 1 1 1 c .
            . c c . . . . . . c c c c c c . .
            . . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . . .
            `, img`
            . . . . . . . . . . . . . . . . .
            . . . . . . . c . . . . . c . . .
            . . . . . . c 1 c . . . c 1 c . .
            . . . c . . c 1 c . . . c 1 c . .
            . . c 1 c . c 1 c . . . c 1 c c .
            . . c 1 c c c 1 c c . c c 1 c 1 c
            . . c 1 c 1 c 1 c 1 c 1 c 1 c 1 c
            . c c 1 c 1 c 1 1 1 c 1 c 1 c 1 c
            c 1 c 1 1 1 c 1 1 1 1 1 c 1 c 1 c
            c 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 c
            c 1 1 1 1 1 1 1 c 1 c 1 1 c 1 1 c
            . c 1 c c 1 1 1 c 1 c 1 1 c 1 c .
            . c 1 c c 1 c 1 c 1 c 1 c . c . .
            . . c . c 1 c 1 c c c 1 c . . . .
            . . . . . c . c . . . c . . . . .
            . . . . . . . . . . . . . . . . .
        `]
    }
}