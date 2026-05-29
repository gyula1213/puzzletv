import { PuzzleDefinition, PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { SudokuMaker } from "./Import";

// Kezdemény a 4 db sudoku lánc PuzzleTV-s megjelenítéséhez.
// Első körben csak a 21x21-es alakzatot és a megadott számokat tesszük ide.
// A gen-* kulcsszavak, hidden/visible adatok és extra szabályok most szándékosan kimaradnak.

const fieldMask = [
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false],
];

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

export const SudokuChain4: PuzzleDefinitionLoader<NumberPTM> = {
    noIndex: false,
    slug: "sudoku-chain-4",
    loadPuzzle: () => {
        // TODO:
        // Ez egy induló váz. A load mező egyelőre a TesztSudoku működő load-stringje.
        // Ha a PuzzleTV renderelője ragaszkodik a load-stringben tárolt 9x9-es táblához,
        // akkor a következő lépés az lesz, hogy ehhez a 21x21-es alakzathoz kell saját
        // PuzzleDefinition-t vagy megfelelő import/load adatot készíteni.
        const puzzle = SudokuMaker.loadPuzzle({
            load: "N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQDMJADCADQgAOArgF7MA2KBoOcMnhAOV4oO6dAAJ0jACYQA1o1og4jBAAtoBEAFUccnBADuOcQEFVGqEoDGItugIBtUADc4bRvwDsAXxqv3TwIyPwCPfgBOUJA3cIIAVmjYoPwADiTA-gAmDLj8IlyUgBZC-gA2UoIS-xjMghya5P4Cxrr8ENa8is6UqJ7%2BdP6CXyH8RNHxsJTuqYHK-PmR2ar5vuX8BvWO9c3avOr1pb3p1fnt4-5Ji4IW9cH1meu0%2BaumldHbp6O3jbPT0bWT0%2BP3OP12P1ebXuTwOT0eP2%2BUJe81hCPm4La8LaoLagJ%2BwOx-we82hP1RbQJeUReUheQxeUpKWpKXpvT%2BE3mWLypLaJQAunRrLh0AgoHBMDgEA58M4QAgAJ70fiUaIKpU3OhQFAAc2wOGljkoNCNRqINDNZqyNCtVpNxvNDst1uddtNjudNpoZC9PqKND9fviNCDQe9Yf9EcDwej4e9AYjIejZRoyeTXho6fTqRo2ezqZTGcLWZzJfzaaLJdzfJ81Z8QA",
        }) as PuzzleDefinition<NumberPTM>;

        return {
            ...puzzle,
            title: {
                en: "4 Sudoku Chain",
                hu: "4 db sudoku lánc",
            } as any,
            author: {
                en: "Gyula Slenker",
            } as any,
            slug: "sudoku-chain-4",
            initialDigits: initialDigits as any,
            solution: solution as any,
            extension: {
                ...(puzzle as any).extension,
                fieldMask,
            } as any,
        } as PuzzleDefinition<NumberPTM>;
    },
};
