import { NextRequest, NextResponse } from "next/server";
import gnDivisions from "@/lib/data/gn-divisions.json";

const MAX_RESULTS = 20;

const DIVISIONS = gnDivisions as Record<string, string[]>;

/** Every town across all districts, deduplicated — used when the caller
 * hasn't (or hasn't yet) picked a district, since Town is a filter
 * independent of District, not one that requires it. Computed once at
 * module load rather than per-request. */
const ALL_TOWNS = Array.from(new Set(Object.values(DIVISIONS).flat()));

/**
 * Search-as-you-type source for GN (Grama Niladhari) divisions ("towns").
 * The full dataset (~13,400 entries across all 25 districts, in
 * lib/data/gn-divisions.json) stays server-side; only the top matches for
 * the given query are ever sent to the client. Passing `district` narrows
 * suggestions to that district; omitting it searches every town.
 *
 * Data derived from the "sl-address-utils" npm package (MIT license),
 * districts/divisional-secretariats/grama-niladhari-divisions datasets,
 * grouped by district and deduplicated.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get("district") ?? "";
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const all = district ? (DIVISIONS[district] ?? []) : ALL_TOWNS;

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
