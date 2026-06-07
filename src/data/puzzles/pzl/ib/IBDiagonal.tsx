import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Átlós sudoku.
 *
 * Type:sudoku-x
 * size:6;6
 *
 * The only difference from a normal sudoku is that both main diagonals must also
 * contain different digits. The diagonal cells are highlighted in light grey.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Átlós sudoku",
        [LanguageCode.en]: "IB: Diagonal sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-diagonal",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    diagonal: true,

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
                [LanguageCode.hu]: "A két főátló mezőiben is különböző számoknak kell állniuk.",
                [LanguageCode.en]: "Digits must also be different on both main diagonals.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 6, 3, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 6, 0],
        [0, 4, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 2, 5, 0, 0],
    ],

    solution: [
        [4, 2, 6, 3, 5, 1],
        [1, 5, 3, 6, 2, 4],
        [2, 3, 1, 4, 6, 5],
        [6, 4, 5, 2, 1, 3],
        [5, 6, 4, 1, 3, 2],
        [3, 1, 2, 5, 4, 6],
    ],
};

export const IBDiagonal = createPzlPuzzle(puzzleData);
