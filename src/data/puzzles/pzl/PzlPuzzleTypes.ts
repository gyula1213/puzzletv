import { PositionLiteral } from "../../../types/layout/Position";

/**
 * Minimal PZL -> PuzzleTV intermediate data model.
 *
 * This file is intentionally simple: it describes the data shape that can be
 * generated mechanically from a .pzl file. It does not parse .pzl itself.
 */

export type PzlCellValue = number | 0 | null | undefined;

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

export type PzlGeneratedSudokuData = {
    /** Human-readable title shown by PuzzleTV. Usually generated from Name: */
    title: string;

    /** Optional author. Can be generated from a future author: keyword. */
    author?: string;

    /** PuzzleTV URL slug. Can be generated from Name: when missing. */
    slug: string;

    /** Sudoku size. First version supports 9 only. */
    size?: number;

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

    /** Optional fog / lumen configuration. */
    fog?: PzlGeneratedFog;
};
