"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const t = useTranslations("chat");

  return (
    <>
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-1",
              isUser ? "items-end" : "items-start"
            )}
          >
            <span className="text-xs text-muted-foreground px-1">
              {isUser ? t("userLabel") : t("assistantLabel")}
            </span>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words",
                isUser
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              )}
            >
              {message.content}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-muted-foreground px-1">
            {t("assistantLabel")}
          </span>
          <div
            className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3"
            aria-label={t("loadingAriaLabel")}
            aria-live="polite"
          >
            <div className="flex gap-1 items-center">
              <span
                className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "1s" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                style={{ animationDelay: "160ms", animationDuration: "1s" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                style={{ animationDelay: "320ms", animationDuration: "1s" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
