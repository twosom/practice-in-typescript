// sut = System Under Test <테스트 대상 시스템>
import faker from "@faker-js/faker";

const sut = require('./index');

test.each`
    source | expected
    ${"hello  world"} | ${"hello world"}
    ${"hello   world"} | ${"hello world"}
    ${"hello    world"} | ${"hello world"}
    ${"hello     world"} | ${"hello world"}
    ${"hello      world"} | ${"hello world"}
    ${"hello       world"} | ${"hello world"}
`(`sut transforms "$source" to "$expected"`, ({source, expected}) => {
    let actual: string = sut(source);
    expect(actual).toBe(expected);
});


test.each`
    source | expected
    ${"hello\t world"} | ${"hello world"}
    ${"hello \tworld"} | ${"hello world"}
`('sut transforms "$source" that contains tab character to "$expected"',
    ({source, expected}) => {
        const actual: string = sut(source);
        expect(actual).toBe(expected);
    });

test.each`
    source | bannedWords | expected
    ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
    ${"hello purist"} | ${["mockist", "purist"]} | ${"hello ******"}
`('sut transforms "$source" to "$expected"',
    ({source, bannedWords, expected}) => {
        const actual: string = sut(source, {bannedWords});
        expect(actual).toBe(expected);
    });


describe('given banned word', () => {
    let bannedWord = faker.lorem.word();
    const source = `hello ${bannedWord}`;
    const expected = `hello ${"*".repeat(bannedWord.length)}`;

    test(`${bannedWord} when invoke sut then it returns ${expected}`, () => {
        const actual = sut(source, {bannedWords: [bannedWord]});
        console.log(actual);
        expect(actual).toBe(expected);
    });

});
