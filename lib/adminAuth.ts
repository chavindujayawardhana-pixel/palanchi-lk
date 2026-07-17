import crypto from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "palanchi_admin_session";

function expectedToken(): string {
  const password = process.env.ADMIN_PANEL_PASSWORD;
  if (!password) throw new Error("ADMIN_PANEL_PASSWORD is not set");
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function checkAdminPassword(password: string): boolean {
  return !!process.env.ADMIN_PANEL_PASSWORD && password === process.env.ADMIN_PANEL_PASSWORD;
}

export function getAdminSessionToken(): string {
  return expectedToken();
}

export function isRequestAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return !!token && token === expectedToken();
}
