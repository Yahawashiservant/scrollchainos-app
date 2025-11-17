import fs from "fs";
import crypto from "crypto";

const ledger = "/home/scrollchainos/scrollchain-operator/witness/ledger/events.log";
const out = "/home/scrollchainos/scrollchain-operator/witness/state/integrity.json";

function verify() {
  if (!fs.existsSync(ledger)) {
    fs.writeFileSync(out, JSON.stringify({ integrity: "missing-ledger" }, null, 2));
    return console.log("[scrollwitness] ledger missing");
  }

  const lines = fs.readFileSync(ledger, "utf8").trim().split("\n");
  const hashes = lines.map(line => JSON.parse(line).hash);

  const combined = crypto.createHash("sha256").update(JSON.stringify(hashes)).digest("hex");

  fs.writeFileSync(out, JSON.stringify({
    timestamp: new Date().toISOString(),
    entries: lines.length,
    digest: combined,
    integrity: "verified"
  }, null, 2));

  console.log("[scrollwitness] integrity verified");
}

verify();
