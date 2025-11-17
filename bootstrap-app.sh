#!/bin/bash
set -e

APP_NAME=$1
if [ -z "$APP_NAME" ]; then
  echo "Usage: ./bootstrap-app.sh <app-name>"
  exit 1
fi

mkdir -p ~/$APP_NAME
cd ~/$APP_NAME

npm init -y
npm install express

cat > index.js <<'EOF'
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('ScrollChainOS App: Atomic Market Ready');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
EOF

echo "✅ $APP_NAME scaffolded. Run with: node index.js"
