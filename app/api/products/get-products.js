import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET() {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .lte("release_date", now)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
