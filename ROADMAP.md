# ROADMAP — Portfolio Web Ander Akier

> Plan de desarrollo por fases. Cada fase es un conjunto de PRs independientes.
> Marcar con ✅ cuando esté completado.

---

## FASE 0 — Setup del proyecto (Día 1)

Objetivo: repositorio funcional, desplegable y con toda la infraestructura lista.

### Tareas
- [ ] Crear repositorio en GitHub (`portfolio-ander` o similar)
- [ ] Inicializar Next.js 15 con TypeScript: `npx create-next-app@latest`
- [ ] Instalar y configurar Tailwind CSS v4
- [ ] Instalar shadcn/ui: `npx shadcn@latest init`
- [ ] Instalar dependencias del stack: `framer-motion`, `next-intl`, `lucide-react`
- [ ] Configurar estructura de carpetas según `CLAUDE.md`
- [ ] Configurar `next.config.ts` con next-intl
- [ ] Crear `middleware.ts` para i18n
- [ ] Crear archivos de mensajes `es.json` y `en.json` (estructura vacía)
- [ ] Configurar `tsconfig.json` con paths absolutos (`@/*`)
- [ ] Añadir `.env.local.example` con las variables necesarias
- [ ] Añadir `.gitignore` correcto (incluir `.env.local`)
- [ ] Conectar con Vercel y hacer primer deploy vacío
- [ ] Configurar rama `main` como protegida en GitHub
- [ ] Crear rama `develop`

### Configuración GitHub
- [ ] Añadir `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] Añadir `.github/ISSUE_TEMPLATE/feature.md`
- [ ] Añadir `.github/ISSUE_TEMPLATE/bug.md`
- [ ] Añadir `.github/workflows/claude-review.yml` (Claude Code Review en PRs)
- [ ] Configurar variables de entorno en Vercel Dashboard

### Entregable
> La web despliega en Vercel con una página en blanco. El repositorio tiene toda la estructura.

---

## FASE 1 — Layout base + Hero (Día 2-3) ✅

Objetivo: la web tiene estructura visual, navegación y la primera sección impactante.

### Tareas
- [x] Crear `layout.tsx` global con fuentes (Syne + JetBrains Mono vía Google Fonts) _(adelantado en Fase 0; Inter añadido como body)_
- [x] Crear `Header.tsx` con:
  - [x] Logo/nombre _(monograma "AA" en mobile, "Ander Akier" en desktop)_
  - [x] Navegación a secciones (scroll suave) _(CSS `scroll-behavior: smooth` + `scroll-margin-top`)_
  - [x] Botón de cambio de idioma ES/EN _(usa `createNavigation` de next-intl)_
  - [x] Responsive (hamburger en móvil) _(shadcn `Sheet`)_
- [x] Crear `Footer.tsx` con links a LinkedIn, GitHub y email
- [x] Crear sección `Hero.tsx` con:
  - [x] Nombre completo animado
  - [ ] ~~Título profesional (con efecto typewriter opcional)~~ _(saltado por simplicidad — opcional)_
  - [x] Descripción breve (tagline)
  - [x] CTAs: "Ver proyectos" y "Descargar CV"
  - [x] Foto de perfil _(next/image priority, ring-primary/20)_
  - [x] Animación de entrada con Framer Motion _(stagger)_
- [x] Añadir todos los textos a `es.json` y `en.json` _(adelantado por CONTENT en Fase 0)_
- [x] Verificar responsive en móvil, tablet y desktop _(mobile-first + breakpoints `md:` y `lg:`; smoke visual pendiente en preview de Vercel)_

### Decisiones técnicas tomadas
- Iconos LinkedIn/GitHub: SVG inline en `Footer.tsx` (la versión instalada de `lucide-react` no exporta esas marcas).
- shadcn instalado: `button` + `sheet` con peers `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `class-variance-authority`.
- Logo header: monograma "AA" en mobile, nombre "Ander Akier" desde `sm:` para no romper viewports estrechos.
- `experience.items[].isHighlighted` (boolean en JSON, abierto desde Fase 0): patrón aprobado para Fase 2 — consumirlo con `t.raw('experience.items')` casteado a un tipo en `src/types/index.ts`.

### PR
`feature/fase-1-layout-hero` → `develop` _(mergeado tras bracket `fix/security-redact-phone` que tachó un teléfono filtrado en `.claude/orchestrator-prompt.md`)_

---

## FASE 2 — Secciones de contenido (Día 4-6)

Objetivo: toda la información profesional visible en la web.

### Tareas
- [ ] Sección `About.tsx`:
  - [ ] Texto "Sobre mí" con párrafo de presentación
  - [ ] Datos clave (edad, ubicación, disponibilidad)
  - [ ] Idiomas con niveles visuales
- [ ] Sección `Experience.tsx`:
  - [ ] Timeline vertical con las 3 experiencias
  - [ ] Michelin destacada (colores, stack tags)
  - [ ] Animación scroll-triggered
