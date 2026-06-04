import { blackColor } from "../../../app/globals";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { Constraint, ConstraintProps } from "../../../../types/puzzle/Constraint";
import { FC } from "react";
import { GridLayer } from "../../../../types/puzzle/GridLayer";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type SameParityProps = {
    boxWidth: number;
    boxHeight: number;
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

const getBoxIndex = (cell: Position, size: number, boxWidth: number, boxHeight: number) =>
    Math.floor(cell.top / boxHeight) * Math.ceil(size / boxWidth) + Math.floor(cell.left / boxWidth);

const SameParityComponent: FC<ConstraintProps<NumberPTM, SameParityProps>> = ({ cells }) => (
    <>
        {cells.map(({ top, left }) => (
            <rect
                key={`${top}-${left}`}
                x={left + 0.2}
                y={top + 0.2}
                width={0.6}
                height={0.6}
                fill="none"
                stroke={blackColor}
                strokeWidth={0.03}
            />
        ))}
    </>
);

export const SameParity = {
    [GridLayer.regular]: SameParityComponent,
};

export const SameParityConstraint = (
    cellLiterals: PositionLiteral[],
    size: number,
    boxWidth: number,
    boxHeight: number,
): Constraint<NumberPTM, SameParityProps> => {
    const cells = cellLiterals.map(parseCellLiteral);

    return {
        name: "same parity marked cells",
        cells,
        props: { boxWidth, boxHeight },
        component: SameParity,
        isObvious: true,

        isValidCell(_cell, digits, cells, context) {
            const paritiesByBox = new Map<number, number>();

            for (const currentCell of cells) {
                const digit = getDigitAtCell(currentCell, digits, context);

                if (digit === undefined) {
                    continue;
                }

                const boxIndex = getBoxIndex(currentCell, size, boxWidth, boxHeight);
                const parity = digit % 2;
                const previousParity = paritiesByBox.get(boxIndex);

                if (previousParity === undefined) {
                    paritiesByBox.set(boxIndex, parity);
                    continue;
                }

                if (previousParity !== parity) {
                    return false;
                }
            }

            return true;
        },
    };
};
