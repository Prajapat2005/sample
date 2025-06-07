import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {

    const wh = new Webhook(process.env.SIGNING_KEY);
    const headerPayload = await headers();

    const svixHeader = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature"),
    };

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeader);

    const userData = {
        _id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        image: data.image_url,
    };

    await connectDB();

    if (type === "user.created") {
        await User.create(userData);
    } else if (type === "user.updated") {
        await User.findByIdAndUpdate(data.id, userData);
    }
    else if (type === "user.deleted") {
        await User.findByIdAndDelete(data.id);
    }

    return NextRequest.json({
        message: "User data processed successfully"
    });
}