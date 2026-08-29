import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cloudinary, CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB (videos included)

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
