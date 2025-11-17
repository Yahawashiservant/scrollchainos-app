import fs from "fs";

const PATH="/home/scrollchainos/scrollchain-operator/guardian/state-behavior.json";

export function updateBehaviorProfile(sample) {
  let state = {};
  try { state = JSON.parse(fs.readFileSync(PATH,"utf8")); } catch {}
  
  state.samples = state.samples || [];
  state.samples.push({
    sample,
    ts: new Date().toISOString()
  });

  if (state.samples.length > 2000)
    state.samples.shift();

  fs.writeFileSync(PATH, JSON.stringify(state,null,2));
}

export function getBehaviorProfile() {
  try { return JSON.parse(fs.readFileSync(PATH,"utf8")); }
  catch { return {}; }
}
