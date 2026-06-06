import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: Amorf sudoku.
 *
 * Note: the PZL solution row 2 was probably mistyped as 2;6;2;3;5;4.
 * The IB image shows 2;6;1;3;5;4, so this TSX uses the image value.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        hu: "IB: Amorf sudoku",
        en: "IB: Jigsaw sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-jigsaw",

    size: 6,

    rules: {
        hu: [
            "Normál 6x6-os sudoku szabályok érvényesek.",
            "A területek szabálytalan alakúak.",
        ].join("\n"),
        en: [
            "Normal 6x6 sudoku rules apply.",
            "The regions have irregular shapes.",
        ].join("\n"),
    },

    regions: [
        [1, 1, 1, 2, 2, 2],
        [1, 1, 1, 3, 2, 2],
        [3, 3, 3, 3, 4, 2],
        [5, 3, 4, 4, 4, 4],
        [5, 5, 4, 6, 6, 6],
        [5, 5, 5, 6, 6, 6],
    ],

    predef: [
        [0, 0, 0, 0, 0, 6],
        [0, 0, 0, 0, 5, 0],
        [6, 0, 0, 4, 0, 0],
        [0, 0, 3, 0, 0, 5],
        [0, 2, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
    ],

    solution: [
        [3, 4, 5, 1, 2, 6],
        [2, 6, 1, 3, 5, 4],
        [6, 5, 2, 4, 1, 3],
        [4, 1, 3, 2, 6, 5],
        [5, 2, 4, 6, 3, 1],
        [1, 3, 6, 5, 4, 2],
    ],
};

export const IBJigsaw = createPzlPuzzle(puzzleData);
