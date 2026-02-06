import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(req) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
