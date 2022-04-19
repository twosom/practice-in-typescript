type Options = {
    bannedWords: Array<string>
};

function refineText(source: string, options: Options): string {
    return [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords]
        .reduce((value, filter) => filter(value, options), source)
}

function normalizeWhiteSpaces(source: string) {
    return source.replace("\t", " ");
}

function maskBanedWord(source: string, bannedWord: string) {
    const mask = "*".repeat(bannedWord.length);
    return source.replace(bannedWord, mask);
}

function maskBannedWords(source: string, options: Options) {
    return options ? options.bannedWords.reduce(maskBanedWord, source) : source;
}

function compactWhiteSpaces(source: string) {
    return source.indexOf("  ") < 0
        ? source
        : compactWhiteSpaces(source.replace("  ", " "));
}

module.exports = refineText;
