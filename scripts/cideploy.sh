#!/usr/bin/env bash
set -e

sshpass -p "$DEPLOY_PASS" \
  rsync -drz --delete --delete-before --delete-excluded --force --stats \
  -e "ssh -o StrictHostKeyChecking=no" \
  _site/ \
  "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
