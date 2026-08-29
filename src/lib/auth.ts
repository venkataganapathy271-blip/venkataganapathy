import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  createSessionToken,
  verifySessionToken,
  type AdminSession,
} from "@/lib/jwt";

export { ADMIN_COOKIE, createSessionToken, verifySessionToken };
export type { AdminSession };

/** Read the admin session from the httpOnly cookie (server-side only) */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
