import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Klasszikus sudoku - 03",
        [LanguageCode.en]: "Classic sudoku - 03",
    },
    author: "VS2026",
    slug: "vs2026-r1-p3-classic-03",

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
        [1, 0, 0, 0, 0, 3, 0, 0, 0],
        [0, 8, 6, 0, 0, 0, 4, 0, 0],
        [0, 9, 0, 0, 0, 6, 7, 5, 0],
        [0, 0, 0, 0, 0, 7, 8, 0, 5],
        [0, 0, 0, 0, 5, 0, 0, 0, 0],
        [9, 0, 8, 4, 0, 0, 0, 0, 0],
        [0, 3, 5, 1, 0, 0, 0, 7, 0],
        [0, 0, 4, 0, 0, 0, 3, 8, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 1],
    ],

    solution: [
        [1, 7, 2, 5, 4, 3, 9, 6, 8],
        [5, 8, 6, 9, 7, 2, 4, 1, 3],
        [4, 9, 3, 8, 1, 6, 7, 5, 2],
        [6, 2, 1, 3, 9, 7, 8, 4, 5],
        [3, 4, 7, 2, 5, 8, 1, 9, 6],
        [9, 5, 8, 4, 6, 1, 2, 3, 7],
        [2, 3, 5, 1, 8, 9, 6, 7, 4],
        [7, 1, 4, 6, 2, 5, 3, 8, 9],
        [8, 6, 9, 7, 3, 4, 5, 2, 1],
    ],
};

export const VS2026R1P3Classic03 = createPzlPuzzle(puzzleData);
