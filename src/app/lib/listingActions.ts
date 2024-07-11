import clientPromise from "@/utils/database";
import Listing from "../(models)/Listing";
import { ObjectId } from "mongodb";
import { createClient } from "@/utils/supabase/server";

export const getAllListings = async (): Promise<ListingData> => {
  try {
    const supabase = createClient();
    const { data: listings, error } = await supabase.from("listings").select();
    if (error) throw new Error(error.message);
    return Promise.resolve({ data: listings as Listing[], error: null });
  } catch (error: any) {
    return Promise.resolve({ data: [], error: error.message });
  }
};

export const createListing = async (
  newListing: Listing
): Promise<ListingData> => {
  try {
    console.log("pre", newListing);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("listings")
      .insert([newListing]);
    if (error) throw new Error(error.message);
    return Promise.resolve({ data: null, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};

export const getListingById = async (id: string): Promise<ListingData> => {
  try {
    const supabase = createClient();
    const { data: listing, error } = await supabase
      .from("listings")
      .select()
      .eq("id", id);
    if (listing?.length == 0)
      return Promise.resolve({ data: null, error: "No listings found" });
    return Promise.resolve({ data: listing as Listing[], error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};

export type ListingData = {
  data: Listing[] | null;
  error: string | null;
};
