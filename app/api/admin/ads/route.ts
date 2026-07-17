import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("advertisements")
    .select(
      "id, title, description, contact_name, phone, whatsapp, email, district, town, price, rental_period, quantity, condition, status, featured, created_at, categories ( name_en, name_si, name_ta ), advertisement_images ( image_url, is_cover, sort_order )"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ads: data });
}
