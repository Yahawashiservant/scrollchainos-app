export function determineSentence(caseObj) {
  return {
    severity: "informational",
    penalty: "none",
    recommendations: ["update governance state"],
    timestamp: new Date().toISOString()
  };
}
