import { connect } from "nats";
import fs from "fs";
import { createPanel } from "./panels/panel-engine.js";
import { verifyCreatorSignature } from "../identity/verify.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });

  console.log("[case-intake] listening");

  const sub = nc.subscribe("scroll.court.case");

  for await (const msg of sub) {
    const { payload, signature } = JSON.parse(msg.string());

    if (!verifyCreatorSignature(payload, signature)) {
      console.log("[case-intake] unauthorized attempt rejected");
      continue;
    }

    const panel = createPanel();

    const caseObj = {
      id: `case-${Date.now()}`,
      panel,
      payload,
      status: "PENDING",
      created: new Date().toISOString()
    };

    fs.writeFileSync(`/home/scrollchainos/scrollchain-operator/court/cases/${caseObj.id}.json`, JSON.stringify(caseObj, null, 2));

    nc.publish("scroll.court.review", Buffer.from(JSON.stringify(caseObj)));

    console.log("[case-intake] case forwarded:", caseObj.id);
  }
}
run();
