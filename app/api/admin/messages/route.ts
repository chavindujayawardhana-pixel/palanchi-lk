import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("contact_messages")
    .select("id, name, email, subject, message, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}
