import fs from "fs";
import { predictOutcome } from "../models/predict.js";
import { simulateCounterfactual } from "../counterfactual/simulate.js";

export function buildForesight(caseObj) {
  const prediction = predictOutcome(caseObj);
  const counter = simulateCounterfactual(caseObj.payload);

  return {
    case: caseObj.id,
    prediction,
    counterfactuals: counter,
    created: new Date().toISOString()
  };
}
