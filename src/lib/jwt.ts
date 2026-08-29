import { SignJWT, jwtVerify } from "jose";

/**
 * JWT utilities for the admin session.
 * Kept free of `next/headers` imports so it can also be used inside proxy.ts.
 */
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "venkata-ganapathy-admin-secret-change-me"
);

export const ADMIN_COOKIE = "vg_admin_token";
const TOKEN_TTL = "7d";

export interface AdminSession {
  username: string;
}

export async function createSessionToken(username: string): Promise<string> {
  return await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(SECRET);
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (typeof payload.username === "string") {
      return { username: payload.username };
    }
    return null;
  } catch {
    return null;
  }
}
