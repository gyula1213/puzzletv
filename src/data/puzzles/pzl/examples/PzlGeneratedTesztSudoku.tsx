import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

/**
 * This file is deliberately "dumb" and generator-friendly.
 *
 * Intended future source:
 *   .pzl
 *     -> generated .tsx like this
 *     -> PuzzleTV
 *
 * It should contain only a plain data object plus the final export line.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: "Érettségi találkozó, 2026",
    author: "Gyula Slenker",
    slug: "pzl-generated-teszt-sudoku",
    size: 9,
    rules: "Normal sudoku rules apply.",
    predef: [
        [0, 6, 0, 0, 0, 0, 0, 4, 5],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 2, 0, 5, 8, 3, 0],

        [0, 7, 6, 5, 0, 8, 0, 0, 0],
        [0, 0, 0, 6, 0, 3, 0, 0, 0],
        [1, 0, 0, 7, 0, 2, 6, 5, 0],

        [0, 9, 0, 4, 0, 0, 0, 7, 0],
        [0, 0, 8, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 7, 9, 2, 0],
    ],
    solution: [
        [8, 6, 2, 9, 3, 1, 7, 4, 5],
        [3, 1, 5, 8, 7, 4, 2, 6, 9],
        [9, 4, 7, 2, 6, 5, 8, 3, 1],

        [4, 7, 6, 5, 1, 8, 3, 9, 2],
        [5, 2, 9, 6, 4, 3, 1, 8, 7],
        [1, 8, 3, 7, 9, 2, 6, 5, 4],

        [2, 9, 1, 4, 8, 6, 5, 7, 3],
        [7, 5, 8, 3, 2, 9, 4, 1, 6],
        [6, 3, 4, 1, 5, 7, 9, 2, 8],
    ],
};

export const PzlGeneratedTesztSudoku = createPzlPuzzle(puzzleData);
