import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export interface CategoryRow {
  id: number;
  name_en: string;
  name_si: string;
  name_ta: string;
}

export function useCategories(): CategoryRow[] {
  const [categories, setCategories] = useState<CategoryRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("categories")
      .select("id, name_en, name_si, name_ta")
      .order("id")
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setCategories(data);
      });
    return () => { cancelled = true; };
  }, []);

  return categories;
}
