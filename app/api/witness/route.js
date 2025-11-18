import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  try {
    const lines = fs
      .readFileSync("/home/scrollchainos/scrollchain-operator/phase-AN/state/witness.log", "utf8")
      .trim()
      .split("\n");

    return NextResponse.json(lines);
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
