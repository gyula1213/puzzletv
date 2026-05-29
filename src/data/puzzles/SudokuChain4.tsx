import { PuzzleDefinition, PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { SudokuMaker } from "./Import";
import { PuzzleImportSource } from "../../types/puzzle/PuzzleImportOptions";

// Geometriai proba a 4 db sudoku lanc megjelenitesere.
// A nev/export/slug marad ugyanaz, hogy az AllPuzzles.ts-hez ne kelljen nyulni.

const SUDOKU_LOAD =
    "N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQDMJADCADQgAOArgF7MA2KBoOcMnhAOV4oO6dAAJ0jACYQA1o1og4jBAAtoBEAFUccnBADuOcQEFVGqEoDGItugIBtUADc4bRvwDsAXxqv3TwIyPwCPfgBOUJA3cIIAVmjYoPwADiTA-gAmDLj8IlyUgBZC-gA2UoIS-xjMghya5P4Cxrr8ENa8is6UqJ7%2BdP6CXyH8RNHxsJTuqYHK-PmR2ar5vuX8BvWO9c3avOr1pb3p1fnt4-5Ji4IW9cH1meu0%2BaumldHbp6O3jbPT0bWT0%2BP3OP12P1ebXuTwOT0eP2%2BUJe81hCPm4La8LaoLagJ%2BwOx-we82hP1RbQJeUReUheQxeUpKWpKXpvT%2BE3mWLypLaJQAunRrLh0AgoHBMDgEA58M4QAgAJ70fiUaIKpU3OhQFAAc2wOGljkoNCNRqINDNZqyNCtVpNxvNDst1uddtNjudNpoZC9PqKND9fviNCDQe9Yf9EcDwej4e9AYjIejZRoyeTXho6fTqRo2ezqZTGcLWZzJfzaaLJdzfJ81Z8QA";

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

        return {
            ...puzzle,
            title: {
                en: "4 Sudoku Chain - geometry test",
                hu: "4 db sudoku lanc - geometria proba",
            } as any,
            author: {
                en: "Gyula Slenker",
            } as any,
            slug: "sudoku-chain-4",
        } as PuzzleDefinition<NumberPTM>;
    },
};
