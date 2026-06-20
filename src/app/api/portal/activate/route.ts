import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @fileOverview Activation handler for secure portal tokens.
 * Handles the "one-time redemption" logic to prevent usage inflation on refresh.
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const supabase = await createClient();
  const cookieStore = await cookies();
  const sessionCookieName = `portal_session_${token}`;

  // 1. Fetch current token state
  const { data, error } = await supabase
    .from("access_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !data) {
    return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  }

  // 2. Check if redemption is allowed
  const isExpired = new Date(data.expires_at) < new Date();
  const isFull = data.used_count >= data.usage_limit;

  if (isExpired || isFull) {
    // Redirect back to portal page which will show the "Access Denied" state
    return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  }

  // 3. Atomically increment the usage count
  const { error: updateError } = await supabase
    .from("access_tokens")
    .update({ used_count: data.used_count + 1 })
    .eq("id", data.id);

  if (updateError) {
    console.error("Failed to increment usage:", updateError);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. Create response and set session cookie
  const response = NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  
  // Set a secure, httpOnly cookie to track this session
  response.cookies.set(sessionCookieName, 'authorized_session', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hour session
    path: '/',
  });

  return response;
}
