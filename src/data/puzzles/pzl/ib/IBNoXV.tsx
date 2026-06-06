import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: No XV sudoku.
 *
 * Type:sudoku
 * size:6;6
 * predef-symbol:?1
 *
 * Orthogonally adjacent cells may not sum to 5 or 10.
 * There are no X/V marks in this sample; the rule is global.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        hu: "IB: No XV sudoku",
        en: "IB: No XV sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-no-xv",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    noXV: true,

    rules: {
        hu: [
            "Normál 6x6-os sudoku szabályok érvényesek.",
            "Ortogonálisan szomszédos mezők összege nem lehet 5 és nem lehet 10.",
        ].join("\n"),
        en: [
            "Normal 6x6 sudoku rules apply.",
            "Orthogonally adjacent cells may not contain two digits summing to 5 or 10.",
        ].join("\n"),
    },

    predef: [
        [0, 0, 4, 0, 6, 0],
        [0, 6, 0, 4, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [4, 0, 2, 0, 1, 0],
        [0, 1, 0, 2, 0, 0],
    ],

    solution: [
        [1, 2, 4, 3, 6, 5],
        [5, 6, 3, 4, 2, 1],
        [6, 3, 1, 5, 4, 2],
        [2, 4, 5, 1, 3, 6],
        [4, 5, 2, 6, 1, 3],
        [3, 1, 6, 2, 5, 4],
    ],
};

export const IBNoXV = createPzlPuzzle(puzzleData);
