import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Kerekítős sudoku.
 *
 * The sub-region map describes the two-cell dotted rectangles.
 * The clue in each rectangle is the two-digit number in that rectangle,
 * rounded to the nearest ten.
 *
 * In this sample all rectangles are horizontal, so the two-digit number is read
 * left to right.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Kerekítős sudoku",
        [LanguageCode.en]: "IB: Rounding sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-rounding",

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
                [LanguageCode.hu]: "A téglalapokba írt kis számok az adott téglalapba kerülő kétjegyű számok tízesre kerekített értékét mutatják.",
                [LanguageCode.en]: "The small clue in each rectangle gives the two-digit number in that rectangle rounded to the nearest ten.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [6, 0, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 2],
    ],

    solution: [
        [6, 2, 4, 5, 1, 3],
        [3, 1, 5, 6, 2, 4],
        [2, 4, 6, 3, 5, 1],
        [5, 3, 1, 2, 4, 6],
        [1, 6, 2, 4, 3, 5],
        [4, 5, 3, 1, 6, 2],
    ],

    cages: [
        { sum: "50", cells: ["R1C3", "R1C4"] },
        { sum: "20", cells: ["R2C2", "R2C3"] },
        { sum: "20", cells: ["R2C5", "R2C6"] },
        { sum: "20", cells: ["R3C1", "R3C2"] },
        { sum: "40", cells: ["R3C4", "R3C5"] },
        { sum: "30", cells: ["R4C2", "R4C3"] },
        { sum: "50", cells: ["R4C5", "R4C6"] },
        { sum: "20", cells: ["R5C1", "R5C2"] },
        { sum: "40", cells: ["R5C4", "R5C5"] },
        { sum: "30", cells: ["R6C3", "R6C4"] },
    ],

    roundingCages: [
        { roundedToTen: 50, cells: ["R1C3", "R1C4"] },
        { roundedToTen: 20, cells: ["R2C2", "R2C3"] },
        { roundedToTen: 20, cells: ["R2C5", "R2C6"] },
        { roundedToTen: 20, cells: ["R3C1", "R3C2"] },
        { roundedToTen: 40, cells: ["R3C4", "R3C5"] },
        { roundedToTen: 30, cells: ["R4C2", "R4C3"] },
        { roundedToTen: 50, cells: ["R4C5", "R4C6"] },
        { roundedToTen: 20, cells: ["R5C1", "R5C2"] },
        { roundedToTen: 40, cells: ["R5C4", "R5C5"] },
        { roundedToTen: 30, cells: ["R6C3", "R6C4"] },
    ],
};

export const IBRounding = createPzlPuzzle(puzzleData);
