import fs from "fs";

const superstate = "/home/scrollchainos/scrollchain-operator/mesh/state/superstate.json";
const arkState   = "/home/scrollchainos/scrollchain-operator/scrollark/state/drift.json";

function driftCheck() {
  try {
    const s = JSON.parse(fs.readFileSync(superstate));
    const out = {
      timestamp: new Date().toISOString(),
      hash: s?.hash ?? null,
      anomalies: s?.anomalies ?? [],
      drift: s?.entropyDrift ?? 0
    };
    fs.writeFileSync(arkState, JSON.stringify(out, null, 2));
    console.log("[scrollark] drift check complete");
  } catch (err) {
    console.error("[scrollark] drift error:", err);
  }
}

driftCheck();
