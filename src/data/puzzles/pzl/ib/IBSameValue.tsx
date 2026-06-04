import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * IB sample: Azonos érték sudoku.
 *
 * The PZL source describes the links with sub-line entries. Here those links
 * are represented as sameValuePairs: both endpoints of each grey line must
 * contain the same digit.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "IB: Azonos érték sudoku",
    author: "Instruction Booklet",
    slug: "ib-same-value",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    rules: [
        "Normál 6x6-os sudoku szabályok érvényesek.",
        "Ha két mező vonallal van összekötve, akkor a két mezőbe ugyanazt a számot kell beírni.",
    ].join("\n"),

    predef: [
        [5, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 2],
        [0, 0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0],
        [3, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 3],
    ],

    sameValuePairs: [
        ["R2C3", "R3C2"],
        ["R2C5", "R3C4"],
        ["R4C1", "R5C2"],
        ["R4C3", "R5C4"],
    ],

    solution: [
        [5, 2, 6, 3, 1, 4],
        [4, 1, 3, 6, 5, 2],
        [1, 3, 2, 5, 4, 6],
        [6, 5, 4, 2, 3, 1],
        [3, 6, 1, 4, 2, 5],
        [2, 4, 5, 1, 6, 3],
    ],
};

export const IBSameValue = createPzlPuzzle(puzzleData);
