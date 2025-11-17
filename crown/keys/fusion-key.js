import fs from "fs";

export function fusionKey() {
  const seal = JSON.parse(fs.readFileSync(
    "/home/scrollchainos/scrollchain-operator/crown/state/creator.json",
    "utf-8"
  ));

  return {
    authorizedCreator: seal.creator,
    divineAuthority: seal.divine,
    signature: seal.signature,
    timestamp: new Date().toISOString()
  };
}
