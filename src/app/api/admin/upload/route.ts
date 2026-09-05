import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloudinary, CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB (videos included)

/**
 * GET /api/admin/upload
 * Returns a signature for secure direct client-side uploads to Cloudinary.
 */
export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const searchParams = request.nextUrl.searchParams;
    const subfolder = searchParams.get("subfolder") || "";
    const folder = subfolder ? `${CLOUDINARY_FOLDER}/${subfolder}` : CLOUDINARY_FOLDER;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error("[api/admin/upload GET]", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}

/**
 * POST /api/admin/upload
 * Accepts multipart/form-data with a "file" field and optional "subfolder".
 * Returns the secure Cloudinary URL of the uploaded asset.
 */
export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const subfolder = formData.get("subfolder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 100MB)" }, { status: 413 });
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: "Only image and video files are allowed" },
        { status: 400 }
      );
    }

    const sub = typeof subfolder === "string" && subfolder.trim() ? subfolder.trim() : "";
    const folder = sub ? `${CLOUDINARY_FOLDER}/${sub}` : CLOUDINARY_FOLDER;

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: isVideo ? "video" : "image",
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/admin/upload]", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
