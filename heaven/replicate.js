import fs from "fs";
import path from "path";
import { connect } from "nats";

async function replicate() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  const SNAP_ROOT = "/home/scrollchainos/scrollchain-operator/heaven/snapshots";
  const REP_ROOT  = "/home/scrollchainos/scrollchain-operator/heaven/replicas";

  const latest = fs.readdirSync(SNAP_ROOT)
    .filter(f => f.startsWith("snapshot-"))
    .sort()
    .pop();

  if (!latest) {
    console.log("[scrollheaven] no snapshots available.");
    return;
  }

  const src = `${SNAP_ROOT}/${latest}`;
  const dest = `${REP_ROOT}/${latest}`;

  fs.cpSync(src, dest, { recursive: true });

  await nc.publish("scroll.heaven.replica", Buffer.from(JSON.stringify({
    snapshot: latest,
    timestamp: new Date().toISOString()
  })));

  console.log("[scrollheaven] replica dispatched:", latest);

  await nc.drain();
}

replicate();
