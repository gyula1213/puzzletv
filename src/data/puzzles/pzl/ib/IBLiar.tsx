import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Hazudós sudoku.
 *
 * The small clue in a cell is false by exactly one:
 * the actual digit must be one smaller or one larger than the clue.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Hazudós sudoku",
        [LanguageCode.en]: "IB: Liar sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-liar",

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
                [LanguageCode.hu]: "Minden jelölt mezőbe a megadott számnál eggyel kisebb vagy eggyel nagyobb számot kell írni.",
                [LanguageCode.en]: "Every marked cell must contain a digit that is one smaller or one larger than the given clue.",
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
        [1, 5, 2, 4, 3, 6],
        [6, 4, 3, 5, 2, 1],
        [3, 1, 5, 2, 6, 4],
        [2, 6, 4, 3, 1, 5],
        [5, 3, 6, 1, 4, 2],
        [4, 2, 1, 6, 5, 3],
    ],

    liarCells: [
        { cell: "R1C1", value: 2 },
        { cell: "R1C3", value: 3 },
        { cell: "R1C5", value: 4 },

        { cell: "R2C2", value: 3 },
        { cell: "R2C4", value: 4 },
        { cell: "R2C6", value: 2 },

        { cell: "R3C1", value: 2 },
        { cell: "R3C3", value: 4 },
        { cell: "R3C5", value: 5 },

        { cell: "R4C2", value: 5 },
        { cell: "R4C4", value: 2 },
        { cell: "R4C6", value: 4 },

        { cell: "R5C1", value: 4 },
        { cell: "R5C3", value: 5 },
        { cell: "R5C5", value: 5 },

        { cell: "R6C2", value: 3 },
        { cell: "R6C4", value: 5 },
        { cell: "R6C6", value: 4 },
    ],
};

export const IBLiar = createPzlPuzzle(puzzleData);
