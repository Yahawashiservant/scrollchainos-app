import fs from "fs";

const target = "/home/scrollchainos/scrollchain-operator/scrollark/state/resurrect.json";

const payload = {
  timestamp: new Date().toISOString(),
  resurrectable: true,
  rootCreator: "KEITH",
  authority: "SOVEREIGN",
  divineLawAligned: true
};

fs.writeFileSync(target, JSON.stringify(payload, null, 2));
console.log("[scrollark] Resurrection marker updated.");
