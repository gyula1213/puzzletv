import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Japán páros-páratlan összegek.
 *
 * PZL source:
 * Type:sudoku
 * size:6;6
 * map-clue-params:1=?1-m:80
 * Info-up:
 * 4,8;2,6,4;12;8,4;10,2;4,2,6
 * Info-right:
 * 5,3,1;1,8;6,3;3,5,1;4,5;6,3
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Japán páros-páratlan összegek",
        [LanguageCode.en]: "IB: Japanese even/odd sums",
    },
    author: "Instruction Booklet",
    slug: "ib-japanese-even-odd-sums",

    size: 6,
    boxWidth: 3,
    boxHeight: 2,

    outsideClueType: "japanese-even-odd-sums",

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
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [5, 2, 3, 6, 1, 4],
        [4, 1, 6, 2, 3, 5],
        [1, 5, 4, 3, 6, 2],
        [3, 6, 2, 5, 4, 1],
        [2, 3, 1, 4, 5, 6],
        [6, 4, 5, 1, 2, 3],
    ],

    outsideClues: {
        top: [
            [4, 8],
            [2, 6, 4],
            [12],
            [8, 4],
            [10, 2],
            [4, 2, 6],
        ],
        right: [
            [5, 3, 1],
            [1, 8],
            [6, 3],
            [3, 5, 1],
            [4, 5],
            [6, 3],
        ],
    },
};

export const IBJapaneseEvenOddSums = createPzlPuzzle(puzzleData);
