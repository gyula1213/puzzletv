import { createPzlPuzzle } from "../createPzlPuzzle";
import { PzlGeneratedSudokuData } from "../PzlPuzzleTypes";

import React from "react";
import { LanguageCode } from "../../../../types/translations/LanguageCode";
import { RulesParagraph } from "../../../../components/puzzle/rules/RulesParagraph";
import { translate } from "../../../../utils/translate";
/**
 * VS2026 round 2: Kódolt zónák sudoku easy.
 *
 * The PZL "sub-region" map describes the dotted cages.
 * The matching "info-cell" letters identify which disconnected zones must
 * contain exactly the same multiset of digits.
 */
const puzzleData: PzlGeneratedSudokuData = {
    title: {
        [LanguageCode.hu]: "Kódolt zónák sudoku easy",
        [LanguageCode.en]: "Coded zones sudoku easy",
    },
    author: "VS2026",
    slug: "vs2026-r2-p3-coded-zones-easy",

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
        [0, 4, 8, 0, 0, 0, 5, 6, 0],
        [1, 7, 0, 0, 0, 0, 0, 4, 9],
        [5, 0, 0, 0, 3, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 4, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 1, 0, 0, 0, 7],
        [7, 3, 0, 0, 0, 0, 0, 5, 2],
        [0, 5, 4, 0, 0, 0, 3, 9, 0],
    ],

    solution: [
        [2, 4, 8, 9, 7, 1, 5, 6, 3],
        [1, 7, 3, 6, 5, 8, 2, 4, 9],
        [5, 9, 6, 4, 3, 2, 7, 1, 8],
        [3, 1, 5, 7, 8, 6, 9, 2, 4],
        [9, 8, 2, 3, 4, 5, 1, 7, 6],
        [4, 6, 7, 1, 2, 9, 8, 3, 5],
        [6, 2, 9, 5, 1, 3, 4, 8, 7],
        [7, 3, 1, 8, 9, 4, 6, 5, 2],
        [8, 5, 4, 2, 6, 7, 3, 9, 1],
    ],

    cages: [
        { sum: "A", cells: ["R3C3", "R3C4", "R4C3", "R4C4"] },
        { sum: "B", cells: ["R3C6", "R3C7", "R4C6", "R4C7"] },
        { sum: "C", cells: ["R6C3", "R6C4", "R7C3", "R7C4"] },
        { sum: "D", cells: ["R6C6", "R6C7", "R7C6", "R7C7"] },
        { sum: "C", cells: ["R1C4", "R1C5", "R1C6", "R2C5"] },
        { sum: "D", cells: ["R4C1", "R5C1", "R5C2", "R6C1"] },
        { sum: "A", cells: ["R4C9", "R5C8", "R5C9", "R6C9"] },
        { sum: "B", cells: ["R8C5", "R9C4", "R9C5", "R9C6"] },
    ],

    codedZones: [
        {
            label: "A",
            zones: [
                ["R3C3", "R3C4", "R4C3", "R4C4"],
                ["R4C9", "R5C8", "R5C9", "R6C9"],
            ],
        },
        {
            label: "B",
            zones: [
                ["R3C6", "R3C7", "R4C6", "R4C7"],
                ["R8C5", "R9C4", "R9C5", "R9C6"],
            ],
        },
        {
            label: "C",
            zones: [
                ["R6C3", "R6C4", "R7C3", "R7C4"],
                ["R1C4", "R1C5", "R1C6", "R2C5"],
            ],
        },
        {
            label: "D",
            zones: [
                ["R6C6", "R6C7", "R7C6", "R7C7"],
                ["R4C1", "R5C1", "R5C2", "R6C1"],
            ],
        },
    ],
};

export const VS2026R2P3CodedZonesEasy = createPzlPuzzle(puzzleData);
