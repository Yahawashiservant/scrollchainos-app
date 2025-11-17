import crypto from "crypto";
import fs from "fs";

export function createGlyph(input) {
  const hash = crypto.createHash("sha3-512").update(input).digest("hex");

  const glyph = {
    input,
    hash,
    symbol: hash.slice(0, 12),
    created: new Date().toISOString(),
    entropy: Math.floor(Math.random() * 99999),
  };

  return glyph;
}
