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

## FASE 2 — Secciones de contenido (Día 4-6) ✅

Objetivo: toda la información profesional visible en la web.

### Tareas
- [x] Sección `About.tsx`:
  - [x] Texto "Sobre mí" con párrafo de presentación _(3 párrafos)_
  - [x] Datos clave (edad, ubicación, disponibilidad) _(card derecha con iconos `MapPin`/`Briefcase`/`Calendar`)_
  - [x] Idiomas con niveles visuales _(chip code + name + level, 4 idiomas via `t.raw` casteado a `Language[]`)_
- [x] Sección `Experience.tsx`:
  - [x] Timeline vertical con las 3 experiencias _(zigzag desktop / single-col mobile, dot por entry)_
  - [x] Michelin destacada (colores, stack tags) _(`ring-2 ring-primary` + `bg-primary/5` + role en `text-primary` + dot con `bg-primary`)_
  - [x] Animación scroll-triggered _(Framer Motion `whileInView` con `viewport={{ once: true, amount: 0.2 }}`)_
- [x] Sección `Projects.tsx`:
  - [x] Card del TFG (proyecto principal)
  - [x] Métricas destacadas (>50% reducción falsos positivos) _(`font-display text-5xl md:text-6xl text-primary`)_
  - [x] Stack tecnológico con iconos/badges
  - [x] Nota: "código confidencial, datos industriales reales" _(con icono `Lock`)_
- [x] Sección `Skills.tsx`:
  - [x] Agrupadas por categorías (Data, ML, Visualización, BD, Herramientas) _(8 categorías en grid 2 cols)_
  - [x] Visual atractivo (grid de badges o barras) _(badges sin niveles — `levelLabels` quedan huérfanos en JSON por decisión)_
- [x] Sección `Education.tsx`:
  - [x] Grado en Ingeniería Informática (UBU) _(card con `GraduationCap`, sub-bloque TFG)_
  - [x] Erasmus (Universita Pardubice) _(card con `MapPin`)_
  - [x] Certificaciones (Cambridge B2, Python 220h, Claude Code in Action) _(lista con `Award`)_
- [x] Añadir todos los textos nuevos a `es.json` y `en.json` _(adelantado por CONTENT en Fase 0; este PR sólo los consume)_
- [x] Verificar animaciones y responsive _(mobile-first; smoke visual pendiente en preview de Vercel)_

### Decisiones técnicas tomadas
- **`isHighlighted` consumido vía `t.raw('items') as ExperienceItem[]`**, con tipos en `src/types/index.ts` (junto a los ya existentes `ChatMessage`, `NavItem`, `Locale`). Patrón aplicado también a `Language[]` y `Certification[]`.
- **Iconos lucide**: todos los necesarios (`MapPin`, `Briefcase`, `Calendar`, `Lock`, `TrendingDown`, `GraduationCap`, `Award`) resolvieron sin necesidad de SVG inline.
- **Alternancia de fondos**: `Experience` y `Skills` con `bg-muted/30`; `About`, `Projects`, `Education` con fondo neutro (ritmo visual entre secciones).
- **`SectionTitle` sin abstracción**: clases `font-display text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12` repetidas inline en las 5 secciones (decisión consciente — duplicación trivial).

### PR
`feature/fase-2-secciones` → `develop`

---

## FASE 3 — Chatbot IA (Día 7-9) ✅

Objetivo: chatbot funcional con fallback Gemini → Groq.

### Tareas
- [x] Crear `src/lib/ai.ts` con:
  - [x] Función `callGemini(messages, systemPrompt)` usando `@google/generative-ai` _(modelo `gemini-2.0-flash`, `systemInstruction` + `startChat(history)`)_
  - [x] Función `callGroq(messages, systemPrompt)` usando `groq-sdk` _(modelo `llama-3.1-8b-instant`)_
  - [x] Función `chat(messages, locale)` con lógica de fallback _(Gemini → Groq → throw `"unavailable"`)_
  - [x] System prompt con contenido de `PERFIL_ANDER.md` _(extraído a `src/lib/profile-content.ts` con teléfono pre-stripped + regex genérico defensivo)_
- [x] Crear `src/app/api/chat/route.ts`:
  - [x] Validación del input (longitud máxima 500 chars) _(aplicada a TODOS los mensajes, no solo al último — refuerzo SECURITY)_
  - [x] Llamada a `chat()` de `ai.ts`
  - [x] Rate limiting básico (max 20 requests/IP/hora) _(in-memory `Map<string, RateLimitEntry>` per-instance, cleanup oportunista)_
  - [x] Manejo de errores con mensajes amigables _(`ChatErrorCode`: `too_long`/`rate_limit`/`unavailable`/`generic`; status codes 400/429/503/500)_
- [x] Crear `ChatWidget.tsx`:
  - [x] Botón flotante (bottom-right) con icono _(`MessageCircle` lucide; tooltip `chat.floatingButtonTooltip`)_
  - [x] Panel de chat que se abre/cierra con animación _(Framer Motion custom panel; mobile near-fullscreen + backdrop, desktop 380×520 anclado bottom-right)_
  - [x] Input de texto + botón enviar _(Enter envía; max 500 chars; deshabilitado en loading)_
  - [x] Estado de loading mientras espera respuesta _(3 puntos animados con `aria-label`)_
  - [x] Scroll automático al último mensaje _(useRef + useEffect; `aria-live="polite"`)_
