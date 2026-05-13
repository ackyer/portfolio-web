"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import type { ExperienceItem } from "@/types";

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 id="experience-heading" className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
          {t("sectionTitle")}
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8 md:gap-12">
            {items.map((item, index) => (
              <motion.div
                key={`${item.company}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 mt-6 ${
                    item.isHighlighted
                      ? "bg-primary border-primary"
                      : "bg-background border-muted-foreground"
                  }`}
                />

                {/* Card — alternates sides on desktop */}
                <div
                  className={`ml-10 md:ml-0 md:w-[46%] ${
                    index % 2 === 0
                      ? "md:mr-auto md:ml-0 md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div
                    className={`bg-card rounded-lg p-5 md:p-6 border ${
                      item.isHighlighted
                        ? "ring-2 ring-primary bg-primary/5 border-primary/20"
                        : "border-border"
                    }`}
                  >
                    {/* Company */}
                    <h3 className="font-display text-xl md:text-2xl font-bold">
                      {item.company}
                    </h3>

                    {/* Role */}
                    <p
                      className={`text-base md:text-lg mt-0.5 ${
                        item.isHighlighted
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.role}
                    </p>

                    {/* Date + location */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.dateRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base text-muted-foreground mt-2 mb-3">
                      {item.description}
                    </p>

                    {/* Bullets */}
                    {item.bullets.length > 0 && (
                      <ul className="space-y-1 mb-3">
                        {item.bullets.map((bullet, bi) => (
                          <li key={bi} className="text-sm flex gap-2">
                            <span className="text-primary shrink-0 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Stack badges */}
                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
