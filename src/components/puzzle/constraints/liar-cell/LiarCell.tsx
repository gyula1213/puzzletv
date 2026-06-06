import { FC } from "react";
import { GridLayer } from "../../../../types/puzzle/GridLayer";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { Constraint, ConstraintProps } from "../../../../types/puzzle/Constraint";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type LiarCellDefinition = {
    cell: PositionLiteral;
    value: number;
};

type LiarCellProps = {
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

const LiarCellComponent: FC<ConstraintProps<NumberPTM, LiarCellProps>> = ({ cells, props }) => {
    const cell = cells[0];

    if (!cell || !props) {
        return null;
    }

    return (
        <text
            x={cell.left + 0.18}
            y={cell.top + 0.33}
            fontSize={0.32}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#555"
            style={{ pointerEvents: "none", userSelect: "none" }}
        >
            {props.value}
        </text>
    );
};

export const LiarCell = {
    [GridLayer.regular]: LiarCellComponent,
};

export const LiarCellConstraint = (
    liarCell: LiarCellDefinition,
): Constraint<NumberPTM, LiarCellProps> => {
    const cell = parseCellLiteral(liarCell.cell);

    return {
        name: `liar cell ${liarCell.value}`,
        cells: [cell],
        props: { value: liarCell.value },
        component: LiarCell,
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
