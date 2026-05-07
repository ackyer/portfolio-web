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

export type ExperienceItem = {
  company: string;
  role: string;
  dateRange: string;
  location: string;
  isHighlighted: boolean;
  description: string;
  bullets: string[];
  stack: string[];
};

export type Language = {
  name: string;
  level: string;
  code: string;
};

export type Certification = {
  name: string;
  entity: string;
  date: string;
};
