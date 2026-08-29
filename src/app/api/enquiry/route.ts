import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { Enquiry } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      phone,
      email: typeof body.email === "string" ? body.email.trim() : "",
      department: typeof body.department === "string" ? body.department : "",
      preferredDate: typeof body.preferredDate === "string" ? body.preferredDate : "",
      message: typeof body.message === "string" ? body.message : "",
    });

    return NextResponse.json({ success: true, id: enquiry._id }, { status: 201 });
  } catch (error) {
    console.error("[api/enquiry POST]", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
