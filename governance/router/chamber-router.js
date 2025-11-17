import fs from "fs";
import { connect } from "nats";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[chamber-router] active");

  const sub = nc.subscribe("scroll.governance.decision");

  for await (const msg of sub) {
    const d = JSON.parse(msg.string());

    let route = "scroll.policy.hold";

    if (d.resolution === "approve") route = "scroll.policy.apply";
    if (d.resolution === "reject") route = "scroll.policy.reject";
    if (d.resolution === "veto-block") route = "scroll.policy.veto";
    if (d.resolution === "force-approve") route = "scroll.policy.force";

    nc.publish(route, msg.data);

    console.log(`[chamber-router] → ${route}`);
  }
}

run();
