# CLAUDE.md — Portfolio Web · Ander Akier Ayucar Chasco

> Fuente de verdad para Claude Code. Léelo antes de tocar cualquier archivo.

## STACK TÉCNICO

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| Animaciones | Framer Motion |
| i18n | next-intl (ES/EN) |
| Chat IA | Gemini Flash (primario) + Groq (fallback) |
| Deploy | Vercel (free tier) |

## ESTRUCTURA

src/app/[locale]/ — rutas internacionalizadas
src/components/sections/ — Hero, About, Experience, Projects, Skills, Education, Contact
src/components/chat/ — ChatWidget, ChatMessages
src/components/layout/ — Header, Footer
src/app/api/chat/route.ts — endpoint chatbot
src/messages/es.json + en.json — todos los textos
src/lib/ai.ts — lógica Gemini + Groq fallback

## i18n

- Locales: es (default) y en
- NUNCA hardcodear textos — siempre useTranslations()

## CHATBOT

Responde sobre Ander. Fallback: Gemini Flash -> Groq.
Variables: GEMINI_API_KEY y GROQ_API_KEY (nunca en código)

## DISEÑO

- Fuentes: Syne (headings) + JetBrains Mono (stack) + Inter (body)
- Colores: fondo #FAFAF8, texto #1A1A1A, acento #1E3A5F / #3B82F6
- Single-page, mobile-first, animaciones scroll-triggered con Framer Motion

## FLUJO DE TRABAJO

Ramas: main (prod, protegida) <- develop <- feature/xxx
Commits: Conventional Commits (feat/fix/chore/docs/style)
PRs: feature/* -> develop, revisados con Claude Code Review Action
Issues: mencionar @claude para pedir ayuda

## CONVENCIONES

- TypeScript strict: true, imports absolutos @/*
- PascalCase componentes, camelCase funciones, UPPER_SNAKE_CASE constantes
- No any, no console.log en prod, no API keys en código

## CONTENIDO

Todo viene de PERFIL_ANDER.md. No inventar información sobre Ander.

## NO HACER

- No páginas separadas (single-page)
- No hardcodear textos
- No incluir proyectos HuntTheWumpus ni LoopMart
- No revelar teléfono en el frontend
- No subir API keys
