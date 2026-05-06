# CLAUDE.md — Portfolio Web · Ander Akier Ayucar Chasco

> Este archivo es la fuente de verdad para Claude Code en este proyecto.
> Léelo completo antes de tocar cualquier archivo.

---

## 🎯 QUÉ ES ESTE PROYECTO

Portfolio web profesional de **Ander Akier Ayucar Chasco**, Ingeniero Informático especializado en Data Engineering, Data Analysis y Machine Learning. El objetivo principal es conseguir trabajo en el sector de datos/IA en Navarra, País Vasco o en remoto.

La web incluye:
- Presentación profesional (hero, sobre mí, experiencia, proyectos, habilidades)
- CV descargable en PDF
- Chatbot con IA que responde preguntas sobre Ander
- Internacionalización ES/EN
- Diseño profesional, limpio y memorable

---

## 🏗️ STACK TÉCNICO

| Capa | Tecnología | Razón |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSG/SSR, SEO, i18n nativo, deploy en Vercel gratis |
| Lenguaje | **TypeScript** | Tipado estático, calidad de código |
| Estilos | **Tailwind CSS v4** | Utilidades, consistencia, rapidez |
| Componentes | **shadcn/ui** | Accesibles, personalizables, sin vendor lock-in |
| Animaciones | **Framer Motion** | Micro-interacciones profesionales |
| i18n | **next-intl** | Internacionalización ES/EN con App Router |
| Chat IA | **Google Gemini Flash** (primario) + **Groq** (fallback) | Ambos gratuitos |
| Iconos | **Lucide React** | Consistentes con shadcn/ui |
| Deploy | **Vercel** (free tier) | Integración perfecta con Next.js y GitHub |

### Dependencias principales
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0",
  "next-intl": "^3.0.0",
  "lucide-react": "latest",
  "@google/generative-ai": "latest",
  "groq-sdk": "latest"
}
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
portfolio-ander/
├── CLAUDE.md                          # ← Este archivo
├── ROADMAP.md                         # Plan de desarrollo
├── PERFIL_ANDER.md                    # Fuente de verdad del contenido
│
├── public/
│   ├── cv/
│   │   └── CV_Ander_Ayucar.pdf        # CV descargable
│   ├── images/
│   │   └── ander-profile.png          # Foto de perfil circular
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── [locale]/                  # Rutas internacionalizadas
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Home (todas las secciones)
│   │   │   └── not-found.tsx
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts           # Endpoint del chatbot IA
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx             # Navbar con cambio de idioma
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Nombre, título, CTAs
│   │   │   ├── About.tsx              # Sobre mí
│   │   │   ├── Experience.tsx         # Experiencia profesional (timeline)
│   │   │   ├── Projects.tsx           # Proyectos destacados (TFG)
│   │   │   ├── Skills.tsx             # Habilidades técnicas
│   │   │   ├── Education.tsx          # Formación e idiomas
│   │   │   └── Contact.tsx            # Contacto + CV download
│   │   ├── chat/
│   │   │   ├── ChatWidget.tsx         # Botón flotante + chat
│   │   │   └── ChatMessages.tsx       # Mensajes del chat
│   │   └── ui/                        # Componentes de shadcn/ui
│   │
│   ├── i18n/
│   │   ├── routing.ts                 # Configuración de locales
│   │   └── request.ts
│   │
│   ├── messages/
│   │   ├── es.json                    # Textos en español
│   │   └── en.json                    # Textos en inglés
│   │
│   ├── lib/
│   │   ├── ai.ts                      # Lógica del chatbot (Gemini + Groq fallback)
│   │   └── utils.ts                   # cn() y utilidades
│   │
│   └── types/
│       └── index.ts                   # Tipos TypeScript globales
│
├── middleware.ts                       # Middleware de next-intl
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🌍 INTERNACIONALIZACIÓN (i18n)

- Locales soportados: `es` (default) y `en`
- Implementado con `next-intl` y App Router
- Cambio de idioma en el Header, persistido en cookie
- **Todos los textos van en** `src/messages/es.json` y `src/messages/en.json`
- Nunca hardcodear texto en los componentes, siempre usar `useTranslations()`

---

## 🤖 CHATBOT IA

### Comportamiento esperado
El chatbot responde preguntas sobre Ander como si fuera su asistente personal profesional. Tono: profesional pero cercano, en el idioma en que se le hable.

### Lógica de fallback
```
1. Intentar con Google Gemini Flash (GEMINI_API_KEY)
2. Si falla o quota agotada → intentar con Groq (GROQ_API_KEY)
3. Si ambos fallan → mensaje de error amigable
```

