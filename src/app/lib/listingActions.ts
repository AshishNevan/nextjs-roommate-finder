import clientPromise from "@/utils/database";
import Listing from "../(models)/Listing";
import { ObjectId } from "mongodb";

export const getAllListings = async (): Promise<ListingData> => {
  try {
    const client = await clientPromise;
    const db = client.db("roomate-finder");
    const listings = (await db
      .collection("Listings")
      .find({})
      .toArray()) as unknown as Listing[];
    return Promise.resolve({ data: listings, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: [], error: error.message });
  }
};

export const createListing = async (
  newListing: Listing
): Promise<ListingData> => {
  try {
    const client = await clientPromise;
    const db = client.db("roomate-finder");
    const result = await db.collection("Listings").insertOne(newListing);
    return Promise.resolve({ data: null, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};

export const getListingById = async (id: string): Promise<ListingData> => {
  try {
    const client = await clientPromise;
    const db = client.db("roomate-finder");
    const query = { _id: new ObjectId(id) };
    const listing = (await db
      .collection("Listings")
      .findOne(query)) as unknown as Listing;
    return Promise.resolve({ data: [listing], error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};

export type ListingData = {
  data: Listing[] | null;
  error: string | null;
};
