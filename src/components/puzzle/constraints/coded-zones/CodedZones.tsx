import { FC } from "react";
import { GridLayer } from "../../../../types/puzzle/GridLayer";
import { Constraint, ConstraintProps } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type CodedZoneDefinition = {
    label: string;
    zones: PositionLiteral[][];
};

type CodedZonesProps = {
    label: string;
    zones: Position[][];
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

const normalizeSortedDigits = (
    zone: Position[],
    digits: any,
    context: any,
) => {
    const result: number[] = [];

    for (const position of zone) {
        const digit = getDigitAtCell(position, digits, context);

        if (digit === undefined) {
            return undefined;
        }

        result.push(digit);
    }

    return result.sort((a, b) => a - b).join(",");
};

const cellKey = ({ top, left }: Position) => `${top}:${left}`;

/**
 * Visual-only cage renderer.
 *
 * Do not use PuzzleTV's killer-cage constraint for these IB examples: the cage
 * border is only part of the notation, while the actual rule is implemented by
 * CodedZonesConstraint below.
 */
const VisualCage = ({ cells, label }: { cells: Position[]; label: string }) => {
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
                x={firstCell.left + 0.24}
                y={firstCell.top + 0.25}
                fontSize={0.22}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#444"
                style={{ pointerEvents: "none", userSelect: "none" }}
            >
                {label}
            </text>
        </>
    );
};

const CodedZonesComponent: FC<ConstraintProps<NumberPTM, CodedZonesProps>> = ({ props }) => {
    if (!props) {
        return null;
    }

    return (
        <>
            {props.zones.map((zone, index) => (
                <VisualCage key={index} cells={zone} label={props.label} />
            ))}
        </>
    );
};

export const CodedZones = {
    [GridLayer.regular]: CodedZonesComponent,
};

export const CodedZonesConstraint = (
    codedZone: CodedZoneDefinition,
): Constraint<NumberPTM, CodedZonesProps> => {
    const zones = codedZone.zones.map((zone) => zone.map(parseCellLiteral));
    const cells = zones.flat();

    return {
        name: `coded zones ${codedZone.label}`,
        cells,
        props: { label: codedZone.label, zones },
        component: CodedZones,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            const normalizedZones = zones.map((zone) => normalizeSortedDigits(zone, digits, context));

            if (normalizedZones.some((zone) => zone === undefined)) {
                return true;
            }

            return normalizedZones.every((zone) => zone === normalizedZones[0]);
        },
    };
};
