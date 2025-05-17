import { NextRequest, NextResponse } from "next/server";
import Key from "@/models/keyModel";
import { connect } from "@/dbConfig/dbConfig";
import { validate } from "@/helpers/validate";

connect();

export async function GET(request: NextRequest) {
    try {
        const getSecret = request.nextUrl.searchParams.get("secret");

        if (getSecret !== process.env.GET_SECRET) {
            return NextResponse.json({
                message: "Invalid secret key.",
                success: false
            }, { status: 400 });
        }

        const keys = await Key.find().sort({ hit: 1 });

        for (const key of keys) {
            try {
                const isValid = await validate(key.apikey);
                if (isValid) {
                    await Key.findOneAndUpdate({ _id: key._id }, { $inc: { hit: 1 } });
                    return NextResponse.json({
                        success: true,
                        apikey: key.apikey
                    });
                }
            } catch (err) {
                // Skip
            }
        }

        return NextResponse.json({
            success: false,
            error: "No valid API keys available.",
        }, { status: 404 });

    } catch (err) {
        return NextResponse.json({
            message: "Unexpected error while processing GET request.",
            success: false
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        let { apikey, secret } = reqBody;

        apikey = apikey.replace(/\s/g, "");

        if (secret !== process.env.POST_SECRET) {
            return NextResponse.json({
                message: "Invalid secret key.",
                success: false
            }, { status: 400 });
        }

        const key = await Key.findOne({ apikey });

        if (key) {
            return NextResponse.json({
                message: "API key already exists.",
                success: false
            }, { status: 400 });
        }

        const isValid = await validate(apikey);

        if (!isValid) {
            return NextResponse.json({
                message: "API key is not valid.",
                success: false
            }, { status: 400 });
        }

        const newKey = new Key({ apikey });
        const savedKey = await newKey.save();

        return NextResponse.json({
            message: "API key saved successfully.",
            success: true,
            savedKey
        });

    } catch (err) {
        return NextResponse.json({
            message: "Unexpected error while saving API key.",
            success: false
        }, { status: 500 });
    }
}