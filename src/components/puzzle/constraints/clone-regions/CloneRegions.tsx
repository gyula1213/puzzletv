import { Constraint } from "../../../../types/puzzle/Constraint";
import { Position, PositionLiteral } from "../../../../types/layout/Position";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

export type CloneRegionDefinition = {
    cells: PositionLiteral[];
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

const normalizeCloneRegion = (region: Position[]) => {
    const minTop = Math.min(...region.map((cell) => cell.top));
    const minLeft = Math.min(...region.map((cell) => cell.left));

    return region
        .map((cell) => ({
            cell,
            relativeTop: cell.top - minTop,
            relativeLeft: cell.left - minLeft,
        }))
        .sort((a, b) =>
            a.relativeTop === b.relativeTop
                ? a.relativeLeft - b.relativeLeft
                : a.relativeTop - b.relativeTop,
        );
};

export const CloneRegionsConstraint = (
    cloneRegions: CloneRegionDefinition[],
): Constraint<NumberPTM> => {
    const normalizedRegions = cloneRegions
        .map((region) => normalizeCloneRegion(region.cells.map(parseCellLiteral)));

    const cells = normalizedRegions.flatMap((region) => region.map(({ cell }) => cell));

    return {
        name: "clone regions",
        cells,
        props: undefined,
        isObvious: true,

        isValidCell(_cell, digits, _cells, context) {
            if (normalizedRegions.length < 2) {
                return true;
            }

            const firstRegion = normalizedRegions[0];

            for (const otherRegion of normalizedRegions.slice(1)) {
                if (otherRegion.length !== firstRegion.length) {
                    return false;
                }

                for (let i = 0; i < firstRegion.length; i++) {
                    if (
                        firstRegion[i].relativeTop !== otherRegion[i].relativeTop
                        || firstRegion[i].relativeLeft !== otherRegion[i].relativeLeft
                    ) {
                        return false;
                    }

                    const firstDigit = getDigitAtCell(firstRegion[i].cell, digits, context);
                    const otherDigit = getDigitAtCell(otherRegion[i].cell, digits, context);

                    if (firstDigit === undefined || otherDigit === undefined) {
                        return true;
                    }

                    if (firstDigit !== otherDigit) {
                        return false;
                    }
                }
            }

            return true;
        },
    };
};
