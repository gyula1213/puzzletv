import { PuzzleDefinition, PuzzleDefinitionLoader } from "../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../types/puzzle/PuzzleTypeMap";
import { SudokuMaker } from "./Import";

const initialDigits = [
    [undefined, 6, undefined, undefined, undefined, undefined, undefined, 4, 5],
    [undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, 4, undefined, 2, undefined, 5, 8, 3, undefined],

    [undefined, 7, 6, 5, undefined, 8, undefined, undefined, undefined],
    [undefined, undefined, undefined, 6, undefined, 3, undefined, undefined, undefined],
    [1, undefined, undefined, 7, undefined, 2, 6, 5, undefined],

    [undefined, 9, undefined, 4, undefined, undefined, undefined, 7, undefined],
    [undefined, undefined, 8, undefined, undefined, undefined, undefined, 1, undefined],
    [undefined, undefined, undefined, 1, undefined, 7, 9, 2, undefined],
];

const solution = [
    [8, 6, 2, 9, 3, 1, 7, 4, 5],
    [3, 1, 5, 8, 7, 4, 2, 6, 9],
    [9, 4, 7, 2, 6, 5, 8, 3, 1],

    [4, 7, 6, 5, 1, 8, 3, 9, 2],
    [5, 2, 9, 6, 4, 3, 1, 8, 7],
    [1, 8, 3, 7, 9, 2, 6, 5, 4],

    [2, 9, 1, 4, 8, 6, 5, 7, 3],
    [7, 5, 8, 3, 2, 9, 4, 1, 6],
    [6, 3, 4, 1, 5, 7, 9, 2, 8],
];

export const TesztSudoku: PuzzleDefinitionLoader<NumberPTM> = {
    noIndex: false,
    slug: "teszt-sudoku",
    loadPuzzle: () => {
        const puzzle = SudokuMaker.loadPuzzle({
            load: "N4IgZg9gTgtghgFwGoFMoGcCWEB2IBcIAjAHQDMJADCADQgAOArgF7MA2KBoOcMnhAOV4oO6dAAJ0jACYQA1o1og4jBAAtoBEAFUccnBADuOcQEFVGqEoDGItugIBtUADc4bRvwDsAXxqv3TwIyPwCPfgBOUJA3cIIAVmjYoPwADiTA-gAmDLj8IlyUgBZC-gA2UoIS-xjMghya5P4Cxrr8ENa8is6UqJ7%2BdP6CXyH8RNHxsJTuqYHK-PmR2ar5vuX8BvWO9c3avOr1pb3p1fnt4-5Ji4IW9cH1meu0%2BaumldHbp6O3jbPT0bWT0%2BP3OP12P1ebXuTwOT0eP2%2BUJe81hCPm4La8LaoLagJ%2BwOx-we82hP1RbQJeUReUheQxeUpKWpKXpvT%2BE3mWLypLaJQAunRrLh0AgoHBMDgEA58M4QAgAJ70fiUaIKpU3OhQFAAc2wOGljkoNCNRqINDNZqyNCtVpNxvNDst1uddtNjudNpoZC9PqKND9fviNCDQe9Yf9EcDwej4e9AYjIejZRoyeTXho6fTqRo2ezqZTGcLWZzJfzaaLJdzfJ81Z8QA",
        }) as PuzzleDefinition<NumberPTM>;

        return {
            ...puzzle,
            title: {
                en: "Érettségi találkozó, 2026",
            } as any,
            author: {
                en: "Gyula Slenker",
            } as any,
            slug: "teszt-sudoku",
            initialDigits: initialDigits as any,
            solution,
        } as PuzzleDefinition<NumberPTM>;
    },
};
