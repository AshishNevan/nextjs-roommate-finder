import Match from "../(models)/Match";
import { createClient } from "@/utils/supabase/server";
export const matchListing = async (
  listingid: number,
  userid: string,
): Promise<MatchData> => {
  try {
    const supabase = createClient();
    const newMatch = { user_id: userid, listing_id: listingid };
    const { data, error } = await supabase.from("matches").insert([newMatch]);
    if (error) throw new Error(error.message);
    return Promise.resolve({ data: null, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error });
  }
};

export type MatchData = {
  data: Match[] | null;
  error: string | null;
};
