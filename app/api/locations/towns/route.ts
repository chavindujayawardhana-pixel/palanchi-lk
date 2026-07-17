import { NextRequest, NextResponse } from "next/server";
import gnDivisions from "@/lib/data/gn-divisions.json";

const MAX_RESULTS = 20;

/**
 * Search-as-you-type source for GN (Grama Niladhari) divisions ("towns")
 * within a district. The full dataset (~13,400 entries across all 25
 * districts, in lib/data/gn-divisions.json) stays server-side; only the top
 * matches for the given query are ever sent to the client.
 *
 * Data derived from the "sl-address-utils" npm package (MIT license),
 * districts/divisional-secretariats/grama-niladhari-divisions datasets,
 * grouped by district and deduplicated.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get("district") ?? "";
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const all = (gnDivisions as Record<string, string[]>)[district] ?? [];

  if (!q) {
    return NextResponse.json({ towns: all.slice(0, MAX_RESULTS) });
  }

  const startsWith: string[] = [];
  const includes: string[] = [];
  for (const name of all) {
    const lower = name.toLowerCase();
    if (lower.startsWith(q)) startsWith.push(name);
    else if (lower.includes(q)) includes.push(name);
    if (startsWith.length >= MAX_RESULTS) break;
  }

  const towns = [...startsWith, ...includes].slice(0, MAX_RESULTS);
  return NextResponse.json({ towns });
}
