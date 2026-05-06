// Root layout — minimal shell required by Next.js App Router.
// The actual <html>/<body> are rendered in [locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
