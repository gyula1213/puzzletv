import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 2: Azonos érték sudoku.
 *
 * The PZL source describes the links with sub-line entries. Here those links
 * are represented as sameValuePairs: both endpoints of each grey line must
 * contain the same digit.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Azonos érték sudoku 02",
        [LanguageCode.en]: "Same value sudoku 02",
    },
    author: "VS2026",
    slug: "vs2026-r2-p8-same-value-02",

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
                [LanguageCode.hu]: "Ha két mező vonallal van összekötve, akkor a két mezőbe ugyanazt a számot kell beírni.",
                [LanguageCode.en]: "If two cells are connected by a line, they must contain the same digit.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0],
        [0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0],
        [0, 0, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 5],
    ],

    sameValuePairs: [
        ["R2C2", "R3C1"],
        ["R2C3", "R3C4"],
        ["R2C5", "R3C6"],
        ["R4C3", "R5C2"],
        ["R4C6", "R5C5"],
        ["R5C4", "R6C3"],
    ],

    solution: [
        [1, 4, 2, 5, 6, 3],
        [5, 3, 6, 4, 1, 2],
        [3, 2, 4, 6, 5, 1],
        [6, 1, 5, 2, 3, 4],
        [2, 5, 3, 1, 4, 6],
        [4, 6, 1, 3, 2, 5],
    ],
};

export const VS2026R2P8SameValue02 = createPzlPuzzle(puzzleData);
