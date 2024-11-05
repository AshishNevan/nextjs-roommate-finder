import Match from "@/models/Match";
import { createClient } from "@/utils/supabase/server";

export const matchListing = async (
  listing_id: number,
  user_id: string,
): Promise<MatchData> => {
  try {
    const supabase = createClient();
    const newMatch = new Match(user_id, listing_id);
    const { data, error } = await supabase.from("matches").insert([newMatch]);
    if (error) throw new Error(error.message);
    return Promise.resolve({ data: null, error: null });
  } catch (error: any) {
    console.log(error.message);
    return Promise.resolve({ data: null, error: error.message });
  }
};

export const getMatchesById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("user_id", id);
    if (error) throw new Error(error.message);
    return Promise.resolve({ data: data, error: null });
  } catch (error: any) {
    console.log(error.message);
    return Promise.resolve({ data: null, error: error.message });
  }
};

export type MatchData = {
  data: Match[] | null;
  error: string | null;
};
