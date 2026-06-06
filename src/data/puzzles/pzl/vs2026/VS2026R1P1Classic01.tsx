import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

const puzzleData: PzlGeneratedSudokuData = {
    title: "Classic 01",
    author: "VS2026",
    slug: "vs2026-r1-p1-classic-01",

    size: 9,

    rules: [
        "A klasszikus sudoku szabályai érvényesek.",
    ].join("\n"),

    predef: [
        [5, 8, 0, 0, 3, 0, 0, 1, 2],
        [6, 0, 0, 4, 0, 2, 0, 0, 8],
        [0, 0, 2, 0, 0, 0, 4, 0, 0],
        [0, 5, 0, 0, 4, 0, 0, 3, 0],
        [9, 0, 0, 1, 0, 3, 0, 0, 5],
        [0, 7, 0, 0, 8, 0, 0, 4, 0],
        [0, 0, 3, 0, 0, 0, 2, 0, 0],
        [8, 0, 0, 3, 0, 7, 0, 0, 4],
        [7, 1, 0, 0, 2, 0, 0, 6, 9],
    ],

    solution: [
        [5, 8, 4, 7, 3, 9, 6, 1, 2],
        [6, 3, 7, 4, 1, 2, 5, 9, 8],
        [1, 9, 2, 6, 5, 8, 4, 7, 3],
        [2, 5, 8, 9, 4, 6, 7, 3, 1],
        [9, 4, 6, 1, 7, 3, 8, 2, 5],
        [3, 7, 1, 2, 8, 5, 9, 4, 6],
        [4, 6, 3, 5, 9, 1, 2, 8, 7],
        [8, 2, 9, 3, 6, 7, 1, 5, 4],
        [7, 1, 5, 8, 2, 4, 3, 6, 9],
    ],
};

export const VS2026R1P1Classic01 = createPzlPuzzle(puzzleData);
