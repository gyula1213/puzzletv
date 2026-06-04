import { PositionLiteral } from "../../../../types/layout/Position";
import { GridSize } from "../../../../types/puzzle/GridSize";
import { AnyPTM } from "../../../../types/puzzle/PuzzleTypeMap";
import { OutsideClueConstraint } from "../outside-clue/OutsideClue";

export type JapaneseEvenOddSumsMode = "even" | "odd";

const isWantedParity = (digit: number, mode: JapaneseEvenOddSumsMode) =>
    mode === "even" ? digit % 2 === 0 : digit % 2 === 1;

const getBlockSums = (cellDigits: (number | undefined)[], mode: JapaneseEvenOddSumsMode) => {
    const sums: number[] = [];
    let currentSum = 0;
    let inBlock = false;

    for (const digit of cellDigits) {
        if (digit === undefined) {
            return undefined;
        }

        if (isWantedParity(digit, mode)) {
            currentSum += digit;
            inBlock = true;
        } else if (inBlock) {
            sums.push(currentSum);
            currentSum = 0;
            inBlock = false;
        }
    }

    if (inBlock) {
        sums.push(currentSum);
    }

    return sums;
};

const areEqualArrays = (actual: number[], expected: number[]) =>
    actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);

export const JapaneseEvenOddSumsConstraint = <T extends AnyPTM>(
    clueCellLiteral: PositionLiteral,
    cellLiteralsOrFieldSize: GridSize | PositionLiteral[],
    displayValue: number,
    expectedValues: number[],
    mode: JapaneseEvenOddSumsMode,
    checkEnabled = true,
    color?: string,
) =>
    OutsideClueConstraint<T>(
        "japanese-even-odd-sums",
        clueCellLiteral,
        cellLiteralsOrFieldSize,
        displayValue,
        color,
        (_currentDigit, cellDigits) => {
            if (!checkEnabled) {
                return true;
            }

            const actual = getBlockSums(cellDigits, mode);

            if (actual === undefined) {
                return true;
            }

            return areEqualArrays(actual, expectedValues);
        },
    );
