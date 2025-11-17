import fs from "fs";

export function storePrecedent(ruling) {
  const file = `/home/scrollchainos/scrollchain-operator/court/precedent/${ruling.id}.json`;
  fs.writeFileSync(file, JSON.stringify(ruling, null, 2));
}
