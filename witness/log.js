import fs from "fs";
import crypto from "crypto";

const ledger = "/home/scrollchainos/scrollchain-operator/witness/ledger/events.log";

export function witness(event) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    hash: crypto.createHash("sha256").update(JSON.stringify(event)).digest("hex")
  };

  fs.appendFileSync(ledger, JSON.stringify(entry) + "\n");
  console.log("[scrollwitness] event recorded");
}
