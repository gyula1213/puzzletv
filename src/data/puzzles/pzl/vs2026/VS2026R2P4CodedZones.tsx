import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * VS2026 round 2: Kódolt zónák sudoku.
 *
 * The PZL "sub-region" map describes the dotted cages.
 * The matching "info-cell" letters identify which disconnected zones must
 * contain exactly the same multiset of digits.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Kódolt zónák sudoku",
    author: "VS2026",
    slug: "vs2026-r2-p4-coded-zones",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    rules: [
        "Normál 9x9-es sudoku szabályok érvényesek.",
        "Az azonos betűvel jelölt területekben ugyanazoknak a számoknak kell állniuk.",
        "Például ha az egyik A területben 1, 1, 4 és 5 áll, akkor a másik A területben is pontosan ez a négy számjegy szerepel.",
    ].join("\n"),

    predef: [
        [5, 0, 0, 0, 3, 0, 0, 0, 4],
        [0, 0, 2, 0, 0, 0, 7, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 7, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 9, 0],
        [0, 0, 6, 0, 0, 0, 5, 0, 0],
        [4, 0, 0, 0, 6, 0, 0, 0, 7],
    ],

    solution: [
        [5, 7, 8, 9, 3, 2, 6, 1, 4],
        [3, 4, 2, 6, 8, 1, 7, 5, 9],
        [6, 1, 9, 7, 4, 5, 2, 3, 8],
        [9, 6, 3, 1, 2, 8, 4, 7, 5],
        [8, 5, 4, 3, 7, 9, 1, 6, 2],
        [1, 2, 7, 4, 5, 6, 9, 8, 3],
        [7, 8, 5, 2, 1, 4, 3, 9, 6],
        [2, 3, 6, 8, 9, 7, 5, 4, 1],
        [4, 9, 1, 5, 6, 3, 8, 2, 7],
    ],

    cages: [
        { sum: "A", cells: ["R3C3", "R4C3"] },
        { sum: "B", cells: ["R3C4", "R3C5"] },
        { sum: "C", cells: ["R3C6", "R3C7"] },
        { sum: "D", cells: ["R4C7", "R5C7"] },
        { sum: "A", cells: ["R6C7", "R7C7"] },
        { sum: "D", cells: ["R7C5", "R7C6"] },
        { sum: "C", cells: ["R7C3", "R7C4"] },
        { sum: "B", cells: ["R5C3", "R6C3"] },
    ],

    codedZones: [
        {
            label: "A",
            zones: [
                ["R3C3", "R4C3"],
                ["R6C7", "R7C7"],
            ],
        },
        {
            label: "B",
            zones: [
                ["R3C4", "R3C5"],
                ["R5C3", "R6C3"],
            ],
        },
        {
            label: "C",
            zones: [
                ["R3C6", "R3C7"],
                ["R7C3", "R7C4"],
            ],
        },
        {
            label: "D",
            zones: [
                ["R4C7", "R5C7"],
                ["R7C5", "R7C6"],
            ],
        },
    ],
};

export const VS2026R2P4CodedZones = createPzlPuzzle(puzzleData);
