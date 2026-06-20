import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @fileOverview Activation handler for secure portal tokens.
 * Handles the "one-time redemption" logic with session tracking and fingerprinting to prevent usage abuse.
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
  const existingSessionId = cookieStore.get(sessionCookieName)?.value;

  // 1. Fetch current token state
  const { data: tokenData, error: tokenError } = await supabase
    .from("access_tokens")
    .select("*")
    .eq("token", token)
    .single();

  if (tokenError || !tokenData) {
    return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  }

  // Soft Fingerprinting Logic (Option B)
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  const fingerprint = `${userAgent}_${clientIp}`;

  // 2. Check if a session already exists for this visitor (Cookie Check)
  if (existingSessionId) {
    const { data: sessionData } = await supabase
      .from("portal_sessions")
      .select("*")
      .eq("token_id", tokenData.id)
      .eq("session_id", existingSessionId)
      .single();

    if (sessionData) {
      // Session already exists in DB, just redirect (no usage increment)
      return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
    }
  }

  // 3. Check for existing fingerprint (Cookie-Clear Protection)
  const { data: fingerprintSession } = await supabase
    .from("portal_sessions")
    .select("*")
    .eq("token_id", tokenData.id)
    .eq("fingerprint", fingerprint)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (fingerprintSession) {
    // Re-issue cookie for existing fingerprint without incrementing usage
    const response = NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
    response.cookies.set(sessionCookieName, fingerprintSession.session_id, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 day session persistence
      path: '/',
    });
    return response;
  }

  // 4. Check if redemption is allowed (Expired or Full)
  const isExpired = new Date(tokenData.expires_at) < new Date();
  const isFull = tokenData.used_count >= tokenData.usage_limit;

  if (isExpired || isFull) {
    return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  }

  // 5. Create new unique session ID
  const newSessionId = crypto.randomUUID();

  // 6. Atomic Activation: Increment usage and store session
  const { error: updateError } = await supabase
    .from("access_tokens")
    .update({ used_count: tokenData.used_count + 1 })
    .eq("id", tokenData.id);

  if (updateError) {
    console.error("Failed to increment usage:", updateError);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Record the session in the DB with fingerprint
  await supabase
    .from("portal_sessions")
    .insert([{
      token_id: tokenData.id,
      session_id: newSessionId,
      fingerprint: fingerprint
    }]);

  // 7. Create response and set secure session cookie
  const response = NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  
  response.cookies.set(sessionCookieName, newSessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 day session persistence
    path: '/',
  });

  return response;
}
