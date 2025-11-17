import fs from "fs";
import { governanceDNA } from "./gov-dna.js";

const dna = governanceDNA();
fs.writeFileSync("/home/scrollchainos/scrollchain-operator/governance/state/gov-dna.json", JSON.stringify(dna, null, 2));

console.log("[governance-dna] Governance DNA created.");
