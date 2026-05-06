# SETUP INICIAL — Checklist paso a paso

Sigue este checklist en orden para tener el proyecto listo desde cero.
Cada bloque es independiente y verificable.

---

## BLOQUE 1 — Repositorio GitHub

1. **Crear repositorio** en github.com/ackyer
   - Nombre: `portfolio` (o `portfolio-web`)
   - Visibilidad: **Public** (quieres que se vea en tu perfil)
   - Inicializar con README: **No** (lo crearemos nosotros)

2. **Configurar ramas protegidas** (Settings → Branches):
   - Añadir regla para `main`
   - Marcar: "Require a pull request before merging"
   - Marcar: "Require status checks to pass" (añadir después de configurar Actions)

3. **Añadir secret de Anthropic** (Settings → Secrets → Actions):
   - Nombre: `ANTHROPIC_API_KEY`
   - Valor: tu API key del curso (necesaria para Claude Code Review)

---

## BLOQUE 2 — Proyecto Next.js

Ejecutar en tu terminal local:

```bash
# Crear proyecto
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"

# Entrar al directorio
cd portfolio

# Instalar shadcn/ui
npx shadcn@latest init
# Responder: Default → CSS variables → sí

# Instalar dependencias del stack
npm install framer-motion next-intl lucide-react
npm install @google/generative-ai groq-sdk

# Instalar componentes shadcn que usaremos
npx shadcn@latest add button badge card separator sheet

# Crear estructura de carpetas
mkdir -p src/components/{layout,sections,chat,ui}
mkdir -p src/{i18n,messages,lib,types}
mkdir -p src/app/api/chat
mkdir -p public/{cv,images}
mkdir -p .github/{workflows,ISSUE_TEMPLATE}
```

---

## BLOQUE 3 — Archivos del proyecto

Copiar al repositorio los archivos que te he preparado:

- [ ] `CLAUDE.md` → raíz del proyecto
- [ ] `ROADMAP.md` → raíz del proyecto
- [ ] `PERFIL_ANDER.md` → raíz del proyecto
- [ ] `README.md` → raíz del proyecto (reemplazar el de Next.js)
- [ ] `.env.local.example` → raíz del proyecto
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] `.github/ISSUE_TEMPLATE/feature.md`
- [ ] `.github/ISSUE_TEMPLATE/bug.md`
- [ ] `.github/workflows/claude-review.yml`
- [ ] `.github/workflows/claude-issues.yml`

---

## BLOQUE 4 — Variables de entorno

```bash
# Copiar el ejemplo
cp .env.local.example .env.local
```

Editar `.env.local` y añadir:
- `GEMINI_API_KEY` → obtener en https://aistudio.google.com/app/apikey (gratis)
- `GROQ_API_KEY` → obtener en https://console.groq.com/keys (gratis)

También añadir estas variables en **Vercel Dashboard** cuando conectes el proyecto.

---

## BLOQUE 5 — Primer commit y push

```bash
git init
git remote add origin https://github.com/ackyer/portfolio.git
git checkout -b develop
git add .
git commit -m "chore: setup inicial del proyecto"
git push -u origin develop

# Crear rama main desde develop
git checkout -b main
git push -u origin main
git checkout develop
```

---

## BLOQUE 6 — Conectar con Vercel

1. Ir a https://vercel.com y loguearse con GitHub
2. "Add New Project" → importar repositorio `portfolio`
3. Framework: **Next.js** (detectado automáticamente)
4. **Añadir variables de entorno** en este paso:
   - `GEMINI_API_KEY`
   - `GROQ_API_KEY`
5. Deploy → verificar que funciona la URL de Vercel
6. Configurar: Settings → Git → Production Branch → `main`

---

## BLOQUE 7 — Verificación final

- [ ] `npm run dev` funciona sin errores
- [ ] `npm run build` funciona sin errores TypeScript
- [ ] La URL de Vercel carga correctamente
- [ ] Las GitHub Actions aparecen en el repositorio
- [ ] El secret `ANTHROPIC_API_KEY` está configurado en GitHub
- [ ] `.env.local` está en `.gitignore` (no aparece en git status)

---

## ✅ Setup completo

Cuando todo esté marcado, el proyecto está listo para empezar la **Fase 1** del ROADMAP.

El siguiente paso es trabajar con Claude Code:
```bash
# En el directorio del proyecto
claude
```

Y decirle a Claude Code: *"Lee el CLAUDE.md y el ROADMAP.md. Vamos a implementar la Fase 1."*
