// This page is never rendered — the next-intl middleware redirects
// "/" to the default locale ("/{defaultLocale}/") before it hits here.
// It exists only to satisfy Next.js App Router expectations.
export default function RootPage() {
  return null;
}
