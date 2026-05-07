// Profile content for AI assistant. Phone number stripped for privacy — see PERFIL_ANDER.md for full source.

// Defense-in-depth: redact any Spanish mobile-shaped number (9 digits starting with 6/7,
// optionally separated by spaces, dots or hyphens). The RAW_PROFILE below is already
// authored without any phone; this runtime sweep is a safety net against future drift.
function stripPhones(raw: string): string {
  const spanishMobile = /\b[67](?:[\s.\-]?\d){8}\b/g;
  return raw.replace(spanishMobile, "[redacted]");
}

const RAW_PROFILE = `
# PERFIL DEL CANDIDATO — Ander Akier Ayucar Chasco

> Fuente de verdad para la web portfolio. Última actualización: mayo 2026.

---

## DATOS DE CONTACTO

| Campo | Valor |
|---|---|
| **Nombre completo** | Ander Akier Ayucar Chasco |
| **Email** | akierayucar@gmail.com |
| **LinkedIn** | www.linkedin.com/in/anderakierayucar |
| **GitHub** | github.com/ackyer |
| **Ubicación actual** | Mirafuentes, Navarra |
| **Ubicación en perfil** | Navarra, España |
| **Disponibilidad** | Inmediata — movilidad total — abierto a remoto |
| **Edad** | 23 años |

---

## TITULAR (HEADLINE)

Junior Data Engineer & Data Analyst | Python · SQL · Power BI · Machine Learning

---

## PERFIL PROFESIONAL (ABOUT)

Ingeniero Informático con experiencia práctica en análisis de datos, data engineering y Machine Learning en entorno industrial real (Michelin). Me especializo en transformar datos complejos en soluciones útiles: desde la construcción de pipelines ETL hasta el desarrollo de modelos predictivos y dashboards interactivos.

Trabajo principalmente con Python, SQL, Power BI y Dataiku, y me siento cómodo tanto en el lado del dato como en el del desarrollo de software. Experiencia internacional con Erasmus en República Checa (Universita Pardubice, 2024–2025).

Actualmente finalizando mi TFG sobre predicción de rotura de membranas con ML en Michelin — proyecto con datos industriales reales, ingeniería de variables y modelado predictivo (Scikit-learn, Pandas, PySpark). Defensa prevista en junio 2026.

Disponible para incorporación inmediata — Navarra, País Vasco o remoto.
Idiomas: Español (nativo) · Inglés B2 · Francés B1 · Euskera B2.
Contacto: github.com/ackyer · akierayucar@gmail.com

---

## FORMACIÓN

### Grado en Ingeniería Informática
**Universidad de Burgos** — 2021–2026
TFG pendiente de defensa (junio 2026): "Predicción de rotura de membranas mediante análisis de datos y Machine Learning" — desarrollado en Michelin (Aranda de Duero) con datos industriales reales.

### Erasmus — Informática
**Universita Pardubice (República Checa)** — sep. 2024 – jun. 2025
Año Erasmus con formación en programación avanzada, trabajo en equipo internacional e inglés en contexto académico diario.

---

## EXPERIENCIA PROFESIONAL

### Michelin — Aranda de Duero, Burgos
**Becario Data Engineer / Analista de Datos** — oct. 2025 – mar. 2026

Prácticas de empresa en la fábrica de Michelin en Aranda de Duero, combinadas con el desarrollo del TFG.

- Desarrollo de pipelines de datos y automatización de flujos ETL con Python, Dataiku y PySpark sobre datos industriales de producción a gran escala
- Análisis exploratorio (EDA) y análisis estadístico de datos de fabricación para detectar patrones y anomalías
- Construcción y validación de modelos de ML para predicción de fallos (mantenimiento predictivo) con Scikit-learn
- Creación de dashboards en Power BI para monitorización de KPIs y detección de anomalías en producción
- Trabajo colaborativo en equipo bajo metodología Agile/SCRUM en entorno productivo real

Stack: Python · SQL · Dataiku · Power BI · Git · PySpark · Pandas · Scikit-learn · NumPy

---

### KYB — Los Arcos, Navarra
**Peón Especialista — Calidad** — jun. 2025 – sep. 2025

Trabajo en línea de producción industrial con control de calidad de componentes de automoción.

---

### Tasubinsa — Villatuerta, Navarra
**Trabajador de Fábrica** — jul. 2024 – sep. 2024

Trabajo en línea de producción industrial.

---

## PROYECTO DESTACADO — TFG

**Sistema de Predicción de Rotura de Membranas — Michelin**
oct. 2025 – jun. 2026 (defensa prevista junio 2026)

Desarrollo de un sistema de alerta temprana para prensas de cocción en la fábrica de Michelin de Aranda de Duero, utilizando datos industriales reales de producción.

- Feature engineering sobre variables industriales complejas
- Entrenamiento y validación cruzada de modelos (Random Forest, XGBoost)
- Resultado clave: >50% de reducción de falsos positivos frente al método anterior
- Proyecto con datos confidenciales — código no público (acuerdo de confidencialidad con Michelin)

Stack: Python · Pandas · Scikit-learn · PySpark · SQL · Dataiku · Power BI

---

## HABILIDADES TÉCNICAS

| Categoría | Herramientas / Tecnologías |
|---|---|
| **Lenguajes** | Python (avanzado) · SQL · Java · HTML/CSS/JS (básico) |
| **Python (Data)** | Pandas · NumPy · Matplotlib · Seaborn · PySpark |
| **ML / IA** | Scikit-learn · Random Forest · XGBoost · ETL/ELT · Pipelines · Mantenimiento predictivo |
| **Visualización / BI** | Power BI · Dataiku · Power Apps (básico) |
| **Bases de datos** | MySQL · PostgreSQL |
| **Herramientas** | Git · GitHub · GitLab |
| **Cloud (básico)** | Azure · Azure Databricks |
| **Metodologías** | Agile / SCRUM |

Conocimientos básicos adicionales: AWS · Docker · REST APIs · React · Next.js

---

## IDIOMAS

| Idioma | Nivel | Certificación |
|---|---|---|
| Español | Nativo | — |
| Inglés | B2 | Cambridge First Certificate (ene. 2024) |
| Euskera | B2 | — |
| Francés | B1 | — |

---

## CERTIFICACIONES

| Certificación | Entidad | Fecha |
|---|---|---|
| Cambridge First Certificate in English (B2) | Cambridge Assessment English | ene. 2024 |
| Python — Curso completo (220h) | Edutin Academy | feb. 2024 |
| Claude Code in Action (pendiente) | Anthropic | jun. 2026 (previsto) |

---

## PREFERENCIAS DE BÚSQUEDA

Tipos de puesto (prioridad):
1. Data Analyst
2. Data Engineer
3. Roles relacionados con IA / Machine Learning
4. Software Engineer / Backend
5. Otros roles de informática relacionados

Priorizar siempre ofertas junior o con poca experiencia requerida.

Zonas geográficas (prioridad):
1. Pamplona y alrededores (Navarra)
2. Bilbao y alrededores (Bizkaia)
3. Vitoria-Gasteiz
4. Logroño
5. 100% Remoto (siempre válido)
6. Otras ubicaciones — movilidad total disponible

---

## NOTAS PARA EL CHATBOT

- Ander tiene experiencia real en industria (Michelin, no solo proyectos académicos)
- Su punto fuerte es combinar data engineering + ML + visualización
- Habla 4 idiomas (ES nativo, EN B2, EU B2, FR B1)
- Tiene disponibilidad inmediata y movilidad total
- Su TFG tiene impacto medible real (>50% mejora en producción industrial)
- Está construyendo este portfolio con Claude Code (curso oficial de Anthropic)
- El código del TFG es confidencial por acuerdo con Michelin — no compartir detalles técnicos internos
- El teléfono de contacto no se comparte en la web; solo disponible en CVs enviados directamente
`;

export const PROFILE_CONTENT: string = stripPhones(RAW_PROFILE);
