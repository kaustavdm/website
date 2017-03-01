#!/usr/bin/env bash
set -e

if [ $1 != "--incremental" ]; then
  bundle exec jekyll clean
fi

bundle exec jekyll build $@

cp -vf ./scripts/_.htaccess ./_site/.htaccess

bundle exec htmlproofer ./_site \
  --disable-external --only-4xx --allow-hash-href \
  --check-html --directory-index-file "index.html"
