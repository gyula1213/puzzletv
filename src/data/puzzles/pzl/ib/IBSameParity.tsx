import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Azonos paritás sudoku.
 *
 * Type:sudoku
 * size:6;6
 *
 * Cells marked with a small square are listed in sameParityCells. Within each
 * normal 3x2 box of this 6x6 sample, all marked cells must have the same parity.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Azonos paritás sudoku",
        [LanguageCode.en]: "IB: Same parity sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-same-parity",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    sameParityCells: [
        "R1C2", "R1C5",
        "R2C1", "R2C6",
        "R3C3", "R3C4",
        "R4C3", "R4C4",
        "R5C1", "R5C6",
        "R6C2", "R6C5",
    ],

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
                [LanguageCode.hu]: "Minden régión belül a kis négyzettel megjelölt mezőkbe vagy csak páros, vagy csak páratlan számok kerülhetnek.",
                [LanguageCode.en]: "Within each region, all cells marked with a small square must contain digits of the same parity: either all even or all odd.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 5, 2, 0, 0],
        [0, 4, 0, 0, 3, 0],
        [0, 2, 0, 0, 5, 0],
        [0, 0, 2, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [2, 3, 4, 5, 1, 6],
        [1, 6, 5, 2, 4, 3],
        [5, 4, 1, 6, 3, 2],
        [6, 2, 3, 4, 5, 1],
        [3, 5, 2, 1, 6, 4],
        [4, 1, 6, 3, 2, 5],
    ],
};

export const IBSameParity = createPzlPuzzle(puzzleData);
