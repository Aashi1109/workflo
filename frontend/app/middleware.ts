import { getSession } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middlware(req: NextRequest) {
  const session = await getSession();

  console.log(session);

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Cookie", `jwt=${session}`);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  return response;
}

export const config = {
  matcher: "/*",
};
