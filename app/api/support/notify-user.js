import { NextResponse } from "next/server";
import { sendSupportConfirmation } from "@/lib/email";

export async function POST(req) {
  const { email, username, category } = await req.json();

  await sendSupportConfirmation(email, username, category);

  return NextResponse.json({ success: true });
}
