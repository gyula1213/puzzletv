import { Constraint } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type LiarCellDefinition = {
    cell: PositionLiteral;
    value: number;
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

export const LiarCellConstraint = (
    liarCell: LiarCellDefinition,
): Constraint<NumberPTM> => {
    const cell = parseCellLiteral(liarCell.cell);

    return {
        name: `liar cell ${liarCell.value}`,
        cells: [cell],
        props: undefined,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            const digit = getDigitAtCell(cell, digits, context);

            if (digit === undefined) {
                return true;
            }

            return Math.abs(digit - liarCell.value) === 1;
        },
    };
};
