import { NextRequest, NextResponse } from "next/server";
import { matchListing } from "@/app/lib/matchActions";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await matchListing(
      body.listingid.listingid,
      body.data.user.id,
    );
    if (error) throw new Error(error);
    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 },
    );
  }
}
