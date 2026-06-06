import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * VS2026 round 1: Hazudós sudoku.
 *
 * The small clue in a cell is false by exactly one:
 * the actual digit must be one smaller or one larger than the clue.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Hazudós sudoku",
    author: "VS2026",
    slug: "vs2026-r1-p6-liar",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    rules: [
        "Normál 9x9-es sudoku szabályok érvényesek.",
        "Minden jelölt mezőbe a megadott számnál eggyel kisebb vagy eggyel nagyobb számot kell írni.",
    ].join("\n"),

    predef: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [4, 8, 1, 7, 2, 3, 5, 6, 9],
        [2, 7, 5, 6, 9, 1, 8, 3, 4],
        [9, 6, 3, 4, 5, 8, 7, 2, 1],
        [1, 3, 2, 5, 7, 4, 6, 9, 8],
        [7, 4, 9, 8, 3, 6, 1, 5, 2],
        [8, 5, 6, 9, 1, 2, 4, 7, 3],
        [5, 2, 7, 1, 4, 9, 3, 8, 6],
        [3, 1, 8, 2, 6, 7, 9, 4, 5],
        [6, 9, 4, 3, 8, 5, 2, 1, 7],
    ],

    liarCells: [
        { cell: "R1C1", value: 5 },
        { cell: "R1C2", value: 7 },
        { cell: "R1C5", value: 3 },
        { cell: "R1C8", value: 5 },
        { cell: "R1C9", value: 8 },
        { cell: "R2C1", value: 3 },
        { cell: "R2C9", value: 5 },
        { cell: "R3C3", value: 4 },
        { cell: "R3C4", value: 5 },
        { cell: "R3C5", value: 4 },
        { cell: "R3C6", value: 7 },
        { cell: "R3C7", value: 8 },
        { cell: "R4C3", value: 3 },
        { cell: "R4C5", value: 6 },
        { cell: "R4C7", value: 7 },
        { cell: "R5C1", value: 8 },
        { cell: "R5C3", value: 8 },
        { cell: "R5C4", value: 7 },
        { cell: "R5C5", value: 2 },
        { cell: "R5C6", value: 5 },
        { cell: "R5C7", value: 2 },
        { cell: "R5C9", value: 3 },
        { cell: "R6C3", value: 5 },
        { cell: "R6C5", value: 2 },
        { cell: "R6C7", value: 5 },
        { cell: "R7C3", value: 6 },
        { cell: "R7C4", value: 2 },
        { cell: "R7C5", value: 3 },
        { cell: "R7C6", value: 8 },
        { cell: "R7C7", value: 2 },
        { cell: "R8C1", value: 4 },
        { cell: "R8C9", value: 4 },
        { cell: "R9C1", value: 7 },
        { cell: "R9C2", value: 8 },
        { cell: "R9C5", value: 7 },
        { cell: "R9C8", value: 2 },
        { cell: "R9C9", value: 8 },
    ],
};

export const VS2026R1P6Liar = createPzlPuzzle(puzzleData);
