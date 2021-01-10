export interface SpellRequest {
    locale: string,
    words: ReadonlyArray<Word>,
}

export interface SuggestRequest {
    locale: string,
    word: string,
}

export interface Word {
    start: number,
    str: string,
}