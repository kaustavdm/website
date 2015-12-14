#!/usr/bin/env bash
set -e

sshpass -p "$DEPLOY_PASS" \
  scp -r _site/ \
  "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
