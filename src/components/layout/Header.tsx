"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu } from "lucide-react";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "about" as const, href: "#about" },
  { key: "experience" as const, href: "#experience" },
  { key: "projects" as const, href: "#projects" },
  { key: "skills" as const, href: "#skills" },
  { key: "education" as const, href: "#education" },
  { key: "contact" as const, href: "#contact" },
];

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextLocale = locale === "es" ? "en" : "es";

  function handleLangToggle() {
    router.replace(pathname, { locale: nextLocale });
  }

  function handleMobileNavClick() {
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      {/* Skip to main content — visible only on keyboard focus */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label={t("logoAlt")}
            className="font-display text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span className="hidden sm:inline">Ander Akier</span>
            <span
              className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground text-sm font-bold"
              aria-hidden="true"
            >
              AA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {t(`nav.${key}`)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={handleLangToggle}
              aria-label={t("languageToggleAriaLabel")}
              className="hidden md:inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider border border-border bg-transparent text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {nextLocale.toUpperCase()}
            </button>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label={t("openMenuAriaLabel")}
                  className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-primary hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="sr-only">{t("openMenuAriaLabel")}</SheetTitle>
                <nav
                  className="flex flex-col gap-1 mt-8"
                  aria-label="Mobile navigation"
                >
                  {NAV_ITEMS.map(({ key, href }) => (
                    <a
                      key={key}
                      href={href}
                      onClick={handleMobileNavClick}
                      className="block rounded-md px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {t(`nav.${key}`)}
                    </a>
                  ))}
                </nav>

                {/* Mobile lang toggle */}
                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => {
                      handleLangToggle();
                      setMobileOpen(false);
                    }}
                    aria-label={t("languageToggleAriaLabel")}
                    className="w-full flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-mono font-semibold uppercase tracking-wider border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {nextLocale.toUpperCase()}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
