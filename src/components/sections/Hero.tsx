"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="min-h-screen flex items-center"
      aria-label={t("name")}
    >
      <motion.div
        className="mx-auto max-w-6xl px-4 md:px-6 pt-24 pb-12 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text block */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground"
            >
              {t("name")}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl">
              <span className="text-muted-foreground">{t("headline")} </span>
              <span className="font-mono text-primary font-semibold">
                {t("headlineHighlight")}
              </span>
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {t("tagline")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <Button asChild size="lg">
                <a href="#projects">
                  <Briefcase className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t("cta.viewProjects")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="/cv/cv-ander-akier.pdf"
                  download
                  aria-label={t("cta.downloadCv")}
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t("cta.downloadCv")}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Image block */}
          <motion.div
            variants={imageVariants}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="relative w-48 h-48 md:w-80 md:h-80">
              <Image
                src="/images/ander-profile.jpg"
                alt={t("profileImageAlt")}
                width={400}
                height={400}
                priority
                className="rounded-full object-cover w-full h-full ring-4 ring-primary/20 shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
