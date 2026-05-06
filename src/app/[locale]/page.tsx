import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Placeholders para fases siguientes */}
        <section id="about" className="min-h-[40vh]" />
        <section id="experience" className="min-h-[40vh]" />
        <section id="projects" className="min-h-[40vh]" />
        <section id="skills" className="min-h-[40vh]" />
        <section id="education" className="min-h-[40vh]" />
        <section id="contact" className="min-h-[40vh]" />
      </main>
      <Footer />
    </>
  );
}
