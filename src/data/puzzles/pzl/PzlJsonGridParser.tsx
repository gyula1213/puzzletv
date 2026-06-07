import { NumberPTM } from "../../../types/puzzle/PuzzleTypeMap";
import { PositionLiteral } from "../../../types/layout/Position";
import { LanguageCode } from "../../../types/translations/LanguageCode";
import { GridParser } from "../GridParser";
import { PuzzleImporter } from "../PuzzleImporter";
import { PzlGeneratedSudokuData, PzlCellValue, PzlOutsideClueValue } from "./PzlPuzzleTypes";
import { SumAround6Constraint } from "../../../components/puzzle/constraints/sum-around-6/SumAround6";
import {
    JapaneseEvenOddSumsConstraint,
    JapaneseEvenOddSumsMode,
} from "../../../components/puzzle/constraints/japanese-even-odd-sums/JapaneseEvenOddSums";
import { SkyscraperConstraint } from "../../../components/puzzle/constraints/skyscraper/Skyscraper";


const defaultRules = "Normal sudoku rules apply.";

const getRulesetString = (rules: PzlGeneratedSudokuData["rules"]): string =>
    typeof rules === "string" ? rules : defaultRules;

const getTitleString = (title: PzlGeneratedSudokuData["title"]): string =>
    typeof title === "string"
        ? title
        : title[LanguageCode.hu] ?? title[LanguageCode.en] ?? Object.values(title)[0] ?? "";


const isGiven = (value: PzlCellValue): value is number =>
    value !== undefined && value !== null && value !== 0;

const assertSquareMatrix = (name: string, matrix: unknown[][], size: number) => {
    if (matrix.length !== size || matrix.some((row) => row.length !== size)) {
        throw new Error(`${name} must be a ${size}x${size} matrix`);
    }
};

const asNumberArray = (value: PzlOutsideClueValue): number[] => {
    if (value === undefined) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
};

const reversePositions = (positions: PositionLiteral[]) =>
    [...positions].reverse();

const normalizeRegionMap = (regions: number[][]) => {
    const minValue = Math.min(...regions.flat());

    // PZL region ids are usually 1-based. PuzzleTV region ids are happier as
    // 0-based integers, but the exact labels are not meaningful as long as equal
    // cells keep the same id.
    return minValue === 1
        ? regions.map((row) => row.map((value) => value - 1))
        : regions;
};

const createBoxRegionMap = (size: number, boxWidth: number, boxHeight: number) =>
    Array.from({ length: size }, (_row, top) =>
        Array.from({ length: size }, (_col, left) =>
            Math.floor(top / boxHeight) * Math.ceil(size / boxWidth) + Math.floor(left / boxWidth),
        ),
    );

const addSingleOutsideClue = (
    importer: PuzzleImporter<NumberPTM>,
    gridParser: PzlJsonGridParser,
    cellLiteral: PositionLiteral,
    value: number,
    side: "top" | "bottom" | "left" | "right",
) => {
    const { puzzleJson } = gridParser;

    if (puzzleJson.outsideClueType === "sum-around-6") {
        importer.addSimpleOutsideClue(
            gridParser,
            cellLiteral,
            value,
            SumAround6Constraint,
        );

        return;
    }

    importer.addSimpleOutsideClue(
        gridParser,
        cellLiteral,
        value,
        SkyscraperConstraint,
    );
};

const addJapaneseEvenOddSumsClue = (
    importer: PuzzleImporter<NumberPTM>,
    gridParser: PzlJsonGridParser,
    index: number,
    value: PzlOutsideClueValue,
    side: "top" | "bottom" | "left" | "right",
) => {
    const values = asNumberArray(value);

    if (!values.length) {
        return;
    }

    const { size } = gridParser;
    const mode: JapaneseEvenOddSumsMode = side === "top" || side === "bottom" ? "even" : "odd";

    values.forEach((displayValue, valueIndex) => {
        let cellLiteral: PositionLiteral;
        let checkEnabled = false;

        if (side === "top") {
            // PZL order is far -> near. Example [2, 6, 4] is displayed vertically:
            // 2 on the top row, 6 below it, 4 closest to the grid.
            const clueRow = valueIndex - values.length + 1;
            cellLiteral = `R${clueRow}C${index + 1}` as PositionLiteral;
            checkEnabled = valueIndex === values.length - 1;
        } else if (side === "bottom") {
            // Not used by the current IB puzzle, but keep the opposite convention.
            const clueRow = size + 1 + valueIndex;
            cellLiteral = `R${clueRow}C${index + 1}` as PositionLiteral;
            checkEnabled = valueIndex === 0;
        } else if (side === "right") {
            // Right-side clues are displayed horizontally, near -> far.
            // Example [5, 3, 1] appears as 5 3 1 to the right of the row.
            const clueColumn = size + 1 + valueIndex;
            cellLiteral = `R${index + 1}C${clueColumn}` as PositionLiteral;
            checkEnabled = valueIndex === 0;
        } else {
            // Left-side clues are displayed horizontally, far -> near.
            const clueColumn = valueIndex - values.length + 1;
            cellLiteral = `R${index + 1}C${clueColumn}` as PositionLiteral;
            checkEnabled = valueIndex === values.length - 1;
        }

        importer.addSimpleOutsideClue(
            gridParser,
            cellLiteral,
            displayValue,
            (clueCell, lineCells, clueValue, color) =>
                JapaneseEvenOddSumsConstraint(
                    clueCell,
                    side === "right" || side === "bottom"
                        ? reversePositions(lineCells)
                        : lineCells,
                    clueValue,
                    values,
                    mode,
                    checkEnabled,
                    color,
                ),
        );
    });
};

