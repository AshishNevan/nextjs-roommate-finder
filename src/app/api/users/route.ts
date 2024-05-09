import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/database";
import { ObjectId } from "mongodb";
import User from "@/app/(models)/User";
// External Dependencies

// Global Config
export async function GET(req: NextRequest, { params }: any) {
    try {
        const client = await clientPromise;
        const db = client.db("roomate-finder");
        const users = (await db
            .collection("Users")
            .find({})
            .toArray()) as unknown as User[];
        return NextResponse.json({ message: "success", data: users }, { status: 200 })
    } catch (e) {
        return NextResponse.json({ message: "failed to get users" }, { status: 500 })
    }
}
// GET
export async function POST(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("roomate-finder");
        const body = await req.json();
        const user = body.user as User;
        console.log("post body is", user)
        const query = { email: user.email }
        let res = await db.collection("Users").findOne(query) as unknown as User
        if (res && res._id) {
            console.log("found user in db")
            return NextResponse.json({ message: "user exists", data: null }, { status: 500 });
        }
        else {
            console.log("could not find user in db, creating new user")
            const newUser = new User("", body.user.email, body.user.password, "", "", 0, "", "", "", { smoking: false, pets: false, study_habits: "", budget: 0, sleeping_habits: "", move_out_date: "", move_in_date: "" }, { address: "", city: "", state: "", zip_code: "", latitude: 0, longitude: 0 }, new Date().toISOString())
            const result = await db.collection("Users").insertOne(newUser);
            const newQuery = { _id: new ObjectId((newUser as any)._id) }
            let { _id } = await db.collection("Users").findOne(newQuery) as unknown as User
            return NextResponse.json({ message: "success", data: _id }, { status: 201 });
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error", error: error }, { status: 500 });
    }
}
// POST

// PUT

// DELETE