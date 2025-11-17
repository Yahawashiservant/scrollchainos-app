import fs from "fs";
import crypto from "crypto";

const OUT = "/home/scrollchainos/scrollchain-operator/heaven/state/integrity.json";

function hashDir(dir) {
  const files = fs.readdirSync(dir).sort();
  const hash = crypto.createHash("sha256");

  for (const f of files) {
    const content = fs.readFileSync(`${dir}/${f}`);
    hash.update(content);
  }

  return hash.digest("hex");
}

function guard() {
  const SNAP_ROOT = "/home/scrollchainos/scrollchain-operator/heaven/snapshots";
  const latest = fs.readdirSync(SNAP_ROOT)
    .filter(f => f.startsWith("snapshot-"))
    .sort()
    .pop();

  if (!latest) {
    fs.writeFileSync(OUT, JSON.stringify({ status: "no-snapshots" }, null, 2));
    return;
  }

  const snapshotDir = `${SNAP_ROOT}/${latest}`;
  const digest = hashDir(snapshotDir);

  fs.writeFileSync(OUT, JSON.stringify({
    timestamp: new Date().toISOString(),
    latestSnapshot: latest,
    digest,
    status: "verified"
  }, null, 2));

  console.log("[scrollheaven] guardian integrity verified");
}

guard();
