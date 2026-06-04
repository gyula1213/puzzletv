import { Constraint } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type CodedZoneDefinition = {
    label: string;
    zones: PositionLiteral[][];
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

    // Empty cells in PuzzleTV are not always represented as undefined at the
    // raw cell-data level. In practice they may come back as undefined, null,
    // NaN, or another non-finite value. Treat every non-real digit as
    // "not filled yet", so coded zones are checked only after all relevant
    // cells are actual digits.
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

export const CodedZonesConstraint = (
    codedZone: CodedZoneDefinition,
): Constraint<NumberPTM> => {
    const zones = codedZone.zones.map((zone) => zone.map(parseCellLiteral));
    const cells = zones.flat();

    return {
        name: `coded zones ${codedZone.label}`,
        cells,
        props: undefined,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            const normalizedZones = zones.map((zone) => normalizeSortedDigits(zone, digits, context));

            // Important: do not mark anything red until every zone with this
            // label is fully filled. For example, one completed A zone and one
            // empty A zone is still a partial state, not an error.
            if (normalizedZones.some((zone) => zone === undefined)) {
                return true;
            }

            return normalizedZones.every((zone) => zone === normalizedZones[0]);
        },
    };
};
