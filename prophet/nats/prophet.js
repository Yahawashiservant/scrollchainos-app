import { connect } from "nats";
import fs from "fs";
import { buildForesight } from "../foresight/lattice.js";

async function run() {
  const nc = await connect({ servers: "127.0.0.1:4222" });
  console.log("[scrollprophet] Listening");

  const sub = nc.subscribe("scroll.court.*");

  for await (const msg of sub) {
    const { payload } = JSON.parse(msg.string());

    const foresight = buildForesight(payload);

    const out = \`/home/scrollchainos/scrollchain-operator/prophet/state/prophet-\${Date.now()}.json\`;
    fs.writeFileSync(out, JSON.stringify(foresight, null, 2));

    nc.publish("scroll.prophet.foresight", Buffer.from(JSON.stringify(foresight)));

    console.log("[scrollprophet] foresight published");
  }
}

run();
