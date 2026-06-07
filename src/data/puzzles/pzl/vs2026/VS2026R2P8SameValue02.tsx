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
        [0, 2, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0],
        [0, 0, 0, 4, 0, 0],
        [0, 0, 0, 0, 0, 6],
        [0, 0, 0, 0, 1, 0],
    ],

    sameValuePairs: [
        ["R2C3", "R3C2"],
        ["R1C3", "R2C4"],
        ["R4C5", "R5C4"],
        ["R4C1", "R5C2"],
    ],

    solution: [
        [6, 2, 5, 1, 3, 4],
        [1, 3, 4, 5, 6, 2],
        [2, 4, 3, 6, 5, 1],
        [5, 1, 6, 4, 2, 3],
        [3, 5, 1, 2, 4, 6],
        [4, 6, 2, 3, 1, 5],
    ],
};

export const VS2026R2P8SameValue02 = createPzlPuzzle(puzzleData);
