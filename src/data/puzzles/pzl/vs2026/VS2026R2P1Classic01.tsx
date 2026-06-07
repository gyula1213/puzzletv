import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Klasszikus sudoku 01",
        [LanguageCode.en]: "Classic sudoku 01",
    },
    author: "VS2026",
    slug: "vs2026-r2-p1-classic-01",

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
        [4, 0, 2, 0, 0, 0, 0, 5, 0],
        [0, 1, 0, 0, 2, 0, 0, 0, 7],
        [6, 0, 0, 8, 0, 4, 0, 0, 0],
        [0, 0, 9, 0, 6, 0, 5, 0, 0],
        [0, 4, 0, 3, 0, 9, 0, 8, 0],
        [0, 0, 5, 0, 4, 0, 7, 0, 0],
        [0, 0, 0, 2, 0, 3, 0, 0, 9],
        [2, 0, 0, 0, 9, 0, 0, 3, 0],
        [0, 6, 0, 0, 0, 0, 1, 0, 4],
    ],

    solution: [
        [4, 9, 2, 6, 7, 1, 3, 5, 8],
        [3, 1, 8, 9, 2, 5, 4, 6, 7],
        [6, 5, 7, 8, 3, 4, 9, 1, 2],
        [1, 2, 9, 7, 6, 8, 5, 4, 3],
        [7, 4, 6, 3, 5, 9, 2, 8, 1],
        [8, 3, 5, 1, 4, 2, 7, 9, 6],
        [5, 8, 4, 2, 1, 3, 6, 7, 9],
        [2, 7, 1, 4, 9, 6, 8, 3, 5],
        [9, 6, 3, 5, 8, 7, 1, 2, 4],
    ],
};

export const VS2026R2P1Classic01 = createPzlPuzzle(puzzleData);
