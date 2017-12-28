# Spellcheck CLI

A command-line tool for spellchecking files.

## Use Case

You can help contributors to your open-source software project catch spelling mistakes in documentation by running Spellcheck CLI as a pre-commit or pre-push Git hook or as part of your continuous integration process.

## Installation

If you want to run Spellcheck CLI on your own computer, you can install it globally:

```
$ npm install --global spellcheck-cli
```

If you want to run Spellcheck CLI in a Git hook or in a CI environment, it's better to add it as a development dependency of your application:

```
$ npm install --save-dev spellcheck-cli
```

## Options

```
  -f, --files <file|glob> <file|glob>...   A list of files or globs to spellcheck.
  -l, --language <language>                The language of the files. The default language is en-US. The following
                                           languages are supported: en-AU, en-CA, en-GB, en-US, en-ZA.
  -d, --dictionary <file>                  A file to use as a personal dictionary.
  -q, --quiet                              Do not output anything for files that contain no spelling mistakes.
  -h, --help                               Print this help screen.
```

### Globs

Spellcheck CLI uses [`globby`](https://github.com/sindresorhus/globby), which is based on [`glob`](https://github.com/isaacs/node-glob), to parse globs. The tool passes the provided list of globs directly to `globby`. This means that you can, for instance, use `!` to negate a glob:

```
$ spellcheck --files **/*.md !test/**/*.md test/README.md
```

See [the `node-glob` documentation](https://github.com/isaacs/node-glob#glob-primer) for a full description of glob syntax.

### Personal dictionary

The personal dictionary file should be in [`nspell` personal dictionary format](https://github.com/wooorm/nspell#personal-dictionary-documents).

## Markdown

Spellcheck CLI performs some preprocessing on Markdown files (_i.e._ files with the extension `.md` or `.markdown`):

- Transforms [Gemoji](https://github.com/wooorm/gemoji) into Unicode emoji, so that emoji names like `:octocat:` aren't spellchecked