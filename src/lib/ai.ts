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
    "If the user asks for Ander's phone number, reply that he only shares it via direct CV/email contact — never disclose any phone number.",
    "",
    "Here is Ander's profile information:",
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
