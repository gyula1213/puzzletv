import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * VS2026 round 1: „Összeg a 6-os mellett” sudoku.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Összeg a 6-os mellett 01",
    author: "VS2026",
    slug: "vs2026-r1-p9-sum-around6-01",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    rules: [
        "Normál 6x6-os sudoku szabályok érvényesek.",
        "Az ábra mellé írt számok az adott sorban/oszlopban a 6-os mellett lévő egy vagy két szám összegét jelentik.",
    ].join("\n"),

    predef: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [6, 4, 3, 2, 1, 5],
        [2, 5, 1, 6, 4, 3],
        [5, 1, 4, 3, 2, 6],
        [3, 6, 2, 4, 5, 1],
        [4, 3, 5, 1, 6, 2],
        [1, 2, 6, 5, 3, 4],
    ],

    outsideClues: {
        top: [2, 4, 5, 5, 8, 4],
        left: [4, 5, 2, 5, 3, 7],
    },
};

export const VS2026R1P9SumAround601 = createPzlPuzzle(puzzleData);
