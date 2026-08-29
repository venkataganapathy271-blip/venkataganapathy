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

type Ctx = RouteContext<"/api/admin/[collection]/[id]">;

/** GET /api/admin/[collection]/[id] — fetch one document */
export async function GET(_request: NextRequest, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { collection, id } = await ctx.params;
  if (!isManagedCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await COLLECTIONS[collection].findById(id).lean();
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: serialize(doc) });
  } catch (error) {
    console.error(`[api/admin/${collection}/${id} GET]`, error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** PUT /api/admin/[collection]/[id] — update one document */
export async function PUT(request: NextRequest, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { collection, id } = await ctx.params;
  if (!isManagedCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    const body = await request.json();
    await connectDB();
    const update = sanitizeUpdate(body);
    const doc = await COLLECTIONS[collection].findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: serialize(doc.toObject()) });
  } catch (error) {
    console.error(`[api/admin/${collection}/${id} PUT]`, error);
    const message = error instanceof Error ? error.message : "Failed to update";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/** DELETE /api/admin/[collection]/[id] — delete one document */
export async function DELETE(_request: NextRequest, ctx: Ctx) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { collection, id } = await ctx.params;
  if (!isManagedCollection(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  if (isSingletonCollection(collection)) {
    return NextResponse.json(
      { error: "Singleton collections cannot be deleted" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const doc = await COLLECTIONS[collection].findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[api/admin/${collection}/${id} DELETE]`, error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
