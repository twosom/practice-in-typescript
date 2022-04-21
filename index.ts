type Options = {
    bannedWords: Array<string>
};

function refineText(source: string, options: Options): string {
    return [
        normalizeWhiteSpaces,
        compactWhiteSpaces,
        maskBannedWords,
        trimWhitespaces,
    ].reduce((value, filter) => filter(value, options), source)
}

function trimWhitespaces(value: string): string {
    return value.trim();
}

function normalizeWhiteSpaces(source: string): string {
    return source.replace("\t", " ");
}

function maskBanedWord(source: string, bannedWord: string): string {
    const mask = "*".repeat(bannedWord.length);
    return source.replace(bannedWord, mask);
}

function maskBannedWords(source: string, options: Options): string {
    return options ? options.bannedWords.reduce(maskBanedWord, source) : source;
}

function compactWhiteSpaces(source: string): string {
    return source.indexOf("  ") < 0
        ? source
        : compactWhiteSpaces(source.replace("  ", " "));
}

module.exports = refineText;
