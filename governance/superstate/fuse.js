import fs from "fs";

const meshState = "/home/scrollchainos/scrollchain-operator/mesh/state/superstate.json";
const govState = "/home/scrollchainos/scrollchain-operator/governance/superstate/superstate.json";
const out = "/home/scrollchainos/scrollchain-operator/governance/superstate/fused.json";

const mesh = JSON.parse(fs.readFileSync(meshState, "utf-8"));
const gov = JSON.parse(fs.readFileSync(govState, "utf-8"));

const fused = {
  created: new Date().toISOString(),
  mesh,
  governance: gov
};

fs.writeFileSync(out, JSON.stringify(fused, null, 2));
console.log("[governance-superstate] fusion complete");
