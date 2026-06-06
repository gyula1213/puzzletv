import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: Klón sudoku.
 *
 * The two grey areas are clones: cells in the same relative position must
 * contain the same digit.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        hu: "IB: Klón sudoku",
        en: "IB: Clone sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-clone",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    rules: {
        hu: [
            "Normál 6x6-os sudoku szabályok érvényesek.",
            "A két szürke területben azonos pozícióban ugyanazok a számjegyek állnak.",
        ].join("\n"),
        en: [
            "Normal 6x6 sudoku rules apply.",
            "The two grey areas are clones: cells in the same relative position contain the same digit.",
        ].join("\n"),
    },

    predef: [
        [5, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 3, 0],
        [0, 0, 0, 4, 0, 0],
        [0, 0, 2, 0, 0, 0],
        [0, 3, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 6],
    ],

    solution: [
        [5, 2, 3, 6, 1, 4],
        [4, 6, 1, 2, 3, 5],
        [1, 5, 6, 4, 2, 3],
        [3, 4, 2, 5, 6, 1],
        [6, 3, 4, 1, 5, 2],
        [2, 1, 5, 3, 4, 6],
    ],

    cloneRegions: [
        {
            cells: ["R2C2", "R2C3", "R3C1", "R3C2", "R4C1"],
        },
        {
            cells: ["R4C5", "R4C6", "R5C4", "R5C5", "R6C4"],
        },
    ],
};

export const IBClone = createPzlPuzzle(puzzleData);
