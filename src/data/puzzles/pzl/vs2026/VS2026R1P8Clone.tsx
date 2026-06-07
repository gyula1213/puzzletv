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
        [LanguageCode.hu]: "Klón sudoku",
        [LanguageCode.en]: "Clone sudoku",
    },
    author: "VS2026",
    slug: "vs2026-r1-p8-clone",

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
        [0, 0, 0, 0, 8, 0, 1, 0, 2],
        [0, 0, 0, 0, 0, 3, 0, 7, 0],
        [0, 0, 0, 0, 0, 0, 9, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 6, 0, 0, 0, 0, 0],
        [9, 0, 1, 0, 5, 0, 0, 0, 0],
    ],

    solution: [
        [4, 7, 6, 5, 8, 9, 1, 3, 2],
        [1, 9, 5, 2, 6, 3, 4, 7, 8],
        [3, 2, 8, 1, 4, 7, 9, 5, 6],
        [6, 1, 3, 8, 2, 5, 7, 4, 9],
        [7, 5, 2, 3, 9, 4, 6, 8, 1],
        [8, 4, 9, 7, 1, 6, 5, 2, 3],
        [5, 6, 7, 9, 3, 2, 8, 1, 4],
        [2, 8, 4, 6, 7, 1, 3, 9, 5],
        [9, 3, 1, 4, 5, 8, 2, 6, 7],
    ],

    cloneRegions: [
        {
            cells: ["R1C3", "R2C3", "R3C1", "R3C2", "R3C3", "R3C4", "R3C5", "R4C3", "R5C3"],
        },
        {
            cells: ["R5C7", "R6C7", "R7C5", "R7C6", "R7C7", "R7C8", "R7C9", "R8C7", "R9C7"],
        },
    ],
};

export const VS2026R1P8Clone = createPzlPuzzle(puzzleData);
