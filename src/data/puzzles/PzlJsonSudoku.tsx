import { PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { PuzzleImportOptions } from "../../types/puzzle/PuzzleImportOptions";
import { DigitPuzzleTypeManager } from "../../puzzleTypes/default/types/DigitPuzzleTypeManager";
import { GridParser } from "./GridParser";
import { PuzzleImporter } from "./PuzzleImporter";

/**
 * Experimental PZL JSON -> PuzzleTV importer proof-of-concept.
 *
 * Intended location:
 *   src/data/puzzles/PzlJsonSudoku.tsx
 *
 * First goal:
 *   - plain 9x9 sudoku only
 *   - predef + solution
 *   - no cages, arrows, fog, cosmetics yet
 *
 * Later this JSON can be generated from .pzl by Gyula's own tooling.
 */

type PzlJsonSudokuData = {
    title: string;
    author?: string;
    slug: string;
    size?: number;
    predef: (number | null | undefined)[][];
    solution: number[][];
    rules?: string;
};

const testPuzzle: PzlJsonSudokuData = {
    title: "Érettségi találkozó, 2026",
    author: "Gyula Slenker",
    slug: "pzl-json-teszt-sudoku",
    size: 9,
    predef: [
        [0, 6, 0, 0, 0, 0, 0, 4, 5],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 2, 0, 5, 8, 3, 0],

        [0, 7, 6, 5, 0, 8, 0, 0, 0],
        [0, 0, 0, 6, 0, 3, 0, 0, 0],
        [1, 0, 0, 7, 0, 2, 6, 5, 0],

        [0, 9, 0, 4, 0, 0, 0, 7, 0],
        [0, 0, 8, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 7, 9, 2, 0],
    ],
    solution: [
        [8, 6, 2, 9, 3, 1, 7, 4, 5],
        [3, 1, 5, 8, 7, 4, 2, 6, 9],
        [9, 4, 7, 2, 6, 5, 8, 3, 1],

        [4, 7, 6, 5, 1, 8, 3, 9, 2],
        [5, 2, 9, 6, 4, 3, 1, 8, 7],
        [1, 8, 3, 7, 9, 2, 6, 5, 4],

        [2, 9, 1, 4, 8, 6, 5, 7, 3],
        [7, 5, 8, 3, 2, 9, 4, 1, 6],
        [6, 3, 4, 1, 5, 7, 9, 2, 8],
    ],
    rules: "Normal sudoku rules apply.",
};

const isGiven = (value: number | null | undefined) => value !== undefined && value !== null && value !== 0;

const assertSquareMatrix = (name: string, matrix: unknown[][], size: number) => {
    if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
        throw new Error(`${name} must be a ${size}x${size} matrix`);
    }
};

class PzlJsonSudokuGridParser extends GridParser<NumberPTM, PzlJsonSudokuData> {
    constructor(puzzleJson: PzlJsonSudokuData) {
        const size = puzzleJson.size ?? 9;

        super(
            puzzleJson,
            { top: 0, left: 0, width: size, height: size },
            size,
            1,
            size,
            {},
            {},
        );

        assertSquareMatrix("predef", puzzleJson.predef, size);
        assertSquareMatrix("solution", puzzleJson.solution, size);
    }

    override get hasSolution() {
        return true;
    }

    override addToImporter(importer: PuzzleImporter<NumberPTM>) {
        const { puzzleJson, size } = this;

        importer.setTitle(puzzleJson.title);
        importer.setAuthor(puzzleJson.author);
        importer.setRuleset(this, puzzleJson.rules ?? "Normal sudoku rules apply.");

        // Enable standard row/column/box sudoku rules.
        importer.toggleSudokuRules(true);

        // Add normal 3x3 box regions. Undefined means: let PuzzleImporter derive
        // the standard regions from regionWidth/regionHeight.
        importer.addRegions(
            this,
            Array.from({ length: size }, () => Array.from({ length: size }, () => undefined)),
        );

        // Add the full embedded solution. This gives PuzzleTV a simple result checker.
        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                importer.addSolutionDigit(this, top, left, puzzleJson.solution[top][left]);
            }
        }

        // Add givens from predef. 0/null/undefined mean empty.
        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                const value = puzzleJson.predef[top][left];
                if (isGiven(value)) {
                    importer.addGiven(this, top, left, value as number);
                }
            }
        }
    }
}

const createPuzzleFromPzlJson = (data: PzlJsonSudokuData) => {
    const parser = new PzlJsonSudokuGridParser(data);
    const importOptions = {
        title: data.title,
        author: data.author,
    } as PuzzleImportOptions;

    const importer = new PuzzleImporter<NumberPTM>(
        data.slug,
        importOptions,
        DigitPuzzleTypeManager(),
        parser.gridSize,
    );

    importer.addGrid(parser);
    const puzzle = importer.finalize();
    importer.dispose();

    return {
        ...puzzle,
        noIndex: false,
        slug: data.slug,
        saveStateKey: data.slug,
    };
};

export const PzlJsonSudoku: PuzzleDefinitionLoader<NumberPTM> = {
    noIndex: false,
    slug: testPuzzle.slug,
    loadPuzzle: () => createPuzzleFromPzlJson(testPuzzle),
};
