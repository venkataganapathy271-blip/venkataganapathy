import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { COLLECTIONS } from "@/lib/models";
import {
  isManagedCollection,
  isSingletonCollection,
  requireAdmin,
  sanitizeUpdate,
  serialize,
} from "@/lib/admin-api";

export const dynamic = "force-dynamic";

/** GET /api/admin/[collection] — list documents (singletons return the one doc) */
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/admin/[collection]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { collection } = await ctx.params;
  if (!isManagedCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    await connectDB();
    const Model = COLLECTIONS[collection];

    if (isSingletonCollection(collection)) {
      const doc = await Model.findOne().sort({ updatedAt: -1 }).lean();
      return NextResponse.json({ data: doc ? serialize(doc) : null });
    }

    const docs = await Model.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ data: serialize(docs) });
  } catch (error) {
    console.error(`[api/admin/${collection} GET]`, error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST /api/admin/[collection] — create a document (or upsert a singleton) */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/[collection]">
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { collection } = await ctx.params;
  if (!isManagedCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    const body = await request.json();
    await connectDB();
    const Model = COLLECTIONS[collection];

    if (isSingletonCollection(collection)) {
      const update = sanitizeUpdate(body);
      const doc = await Model.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });
      return NextResponse.json({ data: serialize(doc?.toObject()) }, { status: 201 });
    }

    const doc = await Model.create(sanitizeUpdate(body));
    return NextResponse.json({ data: serialize(doc.toObject()) }, { status: 201 });
  } catch (error) {
    console.error(`[api/admin/${collection} POST]`, error);
    const message = error instanceof Error ? error.message : "Failed to create";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
