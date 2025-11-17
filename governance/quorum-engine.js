import fs from "fs";
import { connect } from "nats";

async function main() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  const dna = JSON.parse(
    fs.readFileSync("/home/scrollchainos/scrollchain-operator/governance/state/gov-dna.json")
  );

  const { quorum, veto, force } = dna.thresholds;

  console.log("[quorum-engine] alive — thresholds:", dna.thresholds);

  const sub = nc.subscribe("scroll.governance.proposal.vote");

  for await (const msg of sub) {
    const vote = JSON.parse(msg.string());

    const yea = vote.yea || 0;
    const nay = vote.nay || 0;
    const total = yea + nay;

    const ratio = total === 0 ? 0 : yea / total;

    let resolution = "pending";

    if (ratio >= force) resolution = "force-approve";
    else if (ratio >= veto && total >= 3) resolution = "veto-block";
    else if (ratio >= quorum) resolution = "approve";
    else if (nay >= quorum * 2) resolution = "reject";

    const result = {
      proposal: vote.proposal,
      ratio,
      resolution,
      timestamp: new Date().toISOString()
    };

    nc.publish("scroll.governance.decision", Buffer.from(JSON.stringify(result)));

    console.log("[quorum-engine] decision →", result);
  }
}

main();
