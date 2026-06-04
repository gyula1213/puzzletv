import { Position } from "../../../../types/layout/Position";
import { Constraint } from "../../../../types/puzzle/Constraint";
import { NumberPTM } from "../../../../types/puzzle/PuzzleTypeMap";

/**
 * Constraint used by anti-diagonal Sudoku examples.
 *
 * The selected cells may contain at most three different digits. Empty cells are
 * ignored while solving, so partial grids are accepted until the fourth distinct
 * value appears.
 */
export const MaxThreeValuesConstraint = (
    cells: Position[],
    name: string,
): Constraint<NumberPTM> => ({
    name,
    cells,
    props: undefined,
    isObvious: true,

    isValidCell(cell, digits, cells, context) {
        const {
            typeManager: { getDigitByCellData },
        } = context.puzzle;

        const values = new Set<number>();

        for (const currentCell of cells) {
            const valueData = digits[currentCell.top]?.[currentCell.left];

            if (valueData === undefined) {
                continue;
            }

            const value = getDigitByCellData(valueData, context, currentCell);

            if (value === undefined) {
                continue;
            }

            values.add(value);

            if (values.size > 3) {
                return false;
            }
        }

        return true;
    },
});
