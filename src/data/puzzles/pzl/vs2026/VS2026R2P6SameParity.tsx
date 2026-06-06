import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * VS2026 round 2: Azonos paritás sudoku.
 *
 * Cells marked with a small square are listed in sameParityCells. Within each
 * normal 3x3 box, all marked cells must have the same parity.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Azonos paritás sudoku",
    author: "VS2026",
    slug: "vs2026-r2-p6-same-parity",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    sameParityCells: [
        "R1C1", "R1C4", "R1C6",
        "R1C9", "R2C3", "R2C7",
        "R3C2", "R3C5", "R3C8",
        "R4C1", "R4C9", "R5C3",
        "R5C7", "R6C1", "R6C9",
        "R7C2", "R7C5", "R7C8",
        "R8C3", "R8C7", "R9C1",
        "R9C4", "R9C6", "R9C9",
    ],

    rules: [
        "Normál 9x9-es sudoku szabályok érvényesek.",
        "Minden régión belül a kis négyzettel megjelölt mezőkbe vagy csak páros, vagy csak páratlan számok kerülhetnek.",
    ].join("\n"),

    predef: [
        [0, 0, 3, 0, 0, 0, 4, 0, 0],
        [0, 7, 0, 0, 4, 0, 0, 8, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 7],
        [0, 0, 0, 6, 0, 9, 0, 0, 0],
        [0, 8, 0, 0, 7, 0, 0, 1, 0],
        [0, 0, 0, 8, 0, 3, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 3],
        [0, 3, 0, 0, 2, 0, 0, 5, 0],
        [0, 0, 5, 0, 0, 0, 1, 0, 0],
    ],

    solution: [
        [8, 9, 3, 7, 6, 5, 4, 2, 1],
        [5, 7, 2, 9, 4, 1, 3, 8, 6],
        [6, 4, 1, 2, 3, 8, 5, 9, 7],
        [7, 5, 4, 6, 1, 9, 2, 3, 8],
        [3, 8, 9, 4, 7, 2, 6, 1, 5],
        [1, 2, 6, 8, 5, 3, 9, 7, 4],
        [2, 1, 8, 5, 9, 4, 7, 6, 3],
        [4, 3, 7, 1, 2, 6, 8, 5, 9],
        [9, 6, 5, 3, 8, 7, 1, 4, 2],
    ],
};

export const VS2026R2P6SameParity = createPzlPuzzle(puzzleData);
