import { PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { PuzzleImportOptions } from "../../types/puzzle/PuzzleImportOptions";
import { DigitPuzzleTypeManager } from "../../puzzleTypes/default/types/DigitPuzzleTypeManager";
import { PositionLiteral } from "../../types/layout/Position";
import { GridParser } from "./GridParser";
import { PuzzleImporter } from "./PuzzleImporter";

/**
 * Experimental PZL JSON -> PuzzleTV importer proof-of-concept, step 2.
 *
 * Intended location:
 *   src/data/puzzles/PzlJsonLumenSudoku.tsx
 *
 * This version demonstrates a Lumos-like Sudoku imported through PuzzleImporter:
 *   - normal 9x9 sudoku
 *   - predef + embedded solution
 *   - killer cages
 *   - arrows
 *   - fog / initial light sources
 *
 * The hard-coded data below is deliberately JSON-like: this is the shape that
 * Gyula's PZL tooling could generate later.
 */

type PzlJsonCage = {
    cells: PositionLiteral[];
    sum?: number;
};

type PzlJsonArrow = {
    circle: PositionLiteral | PositionLiteral[];
    line: PositionLiteral[];
};

type PzlJsonFog = {
    startCells3x3?: PositionLiteral[];
    startCells?: PositionLiteral[];
    bulbCells?: PositionLiteral[];
};

type PzlJsonLumenSudokuData = {
    title: string;
    author?: string;
    slug: string;
    size?: number;
    predef: (number | null | undefined)[][];
    solution: number[][];
    rules?: string;
    cages?: PzlJsonCage[];
    arrows?: PzlJsonArrow[];
    fog?: PzlJsonFog;
};

const lumosPuzzle: PzlJsonLumenSudokuData = {
    title: "PZL JSON Lumos Maxima",
    author: "Chameleon / PZL import test",
    slug: "pzl-json-lumen-sudoku",
    size: 9,
    predef: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    solution: [
        [2, 1, 7, 6, 4, 8, 9, 3, 5],
        [5, 8, 9, 1, 3, 7, 4, 2, 6],
        [4, 3, 6, 2, 5, 9, 1, 8, 7],
        [1, 7, 2, 5, 8, 6, 3, 4, 9],
        [6, 4, 3, 9, 7, 1, 8, 5, 2],
        [9, 5, 8, 3, 2, 4, 7, 6, 1],
        [7, 9, 5, 4, 6, 3, 2, 1, 8],
        [8, 6, 4, 7, 1, 2, 5, 9, 3],
        [3, 2, 1, 8, 9, 5, 6, 7, 4],
    ],
    rules: [
        "Normal sudoku rules apply.",
        "Digits along an arrow sum to the number in the circle. Digits can repeat along arrows if allowed by other rules.",
        "Cells in cages must sum to the total given in the corner of the cage. Digits cannot repeat within a cage.",
        "The grid is covered with fog. There are two initial light sources that illuminate the darkness and clear the fog.",
    ].join("\n"),
    cages: [
        { cells: ["R1C1", "R1C2", "R2C1"], sum: 8 },
        { cells: ["R3C1", "R3C2", "R4C1"], sum: 8 },
        { cells: ["R1C3", "R2C3", "R2C4", "R3C3"], sum: 23 },
        { cells: ["R1C4", "R1C5", "R2C5", "R3C4", "R3C5", "R4C5", "R5C4", "R5C5", "R5C6"], sum: 45 },
        { cells: ["R1C6", "R1C7", "R1C8", "R1C9", "R2C9", "R3C9"], sum: 38 },
        { cells: ["R2C8", "R3C8", "R4C7", "R4C8", "R4C9"] },
    ],
    arrows: [
        { circle: "R6C1", line: ["R6C1", "R5C2", "R6C2"] },
        { circle: "R4C2", line: ["R4C2", "R4C3", "R4C4"] },
        { circle: "R6C7", line: ["R6C7", "R6C5", "R5C6"] },
        { circle: "R3C6", line: ["R3C6", "R4C6", "R4C7"] },
        { circle: "R8C3", line: ["R8C3", "R7C4"] },
        { circle: "R8C8", line: ["R8C8", "R7C8", "R7C6", "R8C6", "R8C5"] },
        { circle: "R4C9", line: ["R4C9", "R3C9", "R2C8"] },
    ],
    fog: {
        startCells3x3: ["R2C2", "R8C7"],
    },
};

const isGiven = (value: number | null | undefined) => value !== undefined && value !== null && value !== 0;

const assertSquareMatrix = (name: string, matrix: unknown[][], size: number) => {
    if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
        throw new Error(`${name} must be a ${size}x${size} matrix`);
    }
};

class PzlJsonLumenSudokuGridParser extends GridParser<NumberPTM, PzlJsonLumenSudokuData> {
    constructor(puzzleJson: PzlJsonLumenSudokuData) {
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

    override get hasFog() {
        return !!this.puzzleJson.fog;
    }

    override get hasArrows() {
        return !!this.puzzleJson.arrows?.length;
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

        // Add killer cages.
        for (const cage of puzzleJson.cages ?? []) {
            importer.addKillerCage(this, cage.cells, cage.sum);
        }

        // Add arrows. addArrow expects the circle cells separately and the line as
        // [lineStart, ...lineCells]. For 1-cell circles, the lineStart is the first
        // line cell; the rest are the actual arrow-line cells.
        for (const arrow of puzzleJson.arrows ?? []) {
            const circleCells = Array.isArray(arrow.circle) ? arrow.circle : [arrow.circle];
            importer.addArrow(this, circleCells, arrow.line);
        }

        // Add fog / initial light sources.
        if (puzzleJson.fog) {
            importer.addFog(this, puzzleJson.fog);
        }
    }
}

const createPuzzleFromPzlJson = (data: PzlJsonLumenSudokuData) => {
    const parser = new PzlJsonLumenSudokuGridParser(data);
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
        saveStateKey: `${data.slug}-v1`,
    };
};

export const PzlJsonLumenSudoku: PuzzleDefinitionLoader<NumberPTM> = {
    noIndex: false,
    slug: lumosPuzzle.slug,
    loadPuzzle: () => createPuzzleFromPzlJson(lumosPuzzle),
};
