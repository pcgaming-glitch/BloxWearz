import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { sendSupportConfirmation } from "@/lib/email";

export async function POST(req) {
  const { email, username, category, message } = await req.json();

  if (!email || !username || !category || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("support_tickets").insert({
    email,
    username,
    category,
    message
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await sendSupportConfirmation(email, username, category);

  return NextResponse.json({ success: true });
}
