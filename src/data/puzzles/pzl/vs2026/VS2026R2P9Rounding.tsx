import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 2: Kerekítős sudoku.
 *
 * The sub-region map describes the two-cell dotted rectangles.
 * The clue in each rectangle is the two-digit number in that rectangle,
 * rounded to the nearest ten.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Kerekítős sudoku",
        [LanguageCode.en]: "Rounding sudoku",
    },
    author: "VS2026",
    slug: "vs2026-r2-p9-rounding",

    size: 9,
    boxWidth: 3,
    boxHeight: 3,

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
                [LanguageCode.hu]: "A téglalapokba írt kis számok az adott téglalapba kerülő kétjegyű számok tízesre kerekített értékét mutatják.",
                [LanguageCode.en]: "The small clue in each rectangle gives the two-digit number in that rectangle rounded to the nearest ten.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [2, 7, 8, 5, 4, 3, 9, 6, 1],
        [9, 5, 4, 6, 7, 1, 8, 2, 3],
        [3, 1, 6, 2, 9, 8, 4, 7, 5],
        [7, 9, 5, 4, 1, 6, 3, 8, 2],
        [1, 6, 2, 8, 3, 5, 7, 4, 9],
        [8, 4, 3, 7, 2, 9, 1, 5, 6],
        [4, 3, 7, 1, 5, 2, 6, 9, 8],
        [5, 8, 9, 3, 6, 4, 2, 1, 7],
        [6, 2, 1, 9, 8, 7, 5, 3, 4],
    ],

    cages: [
        { sum: "30", cells: ["R1C1", "R1C2"] },
        { sum: "40", cells: ["R1C5", "R1C6"] },
        { sum: "50", cells: ["R2C2", "R2C3"] },
        { sum: "20", cells: ["R2C6", "R2C7"] },
        { sum: "60", cells: ["R3C3", "R3C4"] },
        { sum: "60", cells: ["R3C7", "R3C8"] },
        { sum: "40", cells: ["R4C4", "R4C5"] },
        { sum: "80", cells: ["R4C8", "R4C9"] },
        { sum: "20", cells: ["R5C1", "R5C2"] },
        { sum: "40", cells: ["R5C5", "R5C6"] },
        { sum: "40", cells: ["R6C2", "R6C3"] },
        { sum: "90", cells: ["R6C6", "R6C7"] },
        { sum: "70", cells: ["R7C3", "R7C4"] },
        { sum: "70", cells: ["R7C7", "R7C8"] },
        { sum: "40", cells: ["R8C4", "R8C5"] },
        { sum: "20", cells: ["R8C8", "R8C9"] },
        { sum: "90", cells: ["R9C5", "R9C6"] },
    ],

    roundingCages: [
        { roundedToTen: 30, cells: ["R1C1", "R1C2"] },
        { roundedToTen: 40, cells: ["R1C5", "R1C6"] },
        { roundedToTen: 50, cells: ["R2C2", "R2C3"] },
        { roundedToTen: 20, cells: ["R2C6", "R2C7"] },
        { roundedToTen: 60, cells: ["R3C3", "R3C4"] },
        { roundedToTen: 60, cells: ["R3C7", "R3C8"] },
        { roundedToTen: 40, cells: ["R4C4", "R4C5"] },
        { roundedToTen: 80, cells: ["R4C8", "R4C9"] },
        { roundedToTen: 20, cells: ["R5C1", "R5C2"] },
        { roundedToTen: 40, cells: ["R5C5", "R5C6"] },
        { roundedToTen: 40, cells: ["R6C2", "R6C3"] },
        { roundedToTen: 90, cells: ["R6C6", "R6C7"] },
        { roundedToTen: 70, cells: ["R7C3", "R7C4"] },
        { roundedToTen: 70, cells: ["R7C7", "R7C8"] },
        { roundedToTen: 40, cells: ["R8C4", "R8C5"] },
        { roundedToTen: 20, cells: ["R8C8", "R8C9"] },
        { roundedToTen: 90, cells: ["R9C5", "R9C6"] },
    ],
};

export const VS2026R2P9Rounding = createPzlPuzzle(puzzleData);
