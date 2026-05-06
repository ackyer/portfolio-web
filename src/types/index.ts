// Global TypeScript types for the portfolio

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Locale = "es" | "en";
