import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Klasszikus sudoku - 02",
        [LanguageCode.en]: "Classic sudoku - 02",
    },
    author: "VS2026",
    slug: "vs2026-r1-p2-classic-02",

    size: 9,

    rules: () => (
        <>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "A klasszikus sudoku szabályai érvényesek.",
                [LanguageCode.en]: "Classic sudoku rules apply.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 8, 0, 1, 0, 2, 0, 0],
        [0, 0, 0, 9, 0, 6, 0, 0, 0],
        [9, 0, 0, 0, 4, 0, 0, 0, 6],
        [0, 8, 0, 0, 0, 0, 0, 3, 0],
        [3, 0, 7, 0, 2, 0, 1, 0, 9],
        [0, 4, 0, 0, 0, 0, 0, 7, 0],
        [6, 0, 0, 0, 9, 0, 0, 0, 8],
        [0, 0, 0, 3, 0, 4, 0, 0, 0],
        [0, 0, 4, 0, 7, 0, 3, 0, 0],
    ],

    solution: [
        [4, 6, 8, 7, 1, 5, 2, 9, 3],
        [7, 3, 2, 9, 8, 6, 5, 1, 4],
        [9, 1, 5, 2, 4, 3, 7, 8, 6],
        [1, 8, 9, 4, 5, 7, 6, 3, 2],
        [3, 5, 7, 6, 2, 8, 1, 4, 9],
        [2, 4, 6, 1, 3, 9, 8, 7, 5],
        [6, 7, 3, 5, 9, 1, 4, 2, 8],
        [8, 2, 1, 3, 6, 4, 9, 5, 7],
        [5, 9, 4, 8, 7, 2, 3, 6, 1],
    ],
};

export const VS2026R1P2Classic02 = createPzlPuzzle(puzzleData);
