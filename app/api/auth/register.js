import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { getRobloxAvatar } from "@/lib/roblox";

export async function POST(req) {
  const { email, password, username, robloxId } = await req.json();

  const avatar = await getRobloxAvatar(robloxId);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        robloxId,
        avatar,
        twoFactorEnabled: false
      }
    }
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, user: data.user });
}
