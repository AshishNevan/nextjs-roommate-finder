import Listing from "@/app/(models)/Listing"
import {NextRequest, NextResponse} from "next/server";
import clientPromise from "@/(utils)/database";
import { ObjectId } from "mongodb";
// External Dependencies

// Global Config
export async function GET(req: NextRequest, {params}: any) {
    try {
        const client = await clientPromise;
        const db = client.db("roomate-finder");
        const {id} = params
        const query = {_id: new ObjectId(id)}
        const listing = (await db
            .collection("Listings")
            .findOne(query)) as unknown as Listing;
        return NextResponse.json({message: "success", data: listing}, {status: 200})
    } catch (e) {
        return NextResponse.json({message: "failed to get listings"}, {status: 500})
    }
}
// GET
export async function POST(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("roomate-finder");
        const body = await req.json();
        const newListing = body.formData as Listing;
        const result = await db.collection("Listings").insertOne(newListing);
        return NextResponse.json({ message: "success" }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }
}
// POST

// PUT

// DELETE