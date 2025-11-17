import { connect } from "nats";
import { makeRuling } from "../ruling-engine.js";
import { mintNFT } from "../nft/mint-policy-nft.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[scrolllaw] active");

  const sub = nc.subscribe("scroll.policy.apply");

  for await (const msg of sub) {
    const decision = JSON.parse(msg.string());

    console.log("[scrolllaw] received decision", decision);

    const ruling = makeRuling(decision);
    const nft = mintNFT(ruling);

    // Publish finalized ruling
    const payload = { ruling, nft };
    nc.publish("scroll.law.finalized", Buffer.from(JSON.stringify(payload)));

    console.log("[scrolllaw] ruling + nft minted:", ruling.id);
  }
}

run();
