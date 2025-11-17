import fs from "fs";
import { fusionKey } from "../keys/fusion-key.js";

export function authorize(action) {
  const crown = fusionKey();

  if (crown.authorizedCreator !== "Keith") {
    throw new Error("UNAUTHORIZED: Creator mismatch.");
  }

  return {
    allowed: true,
    action,
    timestamp: new Date().toISOString(),
    signature: crown.signature
  };
}
