import { makeAutoObservable } from "mobx";
import { localStorageManager } from "../../utils/localStorage";
import { PencilmarksCheckerMode } from "../puzzle/PencilmarksCheckerMode";
import { AnimationSpeed } from "../puzzle/AnimationSpeed";
import { UAParser } from "ua-parser-js";
import { LanguageCode } from "../translations/LanguageCode";


const getLanguageCodeFromUrl = (): LanguageCode | undefined => {
    const hashMatch = /(?:^|:)lang=(hu|en)(?:$|[:&?#])/i.exec(window.location.hash);
    const searchMatch = /(?:^|[?&])lang=(hu|en)(?:$|&)/i.exec(window.location.search);

    const language = (hashMatch?.[1] || searchMatch?.[1])?.toLowerCase();

    switch (language) {
        case "hu":
            return LanguageCode.hu;

        case "en":
            return LanguageCode.en;

        default:
            return undefined;
    }
};

const getInitialLanguageCode = () =>
    getLanguageCodeFromUrl() ?? LanguageCode.en;

class Settings {
    isOpened = false;

    languageCode = getInitialLanguageCode();

    readonly enableConflictChecker = localStorageManager.getBoolManager("enableConflictChecker", true);

    readonly pencilmarksCheckerMode = localStorageManager.getNumberManager<PencilmarksCheckerMode>(
        "pencilmarksCheckerMode",
        PencilmarksCheckerMode.CheckObvious,
    );

    readonly autoCheckOnFinish = localStorageManager.getBoolManager("autoCheckOnFinish", true);

    readonly animationSpeed = localStorageManager.getNumberManager<AnimationSpeed>(
        "animationSpeed",
        AnimationSpeed.regular,
    );

    readonly flipKeypad = localStorageManager.getBoolManager("flipKeypad");

    readonly backgroundOpacity = localStorageManager.getNumberManager<number>("backgroundOpacity", 0.5);

    readonly highlightSeenCells = localStorageManager.getBoolManager("highlightSeenCells");

    readonly nickname = localStorageManager.getStringManager("nickname");

    readonly debugSolutionChecker = localStorageManager.getBoolManager("debugSolutionChecker");

    readonly simplifiedGraphics = localStorageManager.getBoolManager(
        "simplifiedGraphics",
        !process.env.STORYBOOK && new UAParser().getResult().device.vendor !== "apple",
    );

    constructor() {
        makeAutoObservable(this);

        window.addEventListener("hashchange", () => {
            const languageCode = getLanguageCodeFromUrl();

            if (languageCode) {
                this.setLanguageCode(languageCode);
            }
        });
    }

    toggle(open: boolean) {
        this.isOpened = open;
    }

    setLanguageCode(languageCode: LanguageCode) {
        if (this.languageCode !== languageCode) {
            this.languageCode = languageCode;
        }
    }
}

export const settings = new Settings();
(window as any).settings = settings;
