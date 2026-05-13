import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons/brand";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/anderakierayucar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("social.linkedinAriaLabel")}
              className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/ackyer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("social.githubAriaLabel")}
              className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:akierayucar@gmail.com"
              aria-label={t("social.emailAriaLabel")}
              className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            {t("copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
