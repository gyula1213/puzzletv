import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Klón sudoku.
 *
 * The two grey areas are clones: cells in the same relative position must
 * contain the same digit.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Klón sudoku",
        [LanguageCode.en]: "IB: Clone sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-clone",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    rules: () => (
        <>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "Normál 6x6-os sudoku szabályok érvényesek.",
                [LanguageCode.en]: "Normal 6x6 sudoku rules apply.",
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