### System prompt base (en `src/lib/ai.ts`)
```
Eres el asistente virtual del portfolio de Ander Akier Ayucar Chasco.
Respondes preguntas sobre su perfil profesional, experiencia, habilidades y proyectos.
Sé conciso, profesional y amigable. Si no sabes algo, dilo honestamente.
Responde siempre en el idioma en que te hablen.

Información sobre Ander:
[INCLUIR CONTENIDO DE PERFIL_ANDER.md]
```

### Variables de entorno necesarias
```env
GEMINI_API_KEY=
GROQ_API_KEY=
```

---

## 🎨 DISEÑO Y ESTÉTICA

### Paleta de colores
- **Fondo:** Blanco roto / near-white (`#FAFAF8`)
- **Texto principal:** Casi negro (`#1A1A1A`)
- **Acento primario:** Azul oscuro profesional (`#1E3A5F`)
- **Acento secundario:** Azul cielo vibrante (`#3B82F6`)
- **Superficies:** Gris muy suave (`#F4F4F2`)

### Tipografía
- **Display / Headings:** `Syne` (Google Fonts) — geométrica, moderna, memorable
- **Body:** `Inter` — legible, profesional (excepción justificada por legibilidad en textos largos)
- **Código/Stack:** `JetBrains Mono` — para mostrar tecnologías

### Principios de diseño
- Una página (single-page) con scroll suave entre secciones
- Layout limpio con espacio generoso
- Animaciones sutiles de entrada (scroll-triggered con Framer Motion)
- Mobile-first, responsive en todos los breakpoints
- Accesible (ARIA labels, contraste suficiente, navegación por teclado)

---

## ⚙️ FLUJO DE TRABAJO CON GITHUB

### Ramas
```
main          ← producción (protegida, solo merge via PR)
develop       ← rama de integración
feature/xxx   ← features individuales
fix/xxx       ← correcciones
```

### Commits
Usar **Conventional Commits**:
```
feat: añadir sección de proyectos
fix: corregir layout en móvil del hero
chore: actualizar dependencias
docs: actualizar README
style: ajustar espaciado en Experience
```

### Pull Requests
- Siempre abrir PR de `feature/*` → `develop`
- Usar el template de PR del proyecto (`.github/PULL_REQUEST_TEMPLATE.md`)
- Los PRs se revisan con **Claude Code Review** (GitHub Action)

### Issues
- Usar los templates de issue del proyecto
- Mencionar `@claude` en issues para que Claude Code ayude con la implementación

---

## 🚀 DEPLOY

- **Plataforma:** Vercel (free tier)
- **Dominio:** El que provee Vercel por defecto (`.vercel.app`) o dominio propio si se añade después
- **Variables de entorno:** Configurar en Vercel Dashboard (nunca en el código)
- **Deploy automático:** Cada push a `main` despliega automáticamente
- **Preview deploys:** Cada PR genera un preview URL automático

---

## ✅ CONVENCIONES DE CÓDIGO

- **TypeScript estricto:** `strict: true` en tsconfig
- **Imports absolutos:** `@/components/...`, `@/lib/...`, etc.
- **Componentes:** PascalCase, un componente por archivo
- **Funciones/variables:** camelCase
- **Constantes:** UPPER_SNAKE_CASE
- **No usar `any`** en TypeScript salvo casos excepcionales justificados
- **Comentarios:** Solo cuando el código no es autoexplicativo

---

## 🔒 SEGURIDAD

- Las API keys **NUNCA** van en el código, solo en variables de entorno
- El endpoint `/api/chat` debe validar el input del usuario (longitud máxima, sanitización)
- Rate limiting básico en el endpoint del chat para evitar abuso

---

## 📋 CONTENIDO — FUENTE DE VERDAD

Todo el contenido de la web (textos, datos, experiencia, proyectos) viene de **`PERFIL_ANDER.md`**. Antes de escribir cualquier texto en la web, consultar ese archivo. No inventar ni suponer información sobre Ander.

---

## 🚫 LO QUE NO SE DEBE HACER

- No crear páginas separadas para cada sección (es single-page)
- No usar librerías de UI que no estén en el stack aprobado sin consultarlo
- No hardcodear textos (todo pasa por i18n)
- No incluir los proyectos de GitHub `HuntTheWumpus` ni `LoopMart` en la web
- No revelar información sensible (teléfono) en el código del frontend
- No subir las API keys al repositorio
- No usar `console.log` en producción
