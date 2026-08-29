import { NextResponse } from "next/server";
import { COLLECTIONS, type CollectionKey } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";

/** Collections exposed through the admin CRUD API */
export const MANAGED_COLLECTIONS = [
  "hospitalInfo",
  "heroSlides",
  "stats",
  "services",
  "doctors",
  "facilities",
  "galleryItems",
  "faqs",
  "testimonials",
  "aboutPillars",
  "enquiries",
  "siteSettings",
] as const satisfies readonly CollectionKey[];

/** Collections that hold a single document (upserted, never listed/deleted) */
export const SINGLETON_COLLECTIONS = [
  "hospitalInfo",
  "siteSettings",
] as const satisfies readonly CollectionKey[];

export function isManagedCollection(key: string): key is CollectionKey {
  return (MANAGED_COLLECTIONS as readonly string[]).includes(key);
}

export function isSingletonCollection(key: CollectionKey): boolean {
  return (SINGLETON_COLLECTIONS as readonly string[]).includes(key);
}

/** Returns a 401 response when the request is not authenticated, otherwise null */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** Convert Mongoose docs into plain JSON-safe objects */
export function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Strip fields that must never be overwritten on update */
export function sanitizeUpdate(body: Record<string, unknown>): Record<string, unknown> {
  const clone = { ...body };
  delete clone._id;
  delete clone.__v;
  delete clone.createdAt;
  delete clone.updatedAt;
  return clone;
}
