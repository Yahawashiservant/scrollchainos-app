import fs from "fs";

export function simulateCounterfactual(input) {
  const variations = [
    { entropy: input.entropy + 0.1, volume: input.volume },
    { entropy: input.entropy - 0.1, volume: input.volume },
    { entropy: input.entropy, volume: input.volume + 0.1 },
    { entropy: input.entropy, volume: input.volume - 0.1 }
  ];

  return variations.map(v => ({
    case: v,
    predicted: (v.entropy * 0.6) + (v.volume * 0.4),
    timestamp: new Date().toISOString()
  }));
}
