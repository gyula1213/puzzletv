import { PositionLiteral } from "../../../../types/layout/Position";
import { GridSize } from "../../../../types/puzzle/GridSize";
import { AnyPTM } from "../../../../types/puzzle/PuzzleTypeMap";
import { OutsideClueConstraint } from "../outside-clue/OutsideClue";

const DEBUG_SUM_AROUND_6 = false;

export const SumAround6Constraint = <T extends AnyPTM>(
    clueCellLiteral: PositionLiteral,
    cellLiteralsOrFieldSize: GridSize | PositionLiteral[],
    value: number,
    color?: string,
) => {
    const expectedValue = value;

    return OutsideClueConstraint<T>(
        "sum-around-6",
        clueCellLiteral,
        cellLiteralsOrFieldSize,
        expectedValue,
        color,
        (
            currentDigit,
            cellDigits,
            context,
            isFinalCheck,
            cellIndex,
            callbackValue,
        ) => {
            const sixIndex = cellDigits.indexOf(6);

            const checkedIndexes = sixIndex < 0
                ? []
                : [
                    sixIndex,
                    ...(sixIndex > 0 ? [sixIndex - 1] : []),
                    ...(sixIndex < cellDigits.length - 1 ? [sixIndex + 1] : []),
                ];

            const neighborIndexes = checkedIndexes.filter((index) => index !== sixIndex);
            const neighborDigits = neighborIndexes.map((index) => cellDigits[index]);

            const hasAllNeighbors = !neighborDigits.some(
                (digit) => typeof digit !== "number" || !Number.isFinite(digit),
            );

            const actualValue = hasAllNeighbors
                ? neighborDigits
                    .map((digit) => digit as number)
                    .reduce((sum, digit) => sum + digit, 0)
                : undefined;

            const isOk = actualValue === expectedValue;

            if (DEBUG_SUM_AROUND_6) {
                // eslint-disable-next-line no-console
                console.log("[SumAround6]", {
                    clueCellLiteral,
                    expectedValue,
                    callbackValue,
                    currentDigit,
                    cellDigits: [...cellDigits],
                    isFinalCheck,
                    cellIndex,
                    sixIndex,
                    checkedIndexes,
                    neighborIndexes,
                    neighborDigits,
                    hasAllNeighbors,
                    actualValue,
                    isOk,
                    contextExists: !!context,
                });
            }

            if (sixIndex < 0) {
                return true;
            }

            if (!hasAllNeighbors) {
                return true;
            }

            if (isOk) {
                return true;
            }

            if (typeof cellIndex !== "number") {
                return false;
            }

            return !checkedIndexes.includes(cellIndex);
        },
    );
};
