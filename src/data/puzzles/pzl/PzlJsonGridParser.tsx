import { NumberPTM } from "../../../types/puzzle/PuzzleTypeMap";
import { GridParser } from "../GridParser";
import { PuzzleImporter } from "../PuzzleImporter";
import { PzlGeneratedSudokuData, PzlCellValue } from "./PzlPuzzleTypes";
import { SumAround6Constraint } from "../../../components/puzzle/constraints/sum-around-6/SumAround6";

const isGiven = (value: PzlCellValue): value is number =>
    value !== undefined && value !== null && value !== 0;

const assertSquareMatrix = (name: string, matrix: unknown[][], size: number) => {
    if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
        throw new Error(`${name} must be a ${size}x${size} matrix`);
    }
};

/**
 * Generated-PZL parser for PuzzleTV.
 *
 * Current scope:
 *   - normal Sudoku, including 6x6
 *   - title/author/rules
 *   - predef -> givens
 *   - solution -> solution digits
 *   - box regions, e.g. 6x6 = 3x2
 *   - optional outside clues
 *   - optional killer cages
 *   - optional arrows
 *   - optional fog / lumen start cells
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

        // Enable normal row/column Sudoku rules.
        importer.toggleSudokuRules(true);

        // Add standard box regions. For IBSumAround6 this is 3x2.
        const boxWidth = puzzleJson.boxWidth ?? 3;
        const boxHeight = puzzleJson.boxHeight ?? (size === 6 ? 2 : 3);
        importer.addRegions(
            this,
            Array.from({ length: size }, (_row, top) =>
                Array.from({ length: size }, (_col, left) =>
                    Math.floor(top / boxHeight) * Math.ceil(size / boxWidth) + Math.floor(left / boxWidth),
                ),
            ),
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

        // Optional outside clues from Info-up / Info-left etc.
        //
        puzzleJson.outsideClues?.top?.forEach((value, index) => {
            if (value !== undefined) {
                importer.addSimpleOutsideClue(
                    this,
                    `R0C${index + 1}`,
                    value,
                    SumAround6Constraint,
                );
            }
        });

        puzzleJson.outsideClues?.left?.forEach((value, index) => {
            if (value !== undefined) {
                importer.addSimpleOutsideClue(
                    this,
                    `R${index + 1}C0`,
                    value,
                    SumAround6Constraint,
                );
            }
        });

        // Optional killer cages.
        for (const cage of puzzleJson.cages ?? []) {
            importer.addKillerCage(this, cage.cells, cage.sum);
        }

        // Optional arrows.
        for (const arrow of puzzleJson.arrows ?? []) {
            const circleCells = Array.isArray(arrow.circle) ? arrow.circle : [arrow.circle];
            importer.addArrow(this, circleCells, arrow.line);
        }

        // Optional fog / lumen configuration.
        if (puzzleJson.fog) {
            importer.addFog(this, puzzleJson.fog);
        }
    }
}
