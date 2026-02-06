import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin";

export async function POST(req) {
  const { adminCode, action, payload } = await req.json();

  if (!verifyAdmin(adminCode)) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 401 });
  }

  // --- ADD PRODUCT ---
  if (action === "addProduct") {
    const { name, category, price, sale, imageUrl, releaseDate } = payload;

    const { error } = await supabase.from("products").insert({
      name,
      category,
      price,
      sale,
      image: imageUrl,
      release_date: releaseDate
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  }

  // --- DELETE REVIEW ---
  if (action === "deleteReview") {
    const { reviewId } = payload;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  }

  // --- DELETE SUPPORT TICKET ---
  if (action === "deleteTicket") {
    const { ticketId } = payload;

    const { error } = await supabase
      .from("support_tickets")
      .delete()
      .eq("id", ticketId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  }

  // --- UPDATE PRODUCT RELEASE ---
  if (action === "updateRelease") {
    const { productId, releaseDate } = payload;

    const { error } = await supabase
      .from("products")
      .update({ release_date: releaseDate })
      .eq("id", productId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
