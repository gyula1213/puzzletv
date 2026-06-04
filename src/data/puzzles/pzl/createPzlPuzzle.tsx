import { PuzzleDefinitionLoader } from "../../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../../types/puzzle/PuzzleTypeMap";
import { PuzzleImportOptions } from "../../../types/puzzle/PuzzleImportOptions";
import { DigitPuzzleTypeManager } from "../../../puzzleTypes/default/types/DigitPuzzleTypeManager";
import { CellColor } from "../../../types/puzzle/CellColor";
import { Constraint } from "../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../types/layout/Position";
import { RegionConstraint } from "../../../components/puzzle/constraints/region/Region";
import { CodedZonesConstraint } from "../../../components/puzzle/constraints/coded-zones/CodedZones";
import { RoundingCageConstraint } from "../../../components/puzzle/constraints/rounding-cage/RoundingCage";
import { LiarCellConstraint } from "../../../components/puzzle/constraints/liar-cell/LiarCell";
import { CloneRegionsConstraint } from "../../../components/puzzle/constraints/clone-regions/CloneRegions";
import { PuzzleImporter } from "../PuzzleImporter";
import { PzlJsonGridParser } from "./PzlJsonGridParser";
import { PzlGeneratedSudokuData } from "./PzlPuzzleTypes";

const cell = (top: number, left: number): Position => ({ top, left });

const parseCellLiteral = (literal: PositionLiteral): Position => {
    if (typeof literal !== "string") {
        return literal;
    }

    const match = /^R(-?\d+)C(-?\d+)$/.exec(literal);

    if (!match) {
        throw new Error(`Invalid position literal: ${literal}`);
    }

    return {
        top: Number(match[1]) - 1,
        left: Number(match[2]) - 1,
    };
};

const getDiagonalConstraints = (size: number): Constraint<NumberPTM>[] => [
    RegionConstraint(
        Array.from({ length: size }, (_, i) => cell(i, i)),
        false,
        "main diagonal 1",
    ),
    RegionConstraint(
        Array.from({ length: size }, (_, i) => cell(i, size - 1 - i)),
        false,
        "main diagonal 2",
    ),
];

const getDiagonalColors = (size: number) => {
    const initialColors: Record<number, Record<number, CellColor[]>> = {};

    for (let r = 0; r < size; r++) {
        const row = initialColors[r] ?? {};

        row[r] = [CellColor.lightGrey];
        row[size - 1 - r] = [CellColor.lightGrey];

        initialColors[r] = row;
    }

    return initialColors;
};

const getCloneColors = (data: PzlGeneratedSudokuData) => {
    const initialColors: Record<number, Record<number, CellColor[]>> = {};

    for (const cloneRegion of data.cloneRegions ?? []) {
        for (const literal of cloneRegion.cells) {
            const { top, left } = parseCellLiteral(literal);
            const row = initialColors[top] ?? {};

            row[left] = [CellColor.lightGrey];
            initialColors[top] = row;
        }
    }

    return initialColors;
};

const mergeInitialColors = (
    ...colorMaps: (Record<number, Record<number, CellColor[]>> | undefined)[]
) => {
    const result: Record<number, Record<number, CellColor[]>> = {};

    for (const colorMap of colorMaps) {
        for (const [rowKey, rowValue] of Object.entries(colorMap ?? {})) {
            result[Number(rowKey)] = {
                ...(result[Number(rowKey)] ?? {}),
                ...rowValue,
            };
        }
    }

    return result;
};

const createPairConstraint = (
    name: string,
    cell1: Position,
    cell2: Position,
    isAllowedPair: (value: number, otherValue: number) => boolean,
): Constraint<NumberPTM> => ({
    name,
    cells: [cell1, cell2],
    props: undefined,
    isObvious: true,

    isValidCell(cell, digits, cells, context) {
        const [firstCell, secondCell] = cells;
        const otherCell = cell.top === firstCell.top && cell.left === firstCell.left ? secondCell : firstCell;

        const valueData = digits[cell.top]?.[cell.left];
        const otherValueData = digits[otherCell.top]?.[otherCell.left];

        if (valueData === undefined || otherValueData === undefined) {
            return true;
        }

        const {
            typeManager: { getDigitByCellData },
        } = context.puzzle;

        const value = getDigitByCellData(valueData, context, cell);
        const otherValue = getDigitByCellData(otherValueData, context, otherCell);

        if (
            typeof value !== "number"
            || typeof otherValue !== "number"
            || !Number.isFinite(value)
            || !Number.isFinite(otherValue)
        ) {
            return true;
        }

        return isAllowedPair(value, otherValue);
    },
});

