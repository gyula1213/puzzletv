import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 1: Hazudós sudoku.
 *
 * The small clue in a cell is false by exactly one:
 * the actual digit must be one smaller or one larger than the clue.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Hazudós sudoku - 01",
        [LanguageCode.en]: "Liar sudoku - 01",
    },
    author: "VS2026",
    slug: "vs2026-r1-p5-liar-01",

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
                [LanguageCode.hu]: "Minden jelölt mezőbe a megadott számnál eggyel kisebb vagy eggyel nagyobb számot kell írni.",
                [LanguageCode.en]: "Every marked cell must contain a digit that is one smaller or one larger than the given clue.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    solution: [
        [6, 1, 3, 7, 5, 2, 9, 4, 8],
        [9, 7, 2, 8, 4, 6, 5, 3, 1],
        [8, 5, 4, 3, 9, 1, 6, 7, 2],
        [7, 3, 9, 1, 6, 8, 2, 5, 4],
        [2, 8, 1, 4, 7, 5, 3, 6, 9],
        [5, 4, 6, 9, 2, 3, 8, 1, 7],
        [1, 6, 5, 2, 8, 4, 7, 9, 3],
        [3, 9, 8, 6, 1, 7, 4, 2, 5],
        [4, 2, 7, 5, 3, 9, 1, 8, 6],
    ],

    liarCells: [
        { cell: "R1C1", value: 7 },
        { cell: "R1C5", value: 6 },
        { cell: "R1C9", value: 7 },
        { cell: "R2C3", value: 3 },
        { cell: "R2C4", value: 7 },
        { cell: "R2C6", value: 7 },
        { cell: "R2C7", value: 4 },
        { cell: "R3C2", value: 6 },
        { cell: "R3C5", value: 8 },
        { cell: "R3C8", value: 6 },
        { cell: "R4C2", value: 4 },
        { cell: "R4C5", value: 5 },
        { cell: "R4C8", value: 4 },
        { cell: "R5C1", value: 3 },
        { cell: "R5C3", value: 2 },
        { cell: "R5C4", value: 5 },
        { cell: "R5C6", value: 4 },
        { cell: "R5C7", value: 2 },
        { cell: "R5C9", value: 8 },
        { cell: "R6C2", value: 5 },
        { cell: "R6C5", value: 3 },
        { cell: "R6C8", value: 2 },
        { cell: "R7C2", value: 5 },
        { cell: "R7C5", value: 7 },
        { cell: "R7C8", value: 8 },
        { cell: "R8C3", value: 7 },
        { cell: "R8C4", value: 7 },
        { cell: "R8C6", value: 6 },
        { cell: "R8C7", value: 5 },
        { cell: "R9C1", value: 5 },
        { cell: "R9C5", value: 4 },
        { cell: "R9C9", value: 5 },
    ],
};

export const VS2026R1P5Liar01 = createPzlPuzzle(puzzleData);
