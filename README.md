# strip-accents
Removes accents and diacritics from a string, converting accented Latin letters to plain ASCII.

## Install

```
$ npm install strip-accents
```

## Usage

```js
const stripAccents = require('strip-accents');

stripAccents('Sañyam');
//=> 'Sanyam'

stripAccents('Crème Brûlée, Łódź, Søren, Straße');
//=> 'Creme Brulee, Lodz, Soren, Strasse'
```

## What it does

- Strips accent marks: `é → e`, `ñ → n`, `ế → e`.
- Converts letters that have no accent-free form in Unicode: `ø → o`, `ł → l`, `đ → d`, `ı → i`, `ß → ss`, `æ → ae`, `œ → oe`, `þ → th`.
- Leaves other scripts unchanged, such as Korean, Japanese, Arabic, Hindi and emoji. Accents on Greek and Cyrillic letters are stripped (`ά → α`, `й → и`).
- Non-string input is converted with `String()`.

The result is returned in Unicode NFC form.

## Maintainers

- [Sanyam Kumar](https://github.com/snymkmr)
