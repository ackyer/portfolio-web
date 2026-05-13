import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-web-ackyers-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1.0 : 0.9,
    alternates: {
      languages: {
        "es-ES": `${SITE_URL}/es`,
        "en-US": `${SITE_URL}/en`,
      },
    },
  }));
}
