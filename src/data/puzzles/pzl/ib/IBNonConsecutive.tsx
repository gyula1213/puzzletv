import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: Nem szomszédos sudoku.
 *
 * Type:sudoku
 * size:6;6
 *
 * Orthogonally adjacent cells may not contain consecutive digits.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        hu: "IB: Nem szomszédos sudoku",
        en: "IB: Non-consecutive sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-non-consecutive",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    nonConsecutive: true,

    rules: {
        hu: [
            "Normál 6x6-os sudoku szabályok érvényesek.",
            "Ortogonálisan szomszédos mezőkben nem állhat két egymást követő szám.",
        ].join("\n"),
        en: [
            "Normal 6x6 sudoku rules apply.",
            "Orthogonally adjacent cells may not contain consecutive digits.",
        ].join("\n"),
    },

    predef: [
        [4, 0, 0, 0, 0, 0],
        [0, 3, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 5, 0],
        [0, 0, 0, 0, 0, 4],
    ],

    solution: [
        [4, 6, 2, 5, 1, 3],
        [1, 3, 5, 2, 4, 6],
        [3, 5, 1, 4, 6, 2],
        [6, 2, 4, 1, 3, 5],
        [2, 4, 6, 3, 5, 1],
        [5, 1, 3, 6, 2, 4],
    ],
};

export const IBNonConsecutive = createPzlPuzzle(puzzleData);
