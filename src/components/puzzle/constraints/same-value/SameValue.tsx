import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { Constraint, ConstraintProps } from "../../../../types/puzzle/Constraint";
import { FC } from "react";
import { GridLayer } from "../../../../types/puzzle/GridLayer";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type SameValuePair = [PositionLiteral, PositionLiteral];

type SameValueProps = {
    pairs: [Position, Position][];
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

const SameValueComponent: FC<ConstraintProps<NumberPTM, SameValueProps>> = ({ props }) => (
    <>
        {props?.pairs.map(([cell1, cell2], index) => (
            <line
                key={index}
                x1={cell1.left + 0.5}
                y1={cell1.top + 0.5}
                x2={cell2.left + 0.5}
                y2={cell2.top + 0.5}
                stroke="#b8b8b8"
                strokeWidth={0.07}
                strokeLinecap="round"
            />
        ))}
    </>
);

export const SameValue = {
    [GridLayer.regular]: SameValueComponent,
};

export const SameValueConstraint = (
    pairLiterals: SameValuePair[],
): Constraint<NumberPTM, SameValueProps> => {
    const pairs: [Position, Position][] = pairLiterals.map(([cell1, cell2]) => [
        parseCellLiteral(cell1),
        parseCellLiteral(cell2),
    ]);

    return {
        name: "same value pairs",
        cells: pairs.flatMap(([cell1, cell2]) => [cell1, cell2]),
        props: { pairs },
        component: SameValue,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            for (const [cell1, cell2] of pairs) {
                const digit1 = getDigitAtCell(cell1, digits, context);
                const digit2 = getDigitAtCell(cell2, digits, context);

                if (digit1 === undefined || digit2 === undefined) {
                    continue;
                }

                if (digit1 !== digit2) {
                    return false;
                }
            }

            return true;
        },
    };
};
