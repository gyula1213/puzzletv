import { NumberPTM } from "../../../types/puzzle/PuzzleTypeMap";
import { GridParser } from "../GridParser";
import { PuzzleImporter } from "../PuzzleImporter";
import { PzlGeneratedSudokuData, PzlCellValue } from "./PzlPuzzleTypes";

const isGiven = (value: PzlCellValue): value is number =>
    value !== undefined && value !== null && value !== 0;

const assertSquareMatrix = (name: string, matrix: unknown[][], size: number) => {
    if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
        throw new Error(`${name} must be a ${size}x${size} matrix`);
    }
};

/**
 * Minimal generated-PZL parser for PuzzleTV.
 *
 * First version supports only plain 9x9 Sudoku:
 *   - title/author/rules
 *   - predef -> givens
 *   - solution -> solution digits
 *   - normal Sudoku rules and 3x3 regions
 *
 * Later this class can be extended with cages, arrows, fog, etc.
 */
export class PzlJsonGridParser extends GridParser<NumberPTM, PzlGeneratedSudokuData> {
    constructor(puzzleJson: PzlGeneratedSudokuData) {
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

        if (size !== 9) {
            throw new Error("PzlJsonGridParser v1 supports only size=9");
        }

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

        // Enable normal row/column/box Sudoku rules.
        importer.toggleSudokuRules(true);

        // Add normal 3x3 regions. Undefined lets PuzzleImporter derive the
        // standard regions from regionWidth/regionHeight.
        importer.addRegions(
            this,
            Array.from({ length: size }, () => Array.from({ length: size }, () => undefined)),
        );

        // Embedded solution.
        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                importer.addSolutionDigit(this, top, left, puzzleJson.solution[top][left]);
            }
        }

        // Givens from predef.
        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                const value = puzzleJson.predef[top][left];
                if (isGiven(value)) {
                    importer.addGiven(this, top, left, value);
                }
            }
        }
    }
}
