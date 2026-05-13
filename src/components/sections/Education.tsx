"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import type { Certification } from "@/types";

export function Education() {
  const t = useTranslations("education");
  const certifications = t.raw("certifications.items") as Certification[];

  return (
    <section id="education" aria-labelledby="education-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 id="education-heading" className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
          {t("sectionTitle")}
        </h2>

        {/* Block 1 — Degree + Erasmus cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Degree card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <GraduationCap
                className="h-6 w-6 text-primary mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-bold leading-tight">
                {t("degree.title")}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              {t("degree.institution")}
            </p>
            <p className="text-sm text-muted-foreground font-mono mt-0.5">
              {t("degree.dateRange")}
            </p>

            {/* TFG sub-block */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs uppercase tracking-wider font-mono text-primary mb-1">
                {t("degree.tfgLabel")}
              </p>
              <p className="text-sm italic">{t("degree.tfgTitle")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("degree.tfgNote")}
              </p>
            </div>
          </motion.div>

          {/* Erasmus card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <MapPin
                className="h-6 w-6 text-primary mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-bold leading-tight">
                {t("erasmus.title")}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              {t("erasmus.institution")}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("erasmus.location")}
            </p>
            <p className="text-sm text-muted-foreground font-mono mt-0.5">
              {t("erasmus.dateRange")}
            </p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {t("erasmus.description")}
            </p>
          </motion.div>
        </div>

        {/* Block 2 — Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="font-display text-xl font-semibold mb-4">
            {t("certifications.sectionLabel")}
          </h3>

          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <Award
                  className="h-5 w-5 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.entity}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono shrink-0">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
