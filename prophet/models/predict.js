import fs from "fs";

export function predictOutcome(caseObj) {
  const entropy = caseObj?.payload?.entropyScore ?? 0.5;
  const volume  = caseObj?.payload?.volume ?? 0.5;

  const score = (entropy * 0.6) + (volume * 0.4);

  let prediction = "neutral";

  if (score > 0.75) prediction = "favor-creator";
  else if (score < 0.25) prediction = "risk";

  return {
    score,
    prediction,
    timestamp: new Date().toISOString()
  };
}
