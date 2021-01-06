export interface SpellRequest {
    locale: string,
    words: ReadonlyArray<Word>,
}

export interface Word {
    start: number,
    str: string,
}