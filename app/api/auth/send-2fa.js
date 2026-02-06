import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { send2FA } from "@/lib/email";

export async function POST(req) {
  const { email, userId } = await req.json();

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from("twofa_codes").insert({
    user_id: userId,
    code
  });

  await send2FA(email, code);

  return NextResponse.json({ success: true });
}
