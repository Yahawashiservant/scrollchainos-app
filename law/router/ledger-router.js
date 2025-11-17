import { connect } from "nats";
import { appendLedger } from "../state/ledger.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[ledger-router] tracking finalized rulings");

  const sub = nc.subscribe("scroll.law.finalized");

  for await (const msg of sub) {
    const entry = JSON.parse(msg.string());
    appendLedger(entry);
    console.log("[ledger-router] appended", entry.ruling.id);
  }
}

run();
