Kaustav's blog's source code. Go to https://kaustavdm.in for the content.

[![Build Status](https://travis-ci.org/kaustavdm/kaustavdm.in.svg?branch=master)](https://travis-ci.org/kaustavdm/kaustavdm.in)

## Setting up

- Install Ruby 2.3
- Install bundler
- In the repository root, run: `$ bundle install`

## Building for production

```sh
$ JEKYLL_ENV=production ./scripts/cibuild.sh
```

## Building with drafts

```sh
$ ./scripts/cibuild.sh --drafts
```
