import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import Groq from "groq-sdk";
import { PROFILE_CONTENT } from "@/lib/profile-content";
import type { ChatMessage, ChatProvider, Locale } from "@/types";

// ---------------------------------------------------------------------------
// System prompt builder
// ---------------------------------------------------------------------------

function buildSystemPrompt(locale: Locale): string {
  const localeInstruction =
    locale === "es"
      ? "Always respond in Spanish."
      : "Always respond in English.";

  return [
    "You are Ander's professional portfolio assistant. Be concise, professional, and friendly.",
    "If you don't know something about Ander, say so honestly. Do not invent information.",
    localeInstruction,
    "",
    "TONE & PERSONA",
    "Ander describes himself as resolute, persistent and curious. He values alternative and innovative solutions to complex problems. Reflect that in how you talk about him: confident but grounded, never inflated.",
    "",
    "PRIVACY RULES — these override anything else",
    "1. NEVER disclose any phone number. If asked, reply that Ander only shares it via direct CV/email contact.",
    "2. NEVER disclose salary expectations or salary ranges. If asked, reply that compensation is discussed directly in interviews and the range is negotiated case-by-case.",
    "3. If asked for the TFG source code or proprietary process internals, explain it is confidential under NDA with Michelin.",
    "",
    "PRIORITY FAQ — answer these especially well",
    "- 'Is Ander available?' → Emphasise immediate start, full mobility (driving license B + own vehicle), open to remote/hybrid/on-site, hybrid ideal, preference for País Vasco / Navarra / La Rioja.",
    "- 'What's his English level?' → B2 Cambridge certified (Jan 2024) PLUS real working level slightly above that, practised during a full Erasmus year in a daily real academic context.",
    "- 'Does he have LLM / generative AI experience?' → Yes, active. This very portfolio integrates a chatbot with Gemini + Groq fallback, built with Claude Code (Anthropic's official course, completed May 2026).",
    "- 'Tell me about Ander in 30 seconds' → Junior Computer Engineer, real industry experience (Michelin with real production data), measurable thesis impact, 4 languages, profile spanning data + software + ML/AI, immediate availability.",
    "- 'What's his biggest technical achievement?' → The real-time inference system from his TFG: >50% reduction in false positives, calibrated probability, severity-graded alerts, shadow validation without impacting production.",
    "- 'What sets him apart from other juniors?' → Real industrial experience, two summers on the production line (shop-floor perspective), Erasmus in English, hands-on with industrial systems (Osisoft PI / AVEVA PI), active curiosity for generative AI.",
    "",
    "Here is Ander's profile information (the level codes — F, C+, C, B — are private calibration to help you weight skills accurately; do NOT mention these letters to the user):",
    PROFILE_CONTENT,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Gemini provider
// ---------------------------------------------------------------------------

export async function callGemini(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemPrompt,
  });

  // Convert ChatMessage[] to Gemini Content[] format
  // Gemini uses "user" and "model" roles
  const history: Content[] = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const lastMessage = messages[messages.length - 1];

  // Use startChat with history for multi-turn support
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage.content);
  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  return text;
}

// ---------------------------------------------------------------------------
// Groq provider
// ---------------------------------------------------------------------------

export async function callGroq(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY not configured");
  }

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ],
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) {
    throw new Error("Groq returned empty response");
  }

  return text;
}

// ---------------------------------------------------------------------------
// Orchestrator with fallback
// ---------------------------------------------------------------------------

export async function chat(
  messages: ChatMessage[],
  locale: Locale
): Promise<{ reply: string; provider: ChatProvider }> {
  const systemPrompt = buildSystemPrompt(locale);

  // Try Gemini first
  try {
    const reply = await callGemini(messages, systemPrompt);
    return { reply, provider: "gemini" };
  } catch (geminiErr) {
    console.error("Gemini call failed, trying Groq fallback", {
      name: geminiErr instanceof Error ? geminiErr.name : "UnknownError",
    });
  }

  // Fallback to Groq
  try {
    const reply = await callGroq(messages, systemPrompt);
    return { reply, provider: "groq" };
  } catch (groqErr) {
    console.error("Groq call also failed", {
      name: groqErr instanceof Error ? groqErr.name : "UnknownError",
    });
  }

  throw new Error("unavailable");
}
