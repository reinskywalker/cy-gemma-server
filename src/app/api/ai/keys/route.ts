import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Key from "@/models/keyModel";
import { validate } from "@/helpers/validate";

connect();

export async function GET(request: NextRequest) {
    try {
        const getSecret = request.nextUrl.searchParams.get("secret");
        if (getSecret != process.env.GET_SECRET) {
            return NextResponse.json({
                message: "Invalid secret key provided.",
                success: false
            }, { status: 400 });
        }
        const keys = await Key.find().sort({ hit: 1 });
        return NextResponse.json({
            success: true,
            keys
        });
    } catch (err) {
        return NextResponse.json({
            message: "Failed to fetch keys.",
            success: false
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { apikeys, secret } = reqBody;

        if (secret != process.env.POST_SECRET) {
            return NextResponse.json({
                message: "Invalid secret key provided.",
                success: false
            }, { status: 400 });
        }

        const savedKeys: string[] = [];

        for (let apikey of apikeys) {
            try {
                apikey = apikey.replace(/\s/g, '');
                const isValid = await validate(apikey);
                const found = await Key.findOne({ apikey });

                if (isValid && found == null) {
                    await (new Key({ apikey })).save();
                    savedKeys.push(apikey);
                }
            } catch (err) {
                // Skip
            }
        }

        return NextResponse.json({
            message: `${savedKeys.length} API key(s) added.`,
            success: true,
            savedKeys
        });
    } catch (err) {
        return NextResponse.json({
            message: "Something went wrong while saving keys.",
            success: false
        }, { status: 500 });
    }
}
