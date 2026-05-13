"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessages } from "@/components/chat/ChatMessages";
import type { ChatMessage, ChatErrorCode, ChatRequest, ChatResponse } from "@/types";

const MAX_INPUT_LENGTH = 500;

const ERROR_KEY_MAP: Record<string, ChatErrorCode> = {
  too_long: "too_long",
  rate_limit: "rate_limit",
  unavailable: "unavailable",
  generic: "generic",
};

export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale() as "es" | "en";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: t("welcomeMessage"),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<ChatErrorCode | "networkError" | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let animation start before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard: Escape to close
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      // Dismiss error when user starts typing again
      if (errorKey !== null) {
        setErrorKey(null);
      }
    },
    [errorKey]
  );

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || trimmed.length > MAX_INPUT_LENGTH) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setErrorKey(null);
    setIsLoading(true);

    try {
      const body: ChatRequest = {
        messages: [...messages, userMessage],
        locale,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: ChatResponse = await response.json();

      if (data.ok) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const mapped = ERROR_KEY_MAP[data.error] ?? "generic";
        setErrorKey(mapped);
      }
    } catch {
      setErrorKey("networkError");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, locale]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void handleSubmit();
      }
    },
    [handleSubmit]
  );

  const isSendDisabled =
    !input.trim() || isLoading || input.trim().length > MAX_INPUT_LENGTH;

  const errorText = errorKey
    ? errorKey === "networkError"
      ? t("errors.networkError")
      : errorKey === "too_long"
      ? t("errors.tooLong")
      : errorKey === "rate_limit"
      ? t("errors.rateLimited")
      : errorKey === "unavailable"
      ? t("errors.unavailable")
      : t("errors.generic")
    : null;

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop (optional, subtle) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              aria-hidden="true"
              onClick={handleClose}
            />

            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("panelTitle")}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={cn(
                "fixed z-50 flex flex-col",
                "bg-background border border-border rounded-2xl shadow-2xl overflow-hidden",
                // Mobile: near fullscreen from bottom
                "inset-x-3 bottom-3 top-20",
                // Desktop: fixed size, bottom-right above the button
                "md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[520px]"
              )}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary">
                <div className="flex items-center gap-2">
                  <MessageCircle
                    className="h-5 w-5 text-primary-foreground"
                    aria-hidden="true"
                  />
                  <span className="font-display font-semibold text-sm text-primary-foreground">
                    {t("panelTitle")}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  aria-label={t("closeAriaLabel")}
                  className="rounded-md p-1.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Messages area */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
                aria-live="polite"
                aria-label={t("panelTitle")}
              >
                <ChatMessages messages={messages} isLoading={isLoading} />
                <div ref={messagesEndRef} aria-hidden="true" />
              </div>

              {/* Error display */}
              {errorText && (
                <div
                  className="px-4 py-2 text-xs text-destructive bg-destructive/5 border-t border-destructive/10"
                  role="alert"
                >
                  {errorText}
                </div>
              )}

              {/* Input row */}
              <div className="px-3 py-3 border-t border-border flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={t("inputPlaceholder")}
                  maxLength={MAX_INPUT_LENGTH}
                  disabled={isLoading}
                  aria-label={t("inputPlaceholder")}
                  className={cn(
                    "flex-1 min-w-0 rounded-xl border border-input bg-muted px-3.5 py-2 text-sm",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    "transition-colors"
                  )}
                />
                <button
                  onClick={() => void handleSubmit()}
                  disabled={isSendDisabled}
                  aria-label={t("sendButtonAriaLabel")}
                  title={t("sendButtonLabel")}
                  className={cn(
                    "shrink-0 inline-flex items-center justify-center rounded-xl p-2.5",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 active:bg-primary/80",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button — hidden when panel is open on mobile */}
      <div className={cn("fixed bottom-6 right-6 z-50", isOpen && "hidden md:block")}>
        <div className="relative group">
          {/* Tooltip */}
          <span
            className={cn(
              "absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap",
              "bg-foreground text-background shadow-md",
              "opacity-0 group-hover:opacity-100 pointer-events-none",
              "transition-opacity duration-200",
              "translate-y-1 group-hover:translate-y-0"
            )}
            role="tooltip"
          >
            {t("floatingButtonTooltip")}
          </span>

          <button
            onClick={handleOpen}
            aria-label={t("floatingButtonAriaLabel")}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            className={cn(
              "w-14 h-14 rounded-full",
              "bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl",
              "hover:bg-primary/90 active:scale-95",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "flex items-center justify-center"
            )}
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
