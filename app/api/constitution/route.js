import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  try {
    const data = JSON.parse(
      fs.readFileSync("/home/scrollchainos/scrollchain-operator/phase-AN/state/constitution.json")
    );
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
