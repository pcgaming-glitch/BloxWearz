import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(req) {
  const { userId, code } = await req.json();

  const { data } = await supabase
    .from("twofa_codes")
    .select("*")
    .eq("user_id", userId)
    .eq("code", code)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await supabase.from("twofa_codes").delete().eq("user_id", userId);

  return NextResponse.json({ success: true });
}
