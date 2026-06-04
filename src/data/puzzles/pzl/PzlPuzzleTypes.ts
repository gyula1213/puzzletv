import { PositionLiteral } from "../../../types/layout/Position";

export type PzlCellValue = number | 0 | null | undefined;

export type PzlOutsideClueValue = number | number[] | undefined;

export type PzlOutsideClueType =
    | "sum-around-6"
    | "japanese-even-odd-sums"
    | "skyscraper";

export type PzlGeneratedCage = {
    cells: PositionLiteral[];
    sum?: number;
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

    /** 0/null/undefined = empty cell, positive number = given. */
    predef: PzlCellValue[][];

    /** Full solution matrix. */
    solution: number[][];

    /** Rules text displayed by PuzzleTV. */
    rules?: string;

    /** Optional killer cages. */
    cages?: PzlGeneratedCage[];

    /** Optional arrows. */
    arrows?: PzlGeneratedArrow[];

    /** Optional outside clues generated from Info-up / Info-left etc. */
    outsideClues?: PzlGeneratedOutsideClues;

    /** Which outside-clue rule should be used for this puzzle. */
    outsideClueType?: PzlOutsideClueType;

    /** Optional fog / lumen configuration. */
    fog?: PzlGeneratedFog;
};
