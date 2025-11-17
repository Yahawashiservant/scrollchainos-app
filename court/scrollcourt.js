import { connect } from "nats";
import fs from "fs";
import { storePrecedent } from "./precedent/precedent-engine.js";
import { determineSentence } from "./sentencing.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[scrollcourt] active");

  const sub = nc.subscribe("scroll.court.review");

  for await (const msg of sub) {
    const caseObj = JSON.parse(msg.string());

    const sentence = determineSentence(caseObj);

    const ruling = {
      id: `ruling-${Date.now()}`,
      case: caseObj,
      sentence,
      timestamp: new Date().toISOString()
    };

    storePrecedent(ruling);

    nc.publish("scroll.court.finalized", Buffer.from(JSON.stringify(ruling)));

    console.log("[scrollcourt] finalized:", ruling.id);
  }
}

run();