const NonConsecutivePairConstraint = (
    cell1: Position,
    cell2: Position,
): Constraint<NumberPTM> =>
    createPairConstraint(
        "non-consecutive pair",
        cell1,
        cell2,
        (value, otherValue) => Math.abs(value - otherValue) !== 1,
    );

const NoXVPairConstraint = (
    cell1: Position,
    cell2: Position,
): Constraint<NumberPTM> =>
    createPairConstraint(
        "no XV pair",
        cell1,
        cell2,
        (value, otherValue) => value + otherValue !== 5 && value + otherValue !== 10,
    );

const getOrthogonalPairConstraints = (
    size: number,
    factory: (cell1: Position, cell2: Position) => Constraint<NumberPTM>,
) => {
    const result: Constraint<NumberPTM>[] = [];

    for (let top = 0; top < size; top++) {
        for (let left = 0; left < size; left++) {
            const current = cell(top, left);

            if (left < size - 1) {
                result.push(factory(current, cell(top, left + 1)));
            }

            if (top < size - 1) {
                result.push(factory(current, cell(top + 1, left)));
            }
        }
    }

    return result;
};

const getExtraConstraints = (data: PzlGeneratedSudokuData): Constraint<NumberPTM>[] => {
    const size = data.size ?? 9;
    const result: Constraint<NumberPTM>[] = [];

    if (data.diagonal) {
        result.push(...getDiagonalConstraints(size));
    }

    if (data.nonConsecutive) {
        result.push(...getOrthogonalPairConstraints(size, NonConsecutivePairConstraint));
    }

    if (data.noXV) {
        result.push(...getOrthogonalPairConstraints(size, NoXVPairConstraint));
    }

    for (const codedZone of data.codedZones ?? []) {
        result.push(CodedZonesConstraint(codedZone));
    }

    for (const roundingCage of data.roundingCages ?? []) {
        result.push(RoundingCageConstraint(roundingCage));
    }

    for (const liarCell of data.liarCells ?? []) {
        result.push(LiarCellConstraint(liarCell));
    }

    if (data.cloneRegions?.length) {
        result.push(CloneRegionsConstraint(data.cloneRegions));
    }

    return result;
};

const getExtraColors = (data: PzlGeneratedSudokuData) =>
    mergeInitialColors(
        data.diagonal ? getDiagonalColors(data.size ?? 9) : undefined,
        data.cloneRegions?.length ? getCloneColors(data) : undefined,
    );

const addExtraConstraintSupport = (
    puzzle: ReturnType<PuzzleImporter<NumberPTM>["finalize"]>,
    data: PzlGeneratedSudokuData,
) => {
    const extraConstraints = getExtraConstraints(data);
    const extraColors = getExtraColors(data);

    if (!extraConstraints.length && !Object.keys(extraColors).length) {
        return puzzle;
    }

    const originalItems = puzzle.items;

    return {
        ...puzzle,

        // Keep all constraints generated by the importer and add the extra
        // constraints on top of them. PuzzleTV allows items to be either an
        // array or a function, so both cases must be handled.
        items: typeof originalItems === "function"
            ? (context: any) => [
                ...originalItems(context),
                ...extraConstraints,
            ]
            : [
                ...(originalItems ?? []),
                ...extraConstraints,
            ],

        initialColors: {
            ...(puzzle.initialColors ?? {}),
            ...extraColors,
        } as any,
    };
};

export const createPzlPuzzleDefinition = (data: PzlGeneratedSudokuData) => {
    const parser = new PzlJsonGridParser(data);

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
    const puzzle = addExtraConstraintSupport(importer.finalize(), data);
    importer.dispose();

    return {
        ...puzzle,
        noIndex: false,
        slug: data.slug,
        saveStateKey: data.slug,
        typeManager: DigitPuzzleTypeManager(),
    };
};

/**
 * Creates a PuzzleTV loader from a mechanically generated PZL data object.
 */
export const createPzlPuzzle = (
    data: PzlGeneratedSudokuData,
): PuzzleDefinitionLoader<NumberPTM> => ({
    noIndex: false,
    slug: data.slug,

    loadPuzzle: () => createPzlPuzzleDefinition(data),
});
