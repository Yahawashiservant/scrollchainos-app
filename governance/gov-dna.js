export function governanceDNA() {
  return {
    version: "1.0",
    created: new Date().toISOString(),
    roles: ["mesh", "vertical", "supervisor", "entropy"],
    thresholds: {
      quorum: 0.66,
      veto: 0.80,
      force: 0.90
    },
    metrics: {
      healthWeight: 0.35,
      entropyWeight: 0.25,
      volumeWeight: 0.20,
      latencyWeight: 0.20
    },
    routing: {
      proposals: "scroll.governance.proposal",
      decisions: "scroll.governance.decision",
      policy:    "scroll.governance.policy"
    }
  };
}
