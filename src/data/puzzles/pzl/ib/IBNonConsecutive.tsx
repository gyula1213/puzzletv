import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
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
        [LanguageCode.hu]: "IB: Nem szomszédos sudoku",
        [LanguageCode.en]: "IB: Non-consecutive sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-non-consecutive",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    nonConsecutive: true,

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
                [LanguageCode.hu]: "Ortogonálisan szomszédos mezőkben nem állhat két egymást követő szám.",
                [LanguageCode.en]: "Orthogonally adjacent cells may not contain consecutive digits.",
            })}
        </RulesParagraph>
        </>
    ),

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
