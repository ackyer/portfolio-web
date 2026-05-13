import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "../globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-web-ackyers-projects.vercel.app";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

type LocaleParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "es" ? "es_ES" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("siteTitle"),
      template: "%s · Ander Akier",
    },
    description: t("siteDescription"),
    applicationName: "Ander Akier — Portfolio",
    authors: [{ name: "Ander Akier Ayucar Chasco" }],
    creator: "Ander Akier Ayucar Chasco",
    openGraph: {
      type: "website",
      siteName: "Ander Akier — Portfolio",
      title: t("siteTitle"),
      description: t("siteDescription"),
      url: `${SITE_URL}/${locale}`,
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        "es-ES": `${SITE_URL}/es`,
        "en-US": `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/es`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
            <ChatWidget />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
