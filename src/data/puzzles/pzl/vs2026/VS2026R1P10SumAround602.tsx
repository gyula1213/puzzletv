import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 1: „Összeg a 6-os mellett” sudoku.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Összeg a 6-os mellett - 02",
        [LanguageCode.en]: "Sum around 6 — 02",
    },
    outsideClueType: "sum-around-6",
    author: "VS2026",
    slug: "vs2026-r1-p10-sum-around6-02",

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
        [2, 1, 4, 5, 3, 6],
        [6, 3, 5, 2, 4, 1],
        [3, 5, 6, 1, 2, 4],
        [1, 4, 2, 3, 6, 5],
        [5, 6, 3, 4, 1, 2],
        [4, 2, 1, 6, 5, 3],
    ],

    outsideClues: {
        top: [undefined, 6, 7, 4, 3, undefined],
        left: [undefined, 3, 6, 8, 8, 6],
    },
};

export const VS2026R1P10SumAround602 = createPzlPuzzle(puzzleData);
