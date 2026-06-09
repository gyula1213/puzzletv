import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 1: Klón sudoku.
 *
 * The two grey areas are clones: cells in the same relative position must
 * contain the same digit.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Klón sudoku - 01",
        [LanguageCode.en]: "Clone sudoku - 01",
    },
    author: "VS2026",
    slug: "vs2026-r1-p7-clone-01",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    rules: () => (
        <>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "Normál 9x9-es sudoku szabályok érvényesek.",
                [LanguageCode.en]: "Normal 9x9 sudoku rules apply.",
            })}
        </RulesParagraph>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "A két szürke területben azonos pozícióban ugyanazok a számjegyek állnak.",
                [LanguageCode.en]: "The two grey areas are clones: cells in the same relative position contain the same digit.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [4, 0, 1, 0, 5, 0, 0, 7, 0],
        [0, 8, 0, 4, 0, 0, 0, 0, 6],
        [5, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 6, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 9, 0],
        [0, 0, 0, 0, 0, 0, 9, 0, 8],
        [1, 0, 0, 0, 0, 3, 0, 4, 0],
        [0, 2, 0, 0, 8, 0, 5, 0, 7],
    ],

    solution: [
        [4, 6, 1, 3, 5, 2, 8, 7, 9],
        [7, 8, 2, 4, 1, 9, 3, 5, 6],
        [5, 9, 3, 8, 7, 6, 1, 2, 4],
        [8, 4, 5, 9, 3, 7, 2, 6, 1],
        [2, 1, 9, 5, 6, 4, 7, 8, 3],
        [3, 7, 6, 1, 2, 8, 4, 9, 5],
        [6, 3, 7, 2, 4, 5, 9, 1, 8],
        [1, 5, 8, 7, 9, 3, 6, 4, 2],
        [9, 2, 4, 6, 8, 1, 5, 3, 7],
    ],

    cloneRegions: [
        {
            cells: ["R2C6", "R3C6", "R3C7", "R3C8", "R4C5", "R4C6", "R4C7", "R5C7"],
        },
        {
            cells: ["R5C3", "R6C3", "R6C4", "R6C5", "R7C2", "R7C3", "R7C4", "R8C4"],
        },
    ],
};

export const VS2026R1P7Clone01 = createPzlPuzzle(puzzleData);
