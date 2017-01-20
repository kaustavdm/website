#!/usr/bin/env bash
set -e

bundle exec jekyll build

cp -vf ./scripts/_.htaccess ./_site/.htaccess

bundle exec htmlproofer ./_site \
  --disable-external --only-4xx --allow-hash-href \
  --check-html --directory-index-file "index.html"
