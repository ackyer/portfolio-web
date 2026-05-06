#!/bin/bash
# ============================================================
# setup-github.sh — Sube todos los archivos al repo portfolio-web
# Uso: bash setup-github.sh TU_GITHUB_TOKEN
# ============================================================

TOKEN=$1
REPO="ackyer/portfolio-web"
API="https://api.github.com/repos/$REPO/contents"

if [ -z "$TOKEN" ]; then
  echo "❌ Uso: bash setup-github.sh TU_GITHUB_TOKEN"
  echo ""
  echo "Para obtener un token:"
  echo "  GitHub → Settings → Developer settings → Personal access tokens → Fine-grained"
  echo "  Permisos necesarios: Contents (Read and Write)"
  exit 1
fi

# Función para subir un archivo
upload() {
  local path="$1"
  local file="$2"
  local message="$3"
  
  local content=$(base64 -w 0 "$file")
  
  local response=$(curl -s -o /dev/null -w "%{http_code}" \
    -X PUT \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    "$API/$path" \
    -d "{\"message\": \"$message\", \"content\": \"$content\"}")
  
  if [ "$response" = "201" ]; then
    echo "✅ $path"
  else
    echo "❌ $path (HTTP $response)"
  fi
}

echo "🚀 Subiendo archivos al repo $REPO..."
echo ""

# Archivos raíz
upload "ROADMAP.md"           "$(dirname $0)/portfolio-ander/ROADMAP.md"           "docs: añadir ROADMAP.md con plan de desarrollo"
upload "PERFIL_ANDER.md"      "$(dirname $0)/portfolio-ander/PERFIL_ANDER.md"      "docs: añadir PERFIL_ANDER.md como fuente de verdad"
upload "README.md"            "$(dirname $0)/portfolio-ander/README.md"            "docs: añadir README.md"
upload "SETUP.md"             "$(dirname $0)/portfolio-ander/SETUP.md"             "docs: añadir SETUP.md con checklist de setup"
upload ".env.local.example"   "$(dirname $0)/portfolio-ander/.env.local.example"   "chore: añadir .env.local.example"

# GitHub templates
upload ".github/PULL_REQUEST_TEMPLATE.md"     "$(dirname $0)/portfolio-ander/.github/PULL_REQUEST_TEMPLATE.md"     "chore: añadir PR template"
upload ".github/ISSUE_TEMPLATE/feature.md"    "$(dirname $0)/portfolio-ander/.github/ISSUE_TEMPLATE/feature.md"    "chore: añadir issue template feature"
upload ".github/ISSUE_TEMPLATE/bug.md"        "$(dirname $0)/portfolio-ander/.github/ISSUE_TEMPLATE/bug.md"        "chore: añadir issue template bug"
upload ".github/workflows/claude-review.yml"  "$(dirname $0)/portfolio-ander/.github/workflows/claude-review.yml"  "ci: añadir Claude Code Review Action"
upload ".github/workflows/claude-issues.yml"  "$(dirname $0)/portfolio-ander/.github/workflows/claude-issues.yml"  "ci: añadir Claude on Issues Action"

echo ""
echo "✨ ¡Listo! Comprueba el repo: https://github.com/$REPO"
echo ""
echo "Próximos pasos:"
echo "  1. Crear rama develop en GitHub"
echo "  2. Proteger la rama main (Settings → Branches)"
echo "  3. Obtener API keys: Gemini (aistudio.google.com) y Groq (console.groq.com)"
echo "  4. Ejecutar: npx create-next-app@latest portfolio-web"
