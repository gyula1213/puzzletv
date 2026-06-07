import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 1: Japán páros-páratlan összegek.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Japán páros-páratlan összegek",
        [LanguageCode.en]: "Japanese even/odd sums",
    },
    author: "VS2026",
    slug: "vs2026-r1-p11-japanese-sums-oe",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

    outsideClueType: "japanese-even-odd-sums",

    rules: () => (
        <>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "Normál 9x9-es sudoku szabályok érvényesek.",
                [LanguageCode.en]: "Normal 9x9 sudoku rules apply.",
            })}
        </RulesParagraph>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "A felül lévő számok az adott oszlopban lévő páros számok összegét mutatják blokkonként.",
                [LanguageCode.en]: "The clues above the grid show the sums of the even digits in each column, grouped into blocks.",
            })}
        </RulesParagraph>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "Az oldalsó számok a páratlan számok összegét mutatják blokkonként.",
                [LanguageCode.en]: "The clues on the side show the sums of the odd digits, grouped into blocks.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0,0,0,0,0,0,0,0,0],
        [0,4,0,0,0,0,0,3,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,4,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,6,0,7,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,5,0,0,0,0,0,9,0],
        [0,0,0,0,0,0,0,0,0],
    ],

    solution: [
        [3,2,6,7,1,4,5,8,9],
        [9,4,1,8,5,6,2,3,7],
        [7,8,5,3,2,9,6,1,4],
        [6,7,2,4,8,1,9,5,3],
        [8,9,4,2,3,5,1,7,6],
        [5,1,3,6,9,7,4,2,8],
        [2,6,9,5,7,3,8,4,1],
        [4,5,7,1,6,8,3,9,2],
        [1,3,8,9,4,2,7,6,5],
    ],

    outsideClues: {
        top: [
            [14, 6],
            [14, 6],
            [6, 6, 8],
            [8, 12],
            [10, 10],
            [10, 10],
            [8, 12],
            [8, 6, 6],
            [4, 14, 2],
        ],
        right: [
            [3, 8, 5, 9],
            [9, 1, 5, 10],
            [7, 8, 9, 1],
            [7, 18],
            [9, 16],
            [9, 16],
            [24, 1],
            [13, 12],
            [4, 9, 7, 5],
        ],
    },
};

export const VS2026R1P11JapaneseSumsOE = createPzlPuzzle(puzzleData);
