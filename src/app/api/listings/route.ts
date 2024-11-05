import Listing from "@/models/Listing";
import { NextRequest, NextResponse } from "next/server";
import {
  ListingData,
  getAllListings,
  createListing,
} from "@/app/lib/listingActions";
// External Dependencies

// Global Config
export async function GET(req: NextRequest) {
  const { data, error }: ListingData = await getAllListings();
  if (error) {
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 },
    );
  } else {
    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 },
    );
  }
}
// GET
export async function POST(req: NextRequest) {
  const newListing = await req.json().then((data) => data?.formData as Listing);
  const { data, error }: ListingData = await createListing(newListing);
  if (error) {
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 },
    );
  } else {
    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 },
    );
  }
}
// POST

// PUT

// DELETE
