#!/bin/bash

PROJECT_NAME="scrollchain-operator"
REPO_URL="https://github.com/Yahawashiservant/scrollchainos-app"

echo "[AB] Checking Vercel project list..."
vercel projects ls --json > /tmp/vercel_projects.json || true

if ! grep -q "$PROJECT_NAME" /tmp/vercel_projects.json; then
  echo "[AB] Project not found. Creating..."
  vercel project add "$PROJECT_NAME" --yes
else
  echo "[AB] Project already exists."
fi

echo "[AB] Linking project..."
vercel link --project "$PROJECT_NAME" --yes

echo "[AB] Setting Git connection..."
vercel git connect "$PROJECT_NAME" "$REPO_URL" --yes || true

echo "[AB] Deploying..."
vercel deploy --prod --yes

echo "[AB] COMPLETE — project deployed."