const addOutsideClue = (
    importer: PuzzleImporter<NumberPTM>,
    gridParser: PzlJsonGridParser,
    index: number,
    value: PzlOutsideClueValue,
    side: "top" | "bottom" | "left" | "right",
) => {
    if (value === undefined) {
        return;
    }

    if (gridParser.puzzleJson.outsideClueType === "japanese-even-odd-sums") {
        addJapaneseEvenOddSumsClue(importer, gridParser, index, value, side);

        return;
    }

    const { size } = gridParser;

    const cellLiteral = (
        side === "top" ? `R0C${index + 1}`
            : side === "bottom" ? `R${size + 1}C${index + 1}`
                : side === "left" ? `R${index + 1}C0`
                    : `R${index + 1}C${size + 1}`
    ) as PositionLiteral;

    addSingleOutsideClue(importer, gridParser, cellLiteral, asNumberArray(value)[0], side);
};

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

        if (puzzleJson.regions) {
            assertSquareMatrix("regions", puzzleJson.regions, size);
        }
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

        importer.setTitle(getTitleString(puzzleJson.title));
        importer.setAuthor(puzzleJson.author);
        importer.setRuleset(this, getRulesetString(puzzleJson.rules));

        importer.toggleSudokuRules(true);

        const boxWidth = puzzleJson.boxWidth ?? 3;
        const boxHeight = puzzleJson.boxHeight ?? (size === 6 ? 2 : 3);

        importer.addRegions(
            this,
            puzzleJson.regions
                ? normalizeRegionMap(puzzleJson.regions)
                : createBoxRegionMap(size, boxWidth, boxHeight),
        );

        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                importer.addSolutionDigit(this, top, left, puzzleJson.solution[top][left]);
            }
        }

        for (let top = 0; top < size; top++) {
            for (let left = 0; left < size; left++) {
                const value = puzzleJson.predef[top][left];

                if (isGiven(value)) {
                    importer.addGiven(this, top, left, value);
                }
            }
        }

        puzzleJson.outsideClues?.top?.forEach((value, index) =>
            addOutsideClue(importer, this, index, value, "top"),
        );

        puzzleJson.outsideClues?.bottom?.forEach((value, index) =>
            addOutsideClue(importer, this, index, value, "bottom"),
        );

        puzzleJson.outsideClues?.left?.forEach((value, index) =>
            addOutsideClue(importer, this, index, value, "left"),
        );

        puzzleJson.outsideClues?.right?.forEach((value, index) =>
            addOutsideClue(importer, this, index, value, "right"),
        );

        for (const cage of puzzleJson.cages ?? []) {
            // Only numeric cage clues are real killer cages.
            // Some IB examples keep `cages` as visual/source notation with
            // string labels, e.g. coded zones A/B/C or rounding labels "20".
            // Those are drawn and checked by their own constraints, so adding
            // them here as killer cages would introduce a wrong extra check.
            if (typeof cage.sum === "number") {
                importer.addKillerCage(this, cage.cells, cage.sum as any);
            }
        }

        // Liar-cell clues are rendered and checked by LiarCellConstraint.
        // Do not add them as one-cell killer cages here, because a killer cage
        // would also enforce the clue as a sum/value and conflict with the
        // liar rule (actual digit must be clue ± 1).

        for (const arrow of puzzleJson.arrows ?? []) {
            const circleCells = Array.isArray(arrow.circle) ? arrow.circle : [arrow.circle];

            importer.addArrow(this, circleCells, arrow.line);
        }

        if (puzzleJson.fog) {
            importer.addFog(this, puzzleJson.fog);
        }
    }
}
