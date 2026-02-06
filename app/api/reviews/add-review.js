import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(req) {
  const { productId, userId, stars, text } = await req.json();

  if (!productId || !userId || !stars) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (stars < 1 || stars > 5) {
    return NextResponse.json({ error: "Stars must be 1–5" }, { status: 400 });
  }

  const { data: user } = await supabase.auth.admin.getUserById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    user_id: userId,
    stars,
    text
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
