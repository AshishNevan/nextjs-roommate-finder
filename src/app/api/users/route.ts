import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/database";
import { ObjectId } from "mongodb";
import User from "@/app/(models)/User";
import { UserData, createUser, getUserById } from "@/app/lib/userActions";
// External Dependencies

// Global Config
export async function GET(req: NextRequest, { params }: any) {
  if (!params.id) {
    return NextResponse.json(
      { message: "Error", error: "No ID provided" },
      { status: 400 }
    );
  }
  const { data, error }: UserData = await getUserById(params.id);
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
export async function POST(req: NextRequest) {
  const user = await req.json().then((data) => data.user as User);
  const { data, error }: UserData = await createUser(user);
  if (error) {
    return NextResponse.json(
      { message: "Error", error: error },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { message: "success", data: data },
      { status: 201 }
    );
  }
}
// POST

// PUT

// DELETE
