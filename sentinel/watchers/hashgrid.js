import fs from "fs";
import crypto from "crypto";

const ROOT = "/home/scrollchainos/scrollchain-operator";
const OUT  = "/home/scrollchainos/scrollchain-operator/sentinel/hashes/hashgrid.json";

function hashFile(path) {
  try {
    const data = fs.readFileSync(path);
    return crypto.createHash("sha256").update(data).digest("hex");
  } catch {
    return null;
  }
}

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = dir + "/" + f;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results = results.concat(walk(full));
    else results.push(full);
  }
  return results;
}

export function buildHashGrid() {
  const files = walk(ROOT);
  const hashgrid = {};

  for (const f of files) hashgrid[f] = hashFile(f);

  fs.writeFileSync(OUT, JSON.stringify(hashgrid, null, 2));
  console.log("[sentinel-hashgrid] updated");
}
