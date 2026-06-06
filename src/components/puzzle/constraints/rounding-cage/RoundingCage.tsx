import { FC } from "react";
import { GridLayer } from "../../../../types/puzzle/GridLayer";
import { Constraint, ConstraintProps } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type RoundingCageDefinition = {
    cells: PositionLiteral[];
    roundedToTen: number;
};

type RoundingCageProps = {
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

const getDigitAtCell = (position: Position, digits: any, context: any) => {
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

const cellKey = ({ top, left }: Position) => `${top}:${left}`;

/**
 * Visual-only cage renderer.
 *
 * This deliberately does not use the killer-cage constraint. The dotted cage is
 * only the notation; the rounding rule is implemented by RoundingCageConstraint.
 */
const RoundingCageComponent: FC<ConstraintProps<NumberPTM, RoundingCageProps>> = ({ cells, props }) => {
    if (!props) {
        return null;
    }

    const inset = 0.08;
    const cellSet = new Set(cells.map(cellKey));
    const firstCell = cells.reduce(
        (first, current) =>
            current.top < first.top || (current.top === first.top && current.left < first.left)
                ? current
                : first,
        cells[0],
    );

    return (
        <>
            {cells.map((cell) => {
                const lines = [];
                const { top, left } = cell;

                const x1 = left + inset;
                const x2 = left + 1 - inset;
                const y1 = top + inset;
                const y2 = top + 1 - inset;

                if (!cellSet.has(cellKey({ top: top - 1, left }))) {
                    lines.push(<line key="top" x1={x1} y1={y1} x2={x2} y2={y1} />);
                }
                if (!cellSet.has(cellKey({ top: top + 1, left }))) {
                    lines.push(<line key="bottom" x1={x1} y1={y2} x2={x2} y2={y2} />);
                }
                if (!cellSet.has(cellKey({ top, left: left - 1 }))) {
                    lines.push(<line key="left" x1={x1} y1={y1} x2={x1} y2={y2} />);
                }
                if (!cellSet.has(cellKey({ top, left: left + 1 }))) {
                    lines.push(<line key="right" x1={x2} y1={y1} x2={x2} y2={y2} />);
                }

                return (
                    <g
                        key={cellKey(cell)}
                        stroke="#555"
                        strokeWidth={0.025}
                        strokeDasharray="0.08 0.05"
                        strokeLinecap="round"
                        fill="none"
                    >
                        {lines}
                    </g>
                );
            })}

            <text
                x={firstCell.left + 0.26}
                y={firstCell.top + 0.25}
                fontSize={0.22}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#444"
                style={{ pointerEvents: "none", userSelect: "none" }}
            >
                {props.roundedToTen}
            </text>
        </>
    );
};

export const RoundingCage = {
    [GridLayer.regular]: RoundingCageComponent,
};

export const RoundingCageConstraint = (
    definition: RoundingCageDefinition,
): Constraint<NumberPTM, RoundingCageProps> => {
    const cells = definition.cells.map(parseCellLiteral);

    return {
        name: `rounding cage ${definition.roundedToTen}`,
        cells,
        props: { roundedToTen: definition.roundedToTen },
        component: RoundingCage,
        isObvious: true,

        isValidCell(_cell, digits, cells, context) {
            if (cells.length !== 2) {
                return true;
            }

            const digit1 = getDigitAtCell(cells[0], digits, context);
            const digit2 = getDigitAtCell(cells[1], digits, context);

            if (digit1 === undefined || digit2 === undefined) {
                return true;
            }

            const value = digit1 * 10 + digit2;
            return Math.round(value / 10) * 10 === definition.roundedToTen;
        },
    };
};
