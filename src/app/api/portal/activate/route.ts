import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @fileOverview Activation handler for secure portal tokens.
 * Handles the "one-time redemption" logic with session tracking to prevent usage inflation on refresh.
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

  // 2. Check if a session already exists for this visitor
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

  // 3. Check if redemption is allowed (Expired or Full)
  const isExpired = new Date(tokenData.expires_at) < new Date();
  const isFull = tokenData.used_count >= tokenData.usage_limit;

  if (isExpired || isFull) {
    return NextResponse.redirect(new URL(`/secure-portal/${token}`, request.url));
  }

  // 4. Create new unique session ID
  const newSessionId = crypto.randomUUID();

  // 5. Atomic Activation: Increment usage and store session
  // We do these in order: increment used_count, then record the session
  const { error: updateError } = await supabase
    .from("access_tokens")
    .update({ used_count: tokenData.used_count + 1 })
    .eq("id", tokenData.id);

  if (updateError) {
    console.error("Failed to increment usage:", updateError);
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Record the session in the DB
  await supabase
    .from("portal_sessions")
    .insert([{
      token_id: tokenData.id,
      session_id: newSessionId
    }]);

  // 6. Create response and set secure session cookie
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
