import fs from "fs";
import { fusionKey } from "../keys/fusion-key.js";

const OUT = "/home/scrollchainos/scrollchain-operator/crown/state/guardian.json";

function guard() {
  const key = fusionKey();

  fs.writeFileSync(OUT, JSON.stringify({
    verified: true,
    creator: key.authorizedCreator,
    divineAuthority: key.divineAuthority,
    signature: key.signature,
    timestamp: new Date().toISOString()
  }, null, 2));

  console.log("[ScrollCrown] Guardian verified Creator identity.");
}

guard();
