import { connect } from "nats";
import { witness } from "./log.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[scrollwitness] listening to all events…");

  const sub = nc.subscribe("scroll.>");

  for await (const msg of sub) {
    try {
      witness({
        subject: msg.subject,
        payload: msg.string()
      });
    } catch (e) {
      console.error("[scrollwitness] error:", e);
    }
  }
}

run();
