import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * VS2026 round 2: Azonos paritás sudoku.
 *
 * Cells marked with a small square are listed in sameParityCells. Within each
 * normal 3x3 box, all marked cells must have the same parity.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Azonos paritás sudoku easy",
    author: "VS2026",
    slug: "vs2026-r2-p5-same-parity-easy",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    sameParityCells: [
        "R1C1", "R1C4", "R1C6",
        "R1C9", "R2C2", "R2C5",
        "R2C8", "R3C3", "R3C7",
        "R4C1", "R4C9", "R5C2",
        "R5C8", "R6C1", "R6C9",
        "R7C3", "R7C7", "R8C2",
        "R8C5", "R8C8", "R9C1",
        "R9C4", "R9C6", "R9C9",
    ],

    rules: [
        "Normál 9x9-es sudoku szabályok érvényesek.",
        "Minden régión belül a kis négyzettel megjelölt mezőkbe vagy csak páros, vagy csak páratlan számok kerülhetnek.",
    ].join("\n"),

    predef: [
        [0, 7, 0, 0, 2, 0, 0, 4, 0],
        [4, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 9, 0, 5, 0, 0, 0],
        [0, 0, 3, 0, 9, 0, 8, 0, 0],
        [1, 0, 0, 4, 0, 7, 0, 0, 3],
        [0, 0, 6, 0, 3, 0, 5, 0, 0],
        [0, 0, 0, 2, 0, 3, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0, 0, 5],
        [0, 2, 0, 0, 5, 0, 0, 9, 0],
    ],

    solution: [
        [5, 7, 8, 3, 2, 1, 6, 4, 9],
        [4, 3, 9, 6, 7, 8, 2, 5, 1],
        [2, 6, 1, 9, 4, 5, 7, 3, 8],
        [7, 4, 3, 5, 9, 6, 8, 1, 2],
        [1, 5, 2, 4, 8, 7, 9, 6, 3],
        [9, 8, 6, 1, 3, 2, 5, 7, 4],
        [6, 9, 5, 2, 1, 3, 4, 8, 7],
        [8, 1, 4, 7, 6, 9, 3, 2, 5],
        [3, 2, 7, 8, 5, 4, 1, 9, 6],
    ],
};

export const VS2026R2P5SameParityEasy = createPzlPuzzle(puzzleData);
