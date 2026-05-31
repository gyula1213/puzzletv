import { PuzzleDefinition, PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { SudokuMaker } from "./Import";
import { PuzzleImportSource } from "../../types/puzzle/PuzzleImportOptions";
import { RulesParagraph } from "../../components/puzzle/rules/RulesParagraph";
import { CellColor } from "../../types/puzzle/CellColor";
import { RegionConstraint } from "../../components/puzzle/constraints/region/Region";
import { Constraint } from "../../types/puzzle/Constraint";
import { Position } from "../../types/layout/Position";

const SUDOKU_LOAD =
    "N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQDMJADCADQgAOArgF7MA2KBoOcMnhAOV4oO6dAAJ0jACYQA1o1og4jBAAtoBEAFUccnBADuOcQEFVGqEoDGItugIBtUADc4bRvwDsAXxqv3TwIyPwCPfgBOUJA3cIIAVmjYoPwADiTA-gAmDLj8IlyUgBZC-gA2UoIS-xjMghya5P4Cxrr8ENa8is6UqJ7%2BdP6CXyH8RNHxsJTuqYHK-PmR2ar5vuX8BvWO9c3avOr1pb3p1fnt4-5Ji4IW9cH1meu0%2BaumldHbp6O3jbPT0bWT0%2BP3OP12P1ebXuTwOT0eP2%2BUJe81hCPm4La8LaoLagJ%2BwOx-we82hP1RbQJeUReUheQxeUpKWpKXpvT%2BE3mWLypLaJQAunRrLh0AgoHBMDgEA58M4QAgAJ70fiUaIKpU3OhQFAAc2wOGljkoNCNRqINDNZqyNCtVpNxvNDst1uddtNjudNpoZC9PqKND9fviNCDQe9Yf9EcDwej4e9AYjIejZRoyeTXho6fTqRo2ezqZTGcLWZzJfzaaLJdzfJ81Z8QA";

const solution = [
    [undefined, undefined, undefined, undefined, undefined, undefined, 9, 1, 7, 6, 5, 8, 3, 4, 2, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 4, 8, 2, 1, 7, 3, 9, 6, 5, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 6, 3, 5, 9, 4, 2, 7, 8, 1, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 3, 5, 4, 2, 8, 9, 6, 1, 7, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 2, 6, 8, 7, 1, 4, 5, 3, 9, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 7, 9, 1, 5, 3, 6, 8, 2, 4, undefined, undefined, undefined, undefined, undefined, undefined],
    [8, 4, 2, 6, 9, 1, 5, 7, 3, 8, 2, 1, 4, 9, 6, 1, 2, 5, 3, 8, 7],
    [3, 7, 9, 2, 5, 8, 1, 4, 6, 3, 9, 5, 2, 7, 8, 3, 4, 9, 5, 1, 6],
    [5, 1, 6, 4, 7, 3, 8, 2, 9, 4, 6, 7, 1, 5, 3, 6, 8, 7, 4, 2, 9],
    [7, 9, 4, 8, 1, 5, 3, 6, 2, undefined, undefined, undefined, 5, 3, 9, 7, 1, 6, 8, 4, 2],
    [2, 5, 8, 3, 6, 9, 7, 1, 4, undefined, undefined, undefined, 8, 4, 7, 9, 5, 2, 6, 3, 1],
    [6, 3, 1, 7, 4, 2, 9, 5, 8, undefined, undefined, undefined, 6, 2, 1, 8, 3, 4, 7, 9, 5],
    [1, 6, 3, 9, 2, 7, 4, 8, 5, 9, 1, 3, 7, 6, 2, 4, 9, 3, 1, 5, 8],
    [9, 2, 7, 5, 8, 4, 6, 3, 1, 5, 7, 2, 9, 8, 4, 5, 7, 1, 2, 6, 3],
    [4, 8, 5, 1, 3, 6, 2, 9, 7, 8, 6, 4, 3, 1, 5, 2, 6, 8, 9, 7, 4],
    [undefined, undefined, undefined, undefined, undefined, undefined, 3, 1, 2, 4, 9, 8, 6, 5, 7, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 5, 7, 8, 1, 3, 6, 2, 4, 9, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 9, 4, 6, 2, 5, 7, 1, 3, 8, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 7, 5, 3, 6, 8, 9, 4, 2, 1, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 1, 2, 9, 3, 4, 5, 8, 7, 6, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 8, 6, 4, 7, 2, 1, 5, 9, 3, undefined, undefined, undefined, undefined, undefined, undefined],
];

// const initialDigits = solution; // Kipróbálni, hogy a megoldás jól van-e feltöltve

const initialDigits = [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 7, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, 1, undefined, 3, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, 9, undefined, 2, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, 5, undefined, undefined, 8, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 7, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [3, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, 3, undefined, 5, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, 6],
    [undefined, 1, undefined, 4, undefined, 3, undefined, undefined, undefined, undefined, 6, undefined, undefined, undefined, undefined, 6, undefined, 7, undefined, 2, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [2, undefined, undefined, 3, undefined, undefined, 7, undefined, 4, undefined, undefined, undefined, 8, undefined, 7, undefined, undefined, 2, undefined, undefined, 1],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, 6, undefined, 9, undefined, 7, undefined, undefined, undefined, 9, 1, 3, undefined, undefined, undefined, 4, undefined, 3, undefined, 5, undefined],
    [9, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, 7, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 3],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, 7, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, 3, undefined, 5, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, 6, 4, undefined, undefined, undefined, 5, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
];

const initialColors: any = {};

for (let r = 0; r < 9; r++) {
    const row = initialColors[r] ?? {};

    row[r + 6] = [CellColor.lightGrey];
    row[14 - r] = [CellColor.lightGrey];

    initialColors[r] = row;
}

const NonConsecutivePairConstraint = (
    cell1: Position,
    cell2: Position,
): Constraint<NumberPTM> => ({
    name: "left sudoku non-consecutive pair",
    cells: [cell1, cell2],
    props: undefined,
    isObvious: true,

    isValidCell(cell, digits, cells, context) {
        const [firstCell, secondCell] = cells;
        const otherCell = cell.top === firstCell.top && cell.left === firstCell.left ? secondCell : firstCell;

        const valueData = digits[cell.top]?.[cell.left];
        const otherValueData = digits[otherCell.top]?.[otherCell.left];

        if (valueData === undefined || otherValueData === undefined) {
            return true;
        }

        const {
            typeManager: { getDigitByCellData },
        } = context.puzzle;

        const value = getDigitByCellData(valueData, context, cell);
        const otherValue = getDigitByCellData(otherValueData, context, otherCell);

        if (value === undefined || otherValue === undefined) {
            return true;
        }

        return Math.abs(value - otherValue) !== 1;
    },
});

const NoXVPairConstraint = (
    cell1: Position,
    cell2: Position,
): Constraint<NumberPTM> => ({
    name: "right sudoku noXV pair",
    cells: [cell1, cell2],
    props: undefined,
    isObvious: true,

    isValidCell(cell, digits, cells, context) {
        const [firstCell, secondCell] = cells;
        const otherCell = cell.top === firstCell.top && cell.left === firstCell.left ? secondCell : firstCell;

        const valueData = digits[cell.top]?.[cell.left];
        const otherValueData = digits[otherCell.top]?.[otherCell.left];

        if (valueData === undefined || otherValueData === undefined) {
            return true;
        }

        const {
            typeManager: { getDigitByCellData },
        } = context.puzzle;

        const value = getDigitByCellData(valueData, context, cell);
        const otherValue = getDigitByCellData(otherValueData, context, otherCell);

        if (value === undefined || otherValue === undefined) {
            return true;
        }

        return value + otherValue !== 5 && value + otherValue !== 10;
    },
});

// Lánykori nevén antidiagonális sudoku
const MaxThreeValuesConstraint = (
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

export const SudokuChain4: PuzzleDefinitionLoader<NumberPTM> = {
    noIndex: false,
    slug: "sudoku-chain-4",
    loadPuzzle: () => {
        const puzzle = SudokuMaker.loadPuzzle({
            load: SUDOKU_LOAD,
            offsetX: 6,
            offsetY: 0,
            maxDigit: 9,
            extraGrids: [
                {
                    source: PuzzleImportSource.SudokuMaker,
                    load: SUDOKU_LOAD,
                    offsetX: 0,
                    offsetY: 6,
                },
                {
                    source: PuzzleImportSource.SudokuMaker,
                    load: SUDOKU_LOAD,
                    offsetX: 12,
                    offsetY: 6,
                },
                {
                    source: PuzzleImportSource.SudokuMaker,
                    load: SUDOKU_LOAD,
                    offsetX: 6,
                    offsetY: 12,
                },
            ],
        } as any) as PuzzleDefinition<NumberPTM>;

        const cell = (top: number, left: number): Position => ({ top, left });
        const sudokuOffsets = [
            { top: 0, left: 6 },   // top
            { top: 6, left: 0 },   // left
            { top: 6, left: 12 },  // right
            { top: 12, left: 6 },  // bottom
        ];

        const sudokuRowColumnConstraints: Constraint<NumberPTM>[] = sudokuOffsets.flatMap(({ top, left }, sudokuIndex) => {
            const result: Constraint<NumberPTM>[] = [];

            for (let i = 0; i < 9; i++) {
                result.push(
                    RegionConstraint(
                        Array.from({ length: 9 }, (_, j) => cell(top + i, left + j)),
                        false,
                        `sudoku ${sudokuIndex + 1} row ${i + 1}`,
                    ),
                );

                result.push(
                    RegionConstraint(
                        Array.from({ length: 9 }, (_, j) => cell(top + j, left + i)),
                        false,
                        `sudoku ${sudokuIndex + 1} column ${i + 1}`,
                    ),
                );
            }

            return result;
        });

        const topSudokuDiagonalConstraints: Constraint<NumberPTM>[] = [];
        topSudokuDiagonalConstraints.push(
            RegionConstraint(
                Array.from({ length: 9 }, (_, i) => cell(i, 6 + i)),
                false,
                "top sudoku diagonal 1",
            ),
        );
        topSudokuDiagonalConstraints.push(
            RegionConstraint(
                Array.from({ length: 9 }, (_, i) => cell(i, 14 - i)),
                false,
                "top sudoku diagonal 2",
            ),
        );

        const leftSudokuNonConsecutiveConstraints: Constraint<NumberPTM>[] = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const current = cell(6 + r, c);

                if (c < 8) {
                    leftSudokuNonConsecutiveConstraints.push(
                        NonConsecutivePairConstraint(current, cell(6 + r, c + 1)),
                    );
                }

                if (r < 8) {
                    leftSudokuNonConsecutiveConstraints.push(
                        NonConsecutivePairConstraint(current, cell(6 + r + 1, c)),
                    );
                }
            }
        }

        const rightSudokuNoXVConstraints: Constraint<NumberPTM>[] = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const current = cell(6 + r, 12 + c);

                if (c < 8) {
                    rightSudokuNoXVConstraints.push(
                        NoXVPairConstraint(current, cell(6 + r, 12 + c + 1)),
                    );
                }

                if (r < 8) {
                    rightSudokuNoXVConstraints.push(
                        NoXVPairConstraint(current, cell(6 + r + 1, 12 + c)),
                    );
                }
            }
        }

        const bottomSudokuDiagonalConstraints: Constraint<NumberPTM>[] = [];
        bottomSudokuDiagonalConstraints.push(
            MaxThreeValuesConstraint(
                Array.from({ length: 9 }, (_, i) => cell(12 + i, 6 + i)),
                "bottom sudoku diagonal 1 max three values",
            ),
        );
        bottomSudokuDiagonalConstraints.push(
            MaxThreeValuesConstraint(
                Array.from({ length: 9 }, (_, i) => cell(12 + i, 14 - i)),
                "bottom sudoku diagonal 2 max three values",
            ),
        );

        return {
            ...puzzle,
            disableSudokuRules: true,

            items: [
                ...sudokuRowColumnConstraints,
                ...topSudokuDiagonalConstraints,
                ...leftSudokuNonConsecutiveConstraints,
                ...rightSudokuNoXVConstraints,
                ...bottomSudokuDiagonalConstraints,
            ],

            title: {
                en: "4 Sudoku Chain",
            } as any,
            author: {
                en: "Gyula Slenker",
            } as any,
            rules: () => (
                <>
                    <RulesParagraph>
                        The puzzle consists of four overlapping Sudoku grids.
                    </RulesParagraph>
                    <RulesParagraph>
                        Normal Sudoku rules apply in each of the four 9×9 grids.
                    </RulesParagraph>

                    <RulesParagraph>
                        1. Top Sudoku: Diagonal Sudoku. Digits 1–9 must also appear exactly
                        once on both main diagonals.
                    </RulesParagraph>

                    <RulesParagraph>
                        2. Left Sudoku: Non-consecutive Sudoku. Orthogonally adjacent cells
                        may not contain consecutive digits.
                    </RulesParagraph>

                    <RulesParagraph>
                        3. Right Sudoku: No XV Sudoku. Orthogonally adjacent cells may not
                        sum to 5 or 10.
                    </RulesParagraph>

                    <RulesParagraph>
                        4. Bottom Sudoku: For each of the two main diagonals, the first
                        three cells, the middle three cells and the last three cells must
                        contain identical sets of three digits. The order of the digits
                        within each group is irrelevant.
                    </RulesParagraph>
                </>
            ),
            slug: "sudoku-chain-4",
            initialDigits: initialDigits as any,
            initialColors: initialColors as any,
            solution: solution as any,
        } as PuzzleDefinition<NumberPTM>;
    },
};
