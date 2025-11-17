import fs from "fs";

export function mintNFT(ruling) {
  const metadata = {
    name: `ScrollLaw Ruling ${ruling.id}`,
    symbol: ruling.glyph.symbol,
    attributes: [
      { trait_type: "entropy", value: ruling.glyph.entropy },
      { trait_type: "decision", value: ruling.decision.resolution },
    ],
    ruling,
  };

  const out = `/home/scrollchainos/scrollchain-operator/law/nft/${ruling.id}.json`;
  fs.writeFileSync(out, JSON.stringify(metadata, null, 2));

  return metadata;
}
