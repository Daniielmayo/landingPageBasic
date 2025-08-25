import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const baseUrl =
      req.headers.get("x-forwarded-host") || req.headers.get("host");
    const redirectTo = `${
      req.headers.get("x-forwarded-proto") || "http"
    }://${baseUrl}/login`;
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
