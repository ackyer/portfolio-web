"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, GithubIcon } from "@/components/icons/brand";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="contact-heading" className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            {t("sectionTitle")}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {t("intro")}
          </p>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">
                  {t("emailLabel")}
                </p>
                <a
                  href={`mailto:${t("emailValue")}`}
                  className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {t("emailValue")}
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <LinkedinIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">
                  {t("linkedinLabel")}
                </p>
                <a
                  href={t("linkedinUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("linkedinLabel")}
                  className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {t("linkedinUrl")}
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <GithubIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">
                  {t("githubLabel")}
                </p>
                <a
                  href={t("githubUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("githubLabel")}
                  className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  {t("githubUrl")}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">
                  {t("locationLabel")}
                </p>
                <p className="text-sm font-medium">{t("locationValue")}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">
                  {t("availabilityLabel")}
                </p>
                <p className="text-sm font-medium">{t("availabilityValue")}</p>
              </div>
            </div>
          </div>

          {/* CTA — Download CV */}
          <Button asChild size="lg">
            <a
              href="/cv/cv-ander-akier.pdf"
              download
              aria-label={t("downloadCvAriaLabel")}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("downloadCvCta")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
