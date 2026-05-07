"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

const CATEGORY_KEYS = [
  "languages",
  "pythonData",
  "mlAi",
  "viz",
  "databases",
  "cloud",
  "industrial",
  "tools",
  "methodologies",
] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {CATEGORY_KEYS.map((key: CategoryKey) => {
            const items = t.raw(`items.${key}`) as string[];

            return (
              <motion.div
                key={key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <h3 className="font-display text-lg font-semibold mb-3">
                  {t(`categories.${key}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <motion.span
                      key={item}
                      variants={badgeVariants}
                      className="inline-flex items-center rounded-md bg-secondary/10 text-foreground border border-border px-3 py-1 text-sm font-mono hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
