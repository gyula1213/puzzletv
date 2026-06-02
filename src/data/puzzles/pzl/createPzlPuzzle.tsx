import { PuzzleDefinitionLoader } from "../../../types/puzzle/PuzzleDefinition";
import { NumberPTM } from "../../../types/puzzle/PuzzleTypeMap";
import { PuzzleImportOptions } from "../../../types/puzzle/PuzzleImportOptions";
import { DigitPuzzleTypeManager } from "../../../puzzleTypes/default/types/DigitPuzzleTypeManager";
import { PuzzleImporter } from "../PuzzleImporter";
import { PzlJsonGridParser } from "./PzlJsonGridParser";
import { PzlGeneratedSudokuData } from "./PzlPuzzleTypes";

export const createPzlPuzzleDefinition = (data: PzlGeneratedSudokuData) => {
    const parser = new PzlJsonGridParser(data);
    const importOptions = {
        title: data.title,
        author: data.author,
    } as PuzzleImportOptions;

    const importer = new PuzzleImporter<NumberPTM>(
        data.slug,
        importOptions,
        DigitPuzzleTypeManager(),
        parser.gridSize,
    );

    importer.addGrid(parser);
    const puzzle = importer.finalize();
    importer.dispose();

    return {
        ...puzzle,
        noIndex: false,
        slug: data.slug,
        saveStateKey: data.slug,
    };
};

/**
 * Creates a PuzzleTV loader from a mechanically generated PZL data object.
 */
export const createPzlPuzzle = (
    data: PzlGeneratedSudokuData,
): PuzzleDefinitionLoader<NumberPTM> => ({
    noIndex: false,
    slug: data.slug,
    loadPuzzle: () => createPzlPuzzleDefinition(data),
});
