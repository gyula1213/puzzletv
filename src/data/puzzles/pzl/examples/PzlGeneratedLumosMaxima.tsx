import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * Generated-style Lumos Maxima test puzzle.
 *
 * This file is deliberately "dumb" and generator-friendly: only the data object
 * plus the final export line should live here. It is the shape that a later
 * PZL -> TSX generator can write mechanically.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "PZL Generated Lumos Maxima",
    author: "Chameleon / PZL import test",
    slug: "pzl-generated-lumos-maxima",
    size: 9,
    predef: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    solution: [
        [2, 1, 7, 6, 4, 8, 9, 3, 5],
        [5, 8, 9, 1, 3, 7, 4, 2, 6],
        [4, 3, 6, 2, 5, 9, 1, 8, 7],

        [1, 7, 2, 5, 8, 6, 3, 4, 9],
        [6, 4, 3, 9, 7, 1, 8, 5, 2],
        [9, 5, 8, 3, 2, 4, 7, 6, 1],

        [7, 9, 5, 4, 6, 3, 2, 1, 8],
        [8, 6, 4, 7, 1, 2, 5, 9, 3],
        [3, 2, 1, 8, 9, 5, 6, 7, 4],
    ],
    rules: [
        "Normal sudoku rules apply.",
        "Digits along an arrow sum to the number in the circle. Digits can repeat along arrows if allowed by other rules.",
        "Cells in cages must sum to the total given in the corner of the cage. Digits cannot repeat within a cage.",
        "The grid is covered with fog. There are two initial light sources that illuminate the darkness and clear the fog.",
    ].join("\n"),
    cages: [
        { cells: ["R1C1", "R1C2", "R2C1"], sum: 8 },
        { cells: ["R3C1", "R3C2", "R4C1"], sum: 8 },
        { cells: ["R1C3", "R2C3", "R2C4", "R3C3"], sum: 23 },
        { cells: ["R1C4", "R1C5", "R2C5", "R3C4", "R3C5", "R4C5", "R5C4", "R5C5", "R5C6"], sum: 45 },
        { cells: ["R1C6", "R1C7", "R1C8", "R1C9", "R2C9", "R3C9"], sum: 38 },
        { cells: ["R2C8", "R3C8", "R4C7", "R4C8", "R4C9"] },
    ],
    arrows: [
        { circle: "R6C1", line: ["R6C1", "R5C2", "R6C2"] },
        { circle: "R4C2", line: ["R4C2", "R4C3", "R4C4"] },
        { circle: "R6C7", line: ["R6C7", "R6C5", "R5C6"] },
        { circle: "R3C6", line: ["R3C6", "R4C6", "R4C7"] },
        { circle: "R8C3", line: ["R8C3", "R7C4"] },
        { circle: "R8C8", line: ["R8C8", "R7C8", "R7C6", "R8C6", "R8C5"] },
        { circle: "R4C9", line: ["R4C9", "R3C9", "R2C8"] },
    ],
    fog: {
        startCells3x3: ["R2C2", "R8C7"],
    },
};

export const PzlGeneratedLumosMaxima = createPzlPuzzle(puzzleData);
