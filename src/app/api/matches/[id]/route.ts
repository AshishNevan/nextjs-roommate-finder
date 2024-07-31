import { NextRequest, NextResponse } from "next/server";
import {getMatchesById, MatchData} from "@/app/lib/matchActions";

export async function GET(req: NextRequest, { params }: any) {
    if (!params.id) {
        return NextResponse.json(
            { message: "Error", error: "No ID provided" },
            { status: 400 }
        );
    }
    const { data, error }: MatchData = await getMatchesById(params.id);
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