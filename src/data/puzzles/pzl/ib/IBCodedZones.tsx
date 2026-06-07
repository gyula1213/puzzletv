import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * IB sample: Kódolt zónák sudoku.
 *
 * The PZL "sub-region" map describes the dotted cages.
 * The matching "info-cell" letters identify which disconnected zones must
 * contain exactly the same multiset of digits.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "IB: Kódolt zónák sudoku",
        [LanguageCode.en]: "IB: Coded zones sudoku",
    },
    author: "Instruction Booklet",
    slug: "ib-coded-zones",

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
                [LanguageCode.hu]: "Az azonos betűvel jelölt területekben ugyanazoknak a számoknak kell állniuk.",
                [LanguageCode.en]: "Regions marked with the same letter must contain exactly the same multiset of digits.",
            })}
        </RulesParagraph>
        <RulesParagraph>
            {translate({
                [LanguageCode.hu]: "Például ha az egyik A területben 1, 1, 4 és 5 áll, akkor a másik A területben is pontosan ez a négy számjegy szerepel.",
                [LanguageCode.en]: "For example, if one A region contains 1, 1, 4 and 5, then the other A region must contain exactly those four digits as well.",
            })}
        </RulesParagraph>
        </>
    ),

    predef: [
        [0, 0, 2, 0, 4, 0],
        [0, 4, 0, 0, 0, 2],
        [0, 0, 0, 3, 0, 4],
        [4, 0, 3, 0, 0, 0],
        [2, 0, 0, 0, 6, 0],
        [0, 5, 0, 2, 0, 0],
    ],

    solution: [
        [3, 1, 2, 5, 4, 6],
        [5, 4, 6, 1, 3, 2],
        [1, 6, 5, 3, 2, 4],
        [4, 2, 3, 6, 5, 1],
        [2, 3, 1, 4, 6, 5],
        [6, 5, 4, 2, 1, 3],
    ],

    cages: [
        { sum: "A", cells: ["R1C1", "R1C2", "R2C1", "R3C1"] },
        { sum: "A", cells: ["R4C6", "R5C6", "R6C5", "R6C6"] },
        { sum: "B", cells: ["R2C4", "R2C5", "R3C5"] },
        { sum: "B", cells: ["R4C2", "R5C2", "R5C3"] },
        { sum: "C", cells: ["R2C3", "R3C3"] },
        { sum: "C", cells: ["R4C4", "R4C5"] },
    ],

    codedZones: [
        {
            label: "A",
            zones: [
                ["R1C1", "R1C2", "R2C1", "R3C1"],
                ["R4C6", "R5C6", "R6C5", "R6C6"],
            ],
        },
        {
            label: "B",
            zones: [
                ["R2C4", "R2C5", "R3C5"],
                ["R4C2", "R5C2", "R5C3"],
            ],
        },
        {
            label: "C",
            zones: [
                ["R2C3", "R3C3"],
                ["R4C4", "R4C5"],
            ],
        },
    ],
};

export const IBCodedZones = createPzlPuzzle(puzzleData);
