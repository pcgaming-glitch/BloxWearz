import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin";

export async function POST(req) {
  const { adminCode } = await req.json();

  if (!verifyAdmin(adminCode)) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
