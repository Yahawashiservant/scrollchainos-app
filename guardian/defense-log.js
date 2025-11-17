import fs from "fs";

const PATH="/home/scrollchainos/scrollchain-operator/guardian/defense-log.json";

export function logDefense(action) {
  let state=[];
  try { state=JSON.parse(fs.readFileSync(PATH,"utf8")); } catch {}

  state.push({
    action,
    ts: new Date().toISOString()
  });

  fs.writeFileSync(PATH, JSON.stringify(state,null,2));
}
