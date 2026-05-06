import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("hero");
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-4xl">{t("name")}</h1>
    </main>
  );
}