- [x] Crear `ChatMessages.tsx`:
  - [x] Burbujas de mensaje (usuario vs asistente) _(user derecha primary, assistant izquierda muted)_
  - [ ] ~~Timestamp~~ _(omitido por simplicidad visual — decisión consciente)_
  - [x] Mensaje de bienvenida inicial _(via `chat.welcomeMessage`)_
- [x] Probar con ejemplos de preguntas: _(QA gate: 6 casos, todos PASS — incluido el caso crítico "dame el teléfono" que el modelo redirige a CV/email sin filtrar dígitos)_
  - "¿Cuál es la experiencia de Ander?"
  - "What technologies does Ander know?"
  - Pregunta directa por el teléfono (regresión-test de privacidad)
- [x] Añadir textos del chat a `es.json` y `en.json` _(añadidos `errors.tooLong` y `errors.unavailable`; el resto ya existía desde Fase 0)_

### Decisiones técnicas tomadas
- **System prompt source**: `src/lib/profile-content.ts` con string TS inline (no `fs.readFile`) — predecible en serverless y permite filtrar el teléfono determinísticamente. Doble defensa: pre-stripped en el RAW + regex genérico de móvil ES (`/\b[67](?:[\s.\-]?\d){8}\b/g`) — sin literalizar el número de Ander.
- **Modelos**: Gemini `gemini-2.0-flash` (primario) + Groq `llama-3.1-8b-instant` (fallback) — ambos free tier, baja latencia.
- **Rate limit**: in-memory per-instance LRU. Aceptable para portfolio personal; en serverless cada instancia tiene su contador independiente.
- **Streaming**: NO en Fase 3 (simplicidad multi-provider) — considerar en Fase 5.
- **Histórico**: solo en estado React del widget, reset al cerrar panel (no localStorage).
- **Validación full-array**: SECURITY parchó el endpoint para validar role + length de TODOS los mensajes (no solo el último), bloqueando injection vía `role: "system"` o mensajes intermedios oversized.

### Notas operativas
- ⚠️ La key `GEMINI_API_KEY` local tiene cuota free-tier agotada en el momento del QA — el fallback a Groq funciona perfectamente. Cuando la cuota se reinicie (o se añada billing) Gemini volverá a ser primario sin cambios de código.
- ⚠️ Antes del primer deploy con chatbot a Vercel, configurar `GEMINI_API_KEY` y `GROQ_API_KEY` en Vercel Dashboard (Settings → Environment Variables).

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

## FASE 4.5 — Refino del perfil + tuning del chatbot (Día 10.5)

Objetivo: enriquecer `PERFIL_ANDER.md` con información que solo Ander sabe (matices que no estaban en la versión inicial), propagar a la web (i18n) y al system prompt del chatbot, y afinar cómo responde el asistente.

### Tareas
- [ ] **Entrevista guiada al usuario** — el orquestador hace preguntas estructuradas:
  - Experiencia Michelin: tareas concretas, anécdotas, métricas adicionales más allá del >50%
  - TFG: contexto técnico que se pueda compartir (sin violar la confidencialidad), supervisor, dificultades superadas, lecciones aprendidas
  - Erasmus en Pardubice: highlights académicos/personales, idiomas usados en clase, materias relevantes
  - KYB y Tasubinsa: skills transferibles que aporten al perfil técnico (rigor, calidad, trabajo en equipo)
  - Stack técnico: nivel real con cada herramienta, cuál es el "fuerte" frente al "conozco"
  - Soft skills + motivaciones + estilo de trabajo
  - Hobbies o intereses que aporten al perfil profesional
  - Disponibilidad/condiciones específicas (relocation, salario orientativo, modalidad híbrida vs full remote, etc.)
  - Preguntas frecuentes que el usuario quiera que el chatbot responda especialmente bien
- [ ] **Actualizar `PERFIL_ANDER.md`** con la nueva información (CONTENT-style)
- [ ] **Propagar a `src/messages/{es,en}.json`** si la nueva info afecta secciones visibles (About / Experience / Projects)
- [ ] **Regenerar `src/lib/profile-content.ts`** con el RAW_PROFILE actualizado (manteniendo el strip del teléfono)
- [ ] **Refinar `src/lib/ai.ts` system prompt** si hace falta:
  - [ ] Reglas de tono más específicas (qué destacar, qué tono usar)
  - [ ] Guías de respuesta para preguntas frecuentes
  - [ ] Posibles ejemplos few-shot si aportan
- [ ] **QA del chatbot post-refino**: 8-10 preguntas reales sobre Ander, validar respuestas ricas y precisas
- [ ] **Verificar regresión de privacidad**: el teléfono sigue sin filtrarse

### PR
`feature/fase-4-5-refino` → `develop`

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
