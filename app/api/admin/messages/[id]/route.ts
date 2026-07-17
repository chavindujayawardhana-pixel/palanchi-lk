import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const VALID_STATUSES = ["unread", "read"];

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  if (typeof body.status !== "string" || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from("contact_messages")
    .update({ status: body.status })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
