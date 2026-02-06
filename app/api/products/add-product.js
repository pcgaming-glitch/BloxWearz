import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin";

export async function POST(req) {
  const { adminCode, name, category, price, sale, imageUrl, releaseNow, releaseDate } = await req.json();

  if (!verifyAdmin(adminCode)) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 401 });
  }

  const finalReleaseDate = releaseNow
    ? new Date().toISOString()
    : releaseDate;

  const { data, error } = await supabase.from("products").insert({
    name,
    category,
    price,
    sale,
    image: imageUrl,
    release_date: finalReleaseDate
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
