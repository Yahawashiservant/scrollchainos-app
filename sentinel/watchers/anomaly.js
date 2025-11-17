import fs from "fs";
import { buildHashGrid } from "./hashgrid.js";

const OUT = "/home/scrollchainos/scrollchain-operator/sentinel/state/anomaly.json";
const HASHFILE = "/home/scrollchainos/scrollchain-operator/sentinel/hashes/hashgrid.json";

export function detectAnomalies() {
  const prev = fs.existsSync(HASHFILE) ? JSON.parse(fs.readFileSync(HASHFILE)) : {};
  buildHashGrid();
  const curr = JSON.parse(fs.readFileSync(HASHFILE));

  const anomalies = [];
  for (const file in curr) {
    if (!prev[file]) continue;
    if (curr[file] !== prev[file]) anomalies.push(file);
  }

  const out = {
    anomalies,
    count: anomalies.length,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log("[sentinel-anomaly] scan complete");
}
