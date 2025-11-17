import Fastify from "fastify";
import fs from "fs";

const app = Fastify({ logger: false });

const BASE="/home/scrollchainos/scrollchain-operator/guardian";

// ---------- API ROUTES ----------
app.get("/api/behavior", async () => {
  try { return JSON.parse(fs.readFileSync(`${BASE}/state-behavior.json`)); }
  catch { return {}; }
});

app.get("/api/drift", async () => {
  try { return JSON.parse(fs.readFileSync(`${BASE}/identity-drift.json`)); }
  catch { return {}; }
});

app.get("/api/threats", async () => {
  try { return JSON.parse(fs.readFileSync(`${BASE}/threat-log.json`)); }
  catch { return []; }
});

app.get("/api/defense", async () => {
  try { return JSON.parse(fs.readFileSync(`${BASE}/defense-log.json`)); }
  catch { return []; }
});

app.get("/api/health", async () => {
  return { ok: true, ts: new Date().toISOString() };
});

// ---------- UI ROUTE ----------
app.get("/", async (_, reply) => {
  const html = fs.readFileSync(`${BASE}/cockpit/index.html`, "utf8");
  reply.type("text/html").send(html);
});

// ---------- START ----------
app.listen({ port: 7805, host: "0.0.0.0" });
console.log("[guardian-cockpit] running on http://localhost:7805");
