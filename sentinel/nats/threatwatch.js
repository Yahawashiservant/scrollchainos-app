import { connect } from "nats";
import fs from "fs";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });
  console.log("[scrollsentinel] watching mesh…");

  const sub = nc.subscribe("scroll.>");
  for await (const msg of sub) {
    const payload = msg.string();
    fs.writeFileSync(
      "/home/scrollchainos/scrollchain-operator/sentinel/state/last-nats.json",
      JSON.stringify({ subject: msg.subject, payload, time: new Date().toISOString() }, null, 2)
    );
  }
}

run();
