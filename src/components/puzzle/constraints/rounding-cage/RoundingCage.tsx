import { Constraint } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type RoundingCageDefinition = {
    cells: PositionLiteral[];
    roundedToTen: number;
};

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

const getDigitAtCell = (
    position: Position,
    digits: any,
    context: any,
) => {
    const cellData = digits[position.top]?.[position.left];

    if (cellData === undefined) {
        return undefined;
    }

    const digit = context.puzzle.typeManager.getDigitByCellData(cellData, context, position);

    if (typeof digit !== "number" || !Number.isFinite(digit)) {
        return undefined;
    }

    return digit;
};

const roundToNearestTen = (value: number) =>
    Math.round(value / 10) * 10;

const comparePositionsReadingOrder = (a: Position, b: Position) =>
    a.top === b.top ? a.left - b.left : a.top - b.top;

export const RoundingCageConstraint = (
    roundingCage: RoundingCageDefinition,
): Constraint<NumberPTM> => {
    const cells = roundingCage.cells
        .map(parseCellLiteral)
        .sort(comparePositionsReadingOrder);

    return {
        name: `rounding cage ${roundingCage.roundedToTen}`,
        cells,
        props: undefined,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            if (cells.length !== 2) {
                return true;
            }

            const first = getDigitAtCell(cells[0], digits, context);
            const second = getDigitAtCell(cells[1], digits, context);

            if (first === undefined || second === undefined) {
                return true;
            }

            const twoDigitNumber = first * 10 + second;

            return roundToNearestTen(twoDigitNumber) === roundingCage.roundedToTen;
        },
    };
};
