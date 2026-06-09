import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: „Összeg a 6-os mellett” sudoku.
 *
 * PZL source:
 * Type:sudoku
 * size:6;6
 * Info-up:
 * 3;7;5;2;5;9
 * Info-left:
 * 1;3;5;2;4;8
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Összeg a 6-os mellett",
        [LanguageCode.en]: "IB: Sum around 6",
    },
    outsideClueType: "sum-around-6",
    author: "Instruction Booklet",
    slug: "ib-sum-around-6",

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
                [LanguageCode.hu]: "Az ábra mellé írt számok az adott sorban/oszlopban a 6-os mellett lévő egy vagy két szám összegét jelentik.",
                [LanguageCode.en]: "Outside clues show the sum of the one or two digits next to the 6 in the corresponding row or column.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [6, 1, 2, 5, 4, 3],
        [3, 5, 4, 1, 6, 2],
        [4, 2, 6, 3, 1, 5],
        [5, 3, 1, 4, 2, 6],
        [1, 6, 3, 2, 5, 4],
        [2, 4, 5, 6, 3, 1],
    ],

    outsideClues: {
        top: [3, 7, 5, 2, 5, 9],
        left: [1, 3, 5, 2, 4, 8],
    },
};

export const IBSumAround6 = createPzlPuzzle(puzzleData);
