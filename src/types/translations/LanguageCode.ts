export enum LanguageCode {
    en = "en",
    hu = "hu",
    ru = "ru",
    de = "de",
}

export const allLanguageCodes: LanguageCode[] = [LanguageCode.en, LanguageCode.hu, LanguageCode.de, LanguageCode.ru];

export const languageNames: Record<LanguageCode, string> = {
    [LanguageCode.en]: "English",
    [LanguageCode.hu]: "Magyar",
    [LanguageCode.ru]: "Русский",
    [LanguageCode.de]: "Deutsch",
};
