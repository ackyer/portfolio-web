# Portfolio — Ander Akier Ayucar Chasco

Portfolio web profesional construido con **Next.js 15**, **TypeScript** y **Tailwind CSS**.
Desarrollado usando **Claude Code** (curso oficial de Anthropic).

🌐 **Live:** [anderakier.vercel.app](https://anderakier.vercel.app) *(URL pendiente de deploy)*

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **Animaciones:** Framer Motion
- **i18n:** next-intl (ES/EN)
- **Chat IA:** Google Gemini Flash + Groq (fallback)
- **Deploy:** Vercel

## Funcionalidades

- ✅ Presentación profesional (hero, experiencia, proyectos, skills)
- ✅ CV descargable en PDF
- ✅ Chatbot IA que responde preguntas sobre el perfil
- ✅ Soporte ES/EN con cambio de idioma en tiempo real
- ✅ Diseño responsive mobile-first
- ✅ Animaciones con scroll

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Crear variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus API keys

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Variables de entorno

```env
GEMINI_API_KEY=     # Google AI Studio — https://aistudio.google.com
GROQ_API_KEY=       # Groq Cloud — https://console.groq.com
```

## Estructura del proyecto

Ver [`CLAUDE.md`](./CLAUDE.md) para la documentación completa del proyecto.

## Flujo de trabajo

```
main (producción)
  └── develop (integración)
        └── feature/xxx (desarrollo)
```

Los PRs a `develop` son revisados automáticamente por Claude Code.
Mencionar `@claude` en cualquier issue para pedir ayuda con la implementación.

---

*Construido con ❤️ y Claude Code*
