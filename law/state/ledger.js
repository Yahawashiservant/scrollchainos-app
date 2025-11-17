import fs from "fs";

export function appendLedger(entry) {
  const file = "/home/scrollchainos/scrollchain-operator/law/state/ledger.json";

  let ledger = [];
  if (fs.existsSync(file)) {
    ledger = JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  ledger.push(entry);

  fs.writeFileSync(file, JSON.stringify(ledger, null, 2));
}
