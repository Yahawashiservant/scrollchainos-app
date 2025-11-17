import fs from "fs";
import crypto from "crypto";

export function verifyCreatorIdentity() {
  const creatorKey = "/home/scrollchainos/scrollchain-operator/identity/creator.pem";

  if (!fs.existsSync(creatorKey)) {
    return { valid: false, reason: "creator key missing" };
  }

  const keyData = fs.readFileSync(creatorKey, "utf8");
  const hash = crypto.createHash("sha256").update(keyData).digest("hex");

  return {
    valid: true,
    keyHash: hash,
    timestamp: new Date().toISOString()
  };
}
