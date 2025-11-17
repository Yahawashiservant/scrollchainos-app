import fs from "fs";

export function createPanel() {
  return {
    id: `panel-${Date.now()}`,
    judges: ["entropy-judge", "policy-judge", "precedent-judge"],
    created: new Date().toISOString()
  };
}
