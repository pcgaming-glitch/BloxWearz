import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin";

export async function POST(req) {
  const { adminCode } = await req.json();

  if (!verifyAdmin(adminCode)) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({ valid: true });
}
