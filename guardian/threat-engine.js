import fs from "fs";
import crypto from "crypto";

const LOG="/home/scrollchainos/scrollchain-operator/guardian/threat-log.json";

export function analyzeThreat(event) {
  const h = crypto.createHash("sha256").update(JSON.stringify(event)).digest("hex");
  const score = Math.random()*0.8;

  const entry = {
    event,
    score,
    hash: h,
    ts: new Date().toISOString()
  };

  let log=[];
  try { log=JSON.parse(fs.readFileSync(LOG,"utf8")); } catch {}
  log.push(entry);
  if (log.length > 1000) log.shift();

  fs.writeFileSync(LOG, JSON.stringify(log,null,2));
  return entry;
}
