import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(req) {
  const { productId } = await req.json();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
