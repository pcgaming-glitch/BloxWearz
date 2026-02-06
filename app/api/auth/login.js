import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { send2FA } from "@/lib/email";

export async function POST(req) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return NextResponse.json({ error: "Invalid login" }, { status: 400 });
  }

  const user = data.user;

  if (user.user_metadata.twoFactorEnabled) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await supabase.from("twofa_codes").insert({
      user_id: user.id,
      code
    });

    await send2FA(email, code);

    return NextResponse.json({ require2FA: true });
  }

  return NextResponse.json({ success: true, user });
}
