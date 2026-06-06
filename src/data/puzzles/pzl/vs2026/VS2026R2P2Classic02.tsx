import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

const puzzleData: PzlGeneratedSudokuData = {
    title: "Classic 02",
    author: "VS2026",
    slug: "vs2026-r2-p2-classic-02",

    size: 9,

    rules: [
        "A klasszikus sudoku szabályai érvényesek.",
    ].join("\n"),

    predef: [
        [9, 0, 0, 0, 0, 0, 1, 3, 0],
        [0, 0, 0, 0, 9, 0, 0, 0, 7],
        [0, 0, 2, 0, 0, 5, 0, 0, 8],
        [0, 0, 0, 0, 5, 0, 2, 0, 0],
        [0, 4, 0, 6, 0, 7, 0, 9, 0],
        [0, 0, 3, 0, 2, 0, 0, 0, 0],
        [7, 0, 0, 3, 0, 0, 8, 0, 0],
        [6, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 8, 1, 0, 0, 0, 0, 0, 3],
    ],

    solution: [
        [9, 5, 8, 7, 6, 2, 1, 3, 4],
        [3, 1, 6, 8, 9, 4, 5, 2, 7],
        [4, 7, 2, 1, 3, 5, 9, 6, 8],
        [1, 9, 7, 4, 5, 3, 2, 8, 6],
        [2, 4, 5, 6, 8, 7, 3, 9, 1],
        [8, 6, 3, 9, 2, 1, 7, 4, 5],
        [7, 2, 4, 3, 1, 6, 8, 5, 9],
        [6, 3, 9, 5, 7, 8, 4, 1, 2],
        [5, 8, 1, 2, 4, 9, 6, 7, 3],
    ],
};

export const VS2026R2P2Classic02 = createPzlPuzzle(puzzleData);
