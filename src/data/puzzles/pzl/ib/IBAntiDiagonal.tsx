import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: Anti-átlós sudoku.
 *
 * Type:sudoku-x
 * size:6;6
 * predef-symbol:?1
 *
 * The highlighted main diagonals may contain at most three different digits.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "IB: Anti-átlós sudoku",
    author: "Instruction Booklet",
    slug: "ib-anti-diagonal",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    antiDiagonal: true,

    rules: [
        "Normál 6x6-os sudoku szabályok érvényesek.",
        "A szürkével jelölt főátlókban csak három-három féle szám állhat.",
    ].join("\n"),

    predef: [
        [0, 2, 0, 0, 0, 0],
        [3, 0, 5, 0, 0, 0],
        [0, 1, 0, 0, 0, 2],
        [4, 0, 0, 0, 3, 0],
        [0, 0, 0, 5, 0, 6],
        [0, 0, 0, 0, 2, 0],
    ],

    solution: [
        [1, 2, 6, 4, 5, 3],
        [3, 4, 5, 2, 6, 1],
        [5, 1, 3, 6, 4, 2],
        [4, 6, 2, 1, 3, 5],
        [2, 3, 4, 5, 1, 6],
        [6, 5, 1, 3, 2, 4],
    ],
};

export const IBAntiDiagonal = createPzlPuzzle(puzzleData);
