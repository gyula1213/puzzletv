/**
 * Minimal PZL -> PuzzleTV intermediate data model.
 *
 * This file is intentionally simple: it describes the data shape that can be
 * generated mechanically from a .pzl file. It does not parse .pzl itself.
 */

export type PzlCellValue = number | 0 | null | undefined;

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
};
