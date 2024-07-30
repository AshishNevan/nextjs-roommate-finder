import { NextRequest, NextResponse } from "next/server";
import { ListingData, getListingById } from "@/app/lib/listingActions";
// External Dependencies

// Global Config
export async function GET(req: NextRequest, { params }: any) {
  if (!params.id) {
    return NextResponse.json(
      { message: "Error", error: "No ID provided" },
      { status: 400 }
    );
  }
  const { data, error }: ListingData = await getListingById(params.id);
  if (error) {
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  }
}
// GET
// export async function POST(req: NextRequest) {
//     try {
//         const client = await clientPromise;
//         const db = client.db("roomate-finder");
//         const body = await req.json();
//         const newListing = body.formData as Listing;
//         const result = await db.collection("listings").insertOne(newListing);
//         return NextResponse.json({ message: "success" }, { status: 201 });
//     }
//     catch (error) {
//         return NextResponse.json({ message: "Error", error: error }, { status: 500 });
//     }
// }
// POST

// PUT

// DELETE
