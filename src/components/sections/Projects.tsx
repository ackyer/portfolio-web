"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Lock, TrendingDown, Calendar } from "lucide-react";

export function Projects() {
  const t = useTranslations("projects");
  const bullets = t.raw("tfg.bullets") as string[];
  const stack = t.raw("tfg.stack") as string[];

  return (
    <section id="projects">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
          {t("sectionTitle")}
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left — text content */}
              <div className="flex flex-col">
                {/* Label */}
                <p className="text-sm uppercase tracking-wider font-mono text-primary mb-2">
                  {t("tfg.subtitle")}
                </p>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                  {t("tfg.title")}
                </h3>

                {/* Date + defense */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("tfg.dateRange")}
                  </span>
                  <span>·</span>
                  <span>
                    {t("tfg.defenseLabel")}: {t("tfg.defenseDate")}
                  </span>
                </div>

                {/* Description */}
                <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                  {t("tfg.description")}
                </p>

                {/* Bullets */}
                <ul className="mt-4 space-y-2">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-primary shrink-0 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2">
                    {t("tfg.stackTitle")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Confidential note */}
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground italic mt-4">
                  <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {t("tfg.confidentialNote")}
                </p>
              </div>

              {/* Right — metric */}
              <div className="flex items-center justify-center md:justify-start">
                <div className="bg-primary/5 rounded-lg p-6 text-center md:text-left w-full">
                  <TrendingDown
                    className="h-8 w-8 text-primary mb-3 mx-auto md:mx-0"
                    aria-hidden="true"
                  />
                  <p className="font-display text-5xl md:text-6xl font-bold text-primary">
                    {t("tfg.metricValue")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("tfg.metricLabel")}
                  </p>
                  <p className="text-xs text-muted-foreground italic mt-1">
                    {t("tfg.metricDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
