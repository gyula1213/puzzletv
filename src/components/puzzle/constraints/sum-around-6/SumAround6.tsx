import { PositionLiteral } from "../../../../types/layout/Position";
import { GridSize } from "../../../../types/puzzle/GridSize";
import { AnyPTM } from "../../../../types/puzzle/PuzzleTypeMap";
import { OutsideClueConstraint } from "../outside-clue/OutsideClue";

export const SumAround6Constraint = <T extends AnyPTM>(
    clueCellLiteral: PositionLiteral,
    cellLiteralsOrFieldSize: GridSize | PositionLiteral[],
    value: number,
    color?: string,
) =>
    OutsideClueConstraint<T>(
        "sum-around-6",
        clueCellLiteral,
        cellLiteralsOrFieldSize,
        value,
        color,
        (_currentDigit, cellDigits, _context, _isFinalCheck, _cellIndex, value) => {
            const sixIndex = cellDigits.indexOf(6);

            if (sixIndex < 0) {
                return true;
            }

            let actualValue = 0;

            if (sixIndex > 0) {
                const left = cellDigits[sixIndex - 1];
                if (left === undefined) {
                    return true;
                }

                actualValue += left;
            }

            if (sixIndex < cellDigits.length - 1) {
                const right = cellDigits[sixIndex + 1];
                if (right === undefined) {
                    return true;
                }

                actualValue += right;
            }

            return actualValue === value;
        },
    );
