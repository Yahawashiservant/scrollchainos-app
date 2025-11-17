import fs from "fs";
import path from "path";

const ROOT = "/home/scrollchainos/scrollchain-operator";
const OUT  = "/home/scrollchainos/scrollchain-operator/heaven/snapshots";

function walk(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) results = results.concat(walk(p));
    else results.push(p);
  }
  return results;
}

function snapshot() {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = `${OUT}/snapshot-${ts}`;

  fs.mkdirSync(outDir, { recursive: true });

  const files = walk(ROOT);
  const records = [];

  for (const file of files) {
    const rel = file.replace(ROOT + "/", "");
    const dest = `${outDir}/${rel}`;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
    records.push(rel);
  }

  fs.writeFileSync(`${outDir}/MANIFEST.json`, JSON.stringify({
    timestamp: new Date().toISOString(),
    files: records
  }, null, 2));

  console.log("[scrollheaven] snapshot complete:", outDir);
}

snapshot();
