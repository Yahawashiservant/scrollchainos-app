import fs from "fs";
import { createGlyph } from "./glyph-engine.js";

export function makeRuling(decision) {
  const glyph = createGlyph(JSON.stringify(decision));

  const ruling = {
    id: glyph.symbol,
    decision,
    glyph,
    timestamp: new Date().toISOString(),
  };

  const path = `/home/scrollchainos/scrollchain-operator/law/rulings/${ruling.id}.json`;
  fs.writeFileSync(path, JSON.stringify(ruling, null, 2));

  return ruling;
}
