import { getTranslations } from "next-intl/server";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import type { Language } from "@/types";

export async function About() {
  const t = await getTranslations("about");
  const languages = t.raw("languages") as Language[];

  return (
    <section id="about">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Left column — paragraphs */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("paragraph3")}
            </p>
          </div>

          {/* Right column — facts card */}
          <div className="md:col-span-1">
            <div className="bg-muted/50 rounded-lg p-6 space-y-6">
              {/* Key facts */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="h-4 w-4 text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      {t("facts.locationLabel")}
                    </p>
                    <p className="text-sm font-medium">{t("facts.locationValue")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase
                    className="h-4 w-4 text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      {t("facts.availabilityLabel")}
                    </p>
                    <p className="text-sm font-medium">{t("facts.availabilityValue")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar
                    className="h-4 w-4 text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      {t("facts.ageLabel")}
                    </p>
                    <p className="text-sm font-medium">{t("facts.ageValue")}</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-3">
                  {t("facts.languagesLabel")}
                </p>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-semibold">
                        {lang.code}
                      </span>
                      <span className="text-sm">{lang.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