- [ ] Sección `Projects.tsx`:
  - [ ] Card del TFG (proyecto principal)
  - [ ] Métricas destacadas (>50% reducción falsos positivos)
  - [ ] Stack tecnológico con iconos/badges
  - [ ] Nota: "código confidencial, datos industriales reales"
- [ ] Sección `Skills.tsx`:
  - [ ] Agrupadas por categorías (Data, ML, Visualización, BD, Herramientas)
  - [ ] Visual atractivo (grid de badges o barras)
- [ ] Sección `Education.tsx`:
  - [ ] Grado en Ingeniería Informática (UBU)
  - [ ] Erasmus (Universita Pardubice)
  - [ ] Certificaciones (Cambridge B2, Python 220h)
- [ ] Añadir todos los textos nuevos a `es.json` y `en.json`
- [ ] Verificar animaciones y responsive

### PR
`feature/fase-2-secciones` → `develop`

---

## FASE 3 — Chatbot IA (Día 7-9)

Objetivo: chatbot funcional con fallback Gemini → Groq.

### Tareas
- [ ] Crear `src/lib/ai.ts` con:
  - [ ] Función `callGemini(messages)` usando `@google/generative-ai`
  - [ ] Función `callGroq(messages)` usando `groq-sdk`
  - [ ] Función `chat(messages)` con lógica de fallback
  - [ ] System prompt con todo el contenido de `PERFIL_ANDER.md`
- [ ] Crear `src/app/api/chat/route.ts`:
  - [ ] Validación del input (longitud máxima 500 chars)
  - [ ] Llamada a `chat()` de `ai.ts`
  - [ ] Rate limiting básico (max 20 requests/IP/hora)
  - [ ] Manejo de errores con mensajes amigables
- [ ] Crear `ChatWidget.tsx`:
  - [ ] Botón flotante (bottom-right) con icono
  - [ ] Panel de chat que se abre/cierra con animación
  - [ ] Input de texto + botón enviar
  - [ ] Estado de loading mientras espera respuesta
  - [ ] Scroll automático al último mensaje
- [ ] Crear `ChatMessages.tsx`:
  - [ ] Burbujas de mensaje (usuario vs asistente)
  - [ ] Timestamp
  - [ ] Mensaje de bienvenida inicial
- [ ] Probar con ejemplos de preguntas:
  - "¿Cuál es la experiencia de Ander?"
  - "What technologies does Ander know?"
  - "¿Está disponible para trabajar?"
- [ ] Añadir textos del chat a `es.json` y `en.json`

### PR
`feature/fase-3-chatbot` → `develop`

---

## FASE 4 — Sección Contact + CV (Día 10)

Objetivo: sección de contacto con CV descargable.

### Tareas
- [ ] Sección `Contact.tsx`:
  - [ ] Email clickable (`mailto:`)
  - [ ] Botón "Descargar CV" (PDF en `public/cv/`)
  - [ ] Links a LinkedIn y GitHub con iconos
  - [ ] Disponibilidad y ubicación
- [ ] Subir `CV_Ander_Ayucar.pdf` a `public/cv/`
- [ ] Subir foto de perfil a `public/images/`

### PR
`feature/fase-4-contact` → `develop`

---

## FASE 5 — Pulido y deploy final (Día 11-12)

Objetivo: web lista para compartir públicamente.

### Tareas
- [ ] SEO: `metadata` en `layout.tsx` (title, description, og:image)
- [ ] `robots.txt` y `sitemap.xml`
- [ ] Favicon con inicial "A" o logo simple
- [ ] Revisión de accesibilidad (ARIA labels, contraste, tab navigation)
- [ ] Revisión de performance (Lighthouse > 90 en todas las métricas)
- [ ] Revisión de responsive en dispositivos reales
- [ ] Revisión de textos ES/EN (consistencia, sin errores)
- [ ] Merge `develop` → `main`
- [ ] Verificar deploy en Vercel
- [ ] Comprobar que el chatbot funciona en producción
- [ ] Añadir URL de la web a perfil de LinkedIn y GitHub

### PR
`feature/fase-5-pulido` → `develop` → merge final a `main`

---

## FASE 6 — Post-lanzamiento (Futuro)

Tareas opcionales para después de publicar:

- [ ] Añadir certificación del curso Claude Code de Anthropic
- [ ] Publicar en LinkedIn sobre la web (mencionando Claude Code)
- [ ] Blog técnico (artículo sobre el TFG cuando sea público)
- [ ] Dominio personalizado (anderakier.dev o similar)
- [ ] Analytics (Vercel Analytics, gratuito)
- [ ] Añadir más proyectos si los hay

---

## 📊 RESUMEN DE TIEMPOS

| Fase | Descripción | Días estimados |
|---|---|---|
| 0 | Setup | 1 |
| 1 | Layout + Hero | 2 |
| 2 | Secciones contenido | 3 |
| 3 | Chatbot IA | 3 |
| 4 | Contact + CV | 1 |
| 5 | Pulido + Deploy | 2 |
| **Total** | | **~12 días** |

> Estimación trabajando con Claude Code de forma activa. El tiempo real depende de la dedicación diaria.
