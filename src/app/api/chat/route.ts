import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";
import type {
  ChatRequest,
  ChatResponse,
  ChatErrorCode,
  Locale,
} from "@/types";

// ---------------------------------------------------------------------------
// In-memory rate limiter (per IP, 20 req / 1 hour)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 20;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Opportunistically clean up expired entries
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt <= now) {
      rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // exceeded
  }

  entry.count += 1;
  return true; // allowed
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const VALID_LOCALES: Locale[] = ["es", "en"];
const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;
const VALID_ROLES = ["user", "assistant"] as const;

function isValidLocale(value: unknown): value is Locale {
  return VALID_LOCALES.includes(value as Locale);
}

function errorResponse(
  error: ChatErrorCode,
  status: number
): NextResponse<ChatResponse> {
  return NextResponse.json<ChatResponse>({ ok: false, error }, { status });
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("generic", 400);
  }

  // Type-narrow to ChatRequest shape
  const req = body as Partial<ChatRequest>;

  // Validate locale
  if (!isValidLocale(req.locale)) {
    return errorResponse("generic", 400);
  }

  // Validate messages array
  if (!Array.isArray(req.messages) || req.messages.length === 0) {
    return errorResponse("generic", 400);
  }

  // Validate total message count
  if (req.messages.length > MAX_MESSAGES) {
    return errorResponse("generic", 400);
  }

  // Validate last message first so the user-facing "too_long" error is reachable.
  const lastMessage = req.messages[req.messages.length - 1];
  if (
    !lastMessage ||
    typeof lastMessage !== "object" ||
    lastMessage.role !== "user" ||
    typeof lastMessage.content !== "string" ||
    lastMessage.content.length === 0
  ) {
    return errorResponse("generic", 400);
  }
  if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
    return errorResponse("too_long", 400);
  }

  // Validate every message: role must be "user"|"assistant", content must be a non-empty string ≤ MAX_MESSAGE_LENGTH.
  // This prevents role:"system" injection and unbounded intermediate-message content from prior turns.
  for (const msg of req.messages) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !VALID_ROLES.includes(msg.role as (typeof VALID_ROLES)[number]) ||
      typeof msg.content !== "string" ||
      msg.content.length === 0 ||
      msg.content.length > MAX_MESSAGE_LENGTH
    ) {
      return errorResponse("generic", 400);
    }
  }

  // Rate limit check
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return errorResponse("rate_limit", 429);
  }

  // Call AI
  try {
    const { reply, provider } = await chat(req.messages, req.locale);
    return NextResponse.json<ChatResponse>({ ok: true, reply, provider }, { status: 200 });
  } catch (err) {
    const errName = err instanceof Error ? err.name : "UnknownError";
    const errMessage = err instanceof Error ? err.message : "";

    if (errMessage === "unavailable") {
      return errorResponse("unavailable", 503);
    }

    console.error("chat route error", { name: errName });
    return errorResponse("generic", 500);
  }
}
