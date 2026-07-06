import { NextResponse } from "next/server";
import { fetchSettings } from "@/lib/sheets";

export async function GET() {
  const settings = await fetchSettings();
  return NextResponse.json(settings);
}
