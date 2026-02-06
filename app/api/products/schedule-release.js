import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin";

export async function POST(req) {
  const { adminCode, productId, releaseDate } = await req.json();

  if (!verifyAdmin(adminCode)) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 401 });
  }

  const { error } = await supabase
    .from("products")
    .update({ release_date: releaseDate })
    .eq("id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
