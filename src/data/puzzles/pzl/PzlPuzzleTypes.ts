import { PositionLiteral } from "../../../types/layout/Position";

export type PzlCellValue = number | 0 | null | undefined;

export type PzlOutsideClueValue = number | number[] | undefined;

export type PzlOutsideClueType =
    | "sum-around-6"
    | "japanese-even-odd-sums"
    | "skyscraper";

export type PzlGeneratedCage = {
    cells: PositionLiteral[];

    /**
     * In normal killer cages this is a number. Some IB examples use the same
     * dotted cage visual layer with a letter/string clue instead, for example
     * coded zones A/B/C or rounding clues "20", "30", ...
     */
    sum?: number | string;
};

export type PzlGeneratedCodedZone = {
    label: string;
    zones: PositionLiteral[][];
};

export type PzlGeneratedRoundingCage = {
    cells: PositionLiteral[];
    roundedToTen: number;
};

export type PzlGeneratedArrow = {
    /** One-cell circles are represented by a single position. */
    circle: PositionLiteral | PositionLiteral[];

    /**
     * PuzzleTV's addArrow expects the line array to include the first cell next
     * to / under the circle. For the Lumos example this means the circle cell is
     * also repeated as the first line cell; otherwise the first visual segment is
     * missing.
     */
    line: PositionLiteral[];
};

export type PzlGeneratedFog = {
    startCells3x3?: PositionLiteral[];
    startCells?: PositionLiteral[];
    bulbCells?: PositionLiteral[];
};

export type PzlGeneratedOutsideClues = {
    top?: PzlOutsideClueValue[];
    bottom?: PzlOutsideClueValue[];
    left?: PzlOutsideClueValue[];
    right?: PzlOutsideClueValue[];
};

export type PzlGeneratedSudokuData = {
    /** Human-readable title shown by PuzzleTV. Usually generated from Name: */
    title: string;

    /** Optional author. Can be generated from a future author: keyword. */
    author?: string;

    /** PuzzleTV URL slug. Can be generated from Name: when missing. */
    slug: string;

    /** Sudoku size. */
    size?: number;

    /** Box dimensions for non-9x9 sudokus, e.g. 6x6 = 3x2. */
    boxWidth?: number;
    boxHeight?: number;

    /**
     * Optional custom region map.
     *
     * If this is present, it overrides the default rectangular box regions.
     * Region ids may come directly from PZL, so both 0-based and 1-based ids are
     * tolerated by the importer layer.
     */
    regions?: number[][];

    /**
     * Sudoku-X / diagonal sudoku support.
     *
     * If true, both main diagonals are added as different-region constraints and
     * the diagonal cells are highlighted in light grey.
     */
    diagonal?: boolean;

    /**
     * Non-consecutive sudoku support.
     *
     * If true, all orthogonally adjacent cell pairs must not contain consecutive
     * digits. This is intentionally additive and does not affect puzzles where
     * the flag is not present.
     */
    nonConsecutive?: boolean;

    /**
     * No XV sudoku support.
     *
     * If true, all orthogonally adjacent cell pairs must not sum to 5 or 10.
     * This corresponds to a global "no X/V" rule without drawing any X/V marks.
     */
    noXV?: boolean;

    /** 0/null/undefined = empty cell, positive number = given. */
    predef: PzlCellValue[][];

    /** Full solution matrix. */
    solution: number[][];

    /** Rules text displayed by PuzzleTV. */
    rules?: string;

    /** Optional killer cages or dotted labelled zones. */
    cages?: PzlGeneratedCage[];

    /**
     * Optional coded-zone constraints.
     *
     * Each item represents all zones with the same letter. The zones in one item
     * must contain the same multiset of digits.
     */
    codedZones?: PzlGeneratedCodedZone[];

    /**
     * Optional rounding cages.
     *
     * These are visually drawn using normal dotted cages, but the constraint is
     * not a killer sum. The digits in the two-cell rectangle form a two-digit
     * number, rounded to the nearest ten.
     */
    roundingCages?: PzlGeneratedRoundingCage[];

    /** Optional arrows. */
    arrows?: PzlGeneratedArrow[];

    /** Optional outside clues generated from Info-up / Info-left etc. */
    outsideClues?: PzlGeneratedOutsideClues;

    /** Which outside-clue rule should be used for this puzzle. */
    outsideClueType?: PzlOutsideClueType;

    /** Optional fog / lumen configuration. */
    fog?: PzlGeneratedFog;
};
