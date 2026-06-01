import { LanguageCode } from "./LanguageCode";

export type TranslationItem<T = string> = {
    [LanguageCode.en]: T;
} & Partial<Record<Exclude<LanguageCode, LanguageCode.en>, T>>;

export type TranslationItemNoEn<T = string> =
    Partial<Record<Exclude<LanguageCode, LanguageCode.en>, T>>;

export type TranslationItemWithEn<T = string> = TranslationItem<T>;