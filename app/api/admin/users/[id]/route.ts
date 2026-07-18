import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Hard-deletes the Supabase Auth user (not just the public.users profile row).
// public.users.id references auth.users(id) on delete cascade, so the profile
// row — and, in turn, any advertisements.user_id pointing at it (set null on
// delete) — clean up automatically. shouldSoftDelete defaults to false, i.e.
// this permanently frees the email for re-registration; that's the point.
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await getSupabaseAdmin().auth.admin.deleteUser(params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
