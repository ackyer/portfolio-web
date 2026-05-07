// Profile content for AI assistant. Phone number stripped for privacy — see PERFIL_ANDER.md for full source.
// Salary information is intentionally NOT included here — it lives in PERFIL_PRIVADO.md (gitignored).

// Defense-in-depth: redact any Spanish mobile-shaped number (9 digits starting with 6/7,
// optionally separated by spaces, dots or hyphens). The RAW_PROFILE below is already
// authored without any phone; this runtime sweep is a safety net against future drift.
function stripPhones(raw: string): string {
  const spanishMobile = /\b[67](?:[\s.\-]?\d){8}\b/g;
  return raw.replace(spanishMobile, "[redacted]");
}

// Defense-in-depth: redact any number followed by salary indicators (€, k, brut, neto, anual, etc.).
// The RAW_PROFILE below is authored without salary mentions; this is a safety net only.
function stripSalary(raw: string): string {
  const salaryPattern = /\b\d{1,3}(?:[.\s]?\d{3})*(?:[.,]\d+)?\s*(?:€|EUR|k\s*€|k\s*EUR|brut[oa]s?|net[oa]s?|anual(?:es)?|salari)/gi;
  return raw.replace(salaryPattern, "[redacted-salary]");
}

const RAW_PROFILE = `
# PERFIL DEL CANDIDATO — Ander Akier Ayucar Chasco

## DATOS DE CONTACTO

- Nombre completo: Ander Akier Ayucar Chasco
- Email: akierayucar@gmail.com
- LinkedIn: www.linkedin.com/in/anderakierayucar
- GitHub: github.com/ackyer
- Ubicación en perfil: Navarra, España
- Disponibilidad: Inmediata — movilidad total — abierto a remoto
- Movilidad: Carnet de conducir B + vehículo propio
- Edad: 23 años

## TITULAR

Ingeniero Informático Junior — Data · Software · ML & IA

## PERFIL PROFESIONAL

Ingeniero Informático con experiencia práctica en datos, software y Machine Learning aplicados a un entorno industrial real (Michelin). Especializado en transformar datos complejos en soluciones útiles: pipelines ETL, dashboards de monitorización y desarrollo + puesta en producción de modelos predictivos.

Trabaja principalmente con Python, SQL, Power BI y Dataiku. Cómodo tanto del lado del dato como del desarrollo de software. Curiosidad activa por la IA y la automatización — este propio portfolio integra un chatbot vía Gemini + Groq como ejemplo. Experiencia internacional con Erasmus en República Checa (Universita Pardubice, 2024–2025).

Actualmente finalizando el TFG sobre predicción de rotura de membranas con ML en Michelin — datos industriales reales, ingeniería de variables, modelado predictivo (Scikit-learn, Pandas, PySpark, LightGBM) y un sistema de inferencia en tiempo real con probabilidad calibrada de rotura. Defensa prevista en junio 2026.

## FORMACIÓN

### Grado en Ingeniería Informática
Universidad de Burgos — 2021–2026
TFG pendiente de defensa (junio 2026): "Predicción de rotura de membranas mediante análisis de datos y Machine Learning" — desarrollado en Michelin (Aranda de Duero) con datos industriales reales.

### Erasmus — Informática
Universita Pardubice (República Checa) — sep. 2024 – jun. 2025
Año Erasmus con formación en programación avanzada, trabajo en equipo internacional e inglés en contexto académico real diario. Asignatura destacada: "Management of Operating Systems", por la pasión y la pedagogía proactiva del profesor. El año le dio independencia y le enseñó a afrontar problemas nuevos relacionándose a diario con personas de muchísimas culturas distintas, todo en inglés.

## EXPERIENCIA PROFESIONAL

### Michelin — Aranda de Duero, Burgos
Becario Data Engineer / Analista de Datos — oct. 2025 – mar. 2026

Prácticas en la fábrica de Michelin combinadas con el desarrollo del TFG. Tutorización industrial: Experto Digital de la planta + mentoría técnica diaria del Analista de Datos del equipo.

Combina dos roles en paralelo: en planta, conversa con operarios e ingenieros de producción para entender la "vida del dato" y los problemas reales; en oficina, traduce esos problemas a soluciones técnicas.

- Pipelines ETL con Python, Dataiku y PySpark sobre datos industriales de producción a gran escala
- EDA y análisis estadístico de datos de fabricación para detectar patrones y anomalías
- Modelos de ML para mantenimiento predictivo, incluyendo el ciclo end-to-end: entrenamiento, validación y diseño de la puesta en producción (prácticas de MLOps) con un sistema de inferencia en tiempo real con flujo sincronizado cada 3 minutos y probabilidad calibrada de rotura
- Dashboards en Power BI para monitorización de KPIs y detección de anomalías
- Trabajo Agile/SCRUM en entorno productivo real

Stack: Python · SQL · Dataiku · Power BI · Git · PySpark · Pandas · Scikit-learn · NumPy · LightGBM · Osisoft PI System · MLOps

### KYB — Los Arcos, Navarra
Peón Especialista — Calidad — jun. 2025 – sep. 2025
Línea de producción industrial con control de calidad de componentes de automoción.

### Tasubinsa — Villatuerta, Navarra
Trabajador de Fábrica — jul. 2024 – sep. 2024
Línea de producción industrial.

Aprendizajes transferibles de los dos veranos en planta industrial: disciplina, persistencia y respeto por el operario. Trabajar codo con codo con quien produce el dato cambia para siempre cómo lo tratas después.

## PROYECTO DESTACADO — TFG

Sistema de Predicción de Rotura de Membranas — Michelin (oct. 2025 – jun. 2026, defensa prevista junio 2026).

Sistema de alerta temprana para prensas de cocción en la fábrica de Michelin de Aranda de Duero, utilizando un año de datos industriales reales. Trabajo bajo NDA con Michelin: el código no es público y los detalles internos del proceso quedan dentro del acuerdo de confidencialidad.

Datos y feature engineering:
- Histórico de un año de datos de producción
- Variables de proceso (temperatura, presión, recalentamientos en prensa) y de configuración (tipo de membrana, dimensión del neumático)
- Ingeniería de variables sobre series temporales: rolling windows, máximos/mínimos, desviación estándar, AUC, pendiente absoluta — calculados por etapas de la cocción

Modelado:
- Probó varios algoritmos (Random Forest, XGBoost, entre otros)
- El modelo final fue LightGBM (LGBM), por su balance entre rendimiento y latencia de inferencia
- Validación cruzada y métricas alineadas al coste operativo del falso positivo

Resultados:
- >50% de reducción de falsos positivos frente al método anterior
- Sistema de inferencia en tiempo real con flujo sincronizado cada 3 minutos
- Probabilidad calibrada de rotura combinando salida del modelo + observaciones históricas
- Alertas con gradientes de severidad (más alertas en turnos con menos carga, filtrar a las críticas en turnos saturados)
- Diseño que se puede ejecutar en segundo plano y validar en sombra sin impactar la producción

Reto principal: el etiquetado de la variable objetivo. Las roturas no son una clase limpia (claras vs. dudosas, introducidas manualmente por el operario). Normalizar este etiquetado y tratar la ambigüedad de la clase positiva fue lo más complicado del proyecto.

Stack: Python · Pandas · Scikit-learn · PySpark · SQL · Dataiku · Power BI · LightGBM · Osisoft PI System

## HABILIDADES TÉCNICAS (con niveles privados — usar para calibrar respuestas)

Niveles: F = Fuerte, C+ = Entre Conozco y Fuerte, C = Conozco, B = Básico.

Lenguajes: Python F · SQL F · Java C · HTML/CSS/JS C · C/C++ B
Python (Data): Pandas F · NumPy F · PySpark F · Jupyter F · Matplotlib B · Seaborn B · Polars B · Plotly B · Streamlit B · DuckDB B · Pydantic B · SQLAlchemy B
ML / IA: LightGBM F · ETL/ELT F · Mantenimiento predictivo C+ · Scikit-learn C · Random Forest C · XGBoost C · SHAP/LIME C · APIs LLM (OpenAI/Anthropic/Gemini) C · MLOps C · Time series (Prophet/statsmodels/sktime) B · Hugging Face Transformers B · TensorFlow/Keras B · PyTorch B · MLflow B · Optuna B
Visualización / BI: Dataiku F · Power BI C+ · Grafana C · Power Apps B · Tableau B · Metabase B
Bases de datos: MySQL B · PostgreSQL B · Snowflake B · BigQuery B · MongoDB B · Elasticsearch B · Apache Kafka B
Cloud: Azure B · Azure Databricks B · Azure Data Factory B · Azure Synapse B · Azure ML B · AWS (S3/Lambda/Glue) B
Industrial / OT: Osisoft PI System / AVEVA PI C
Herramientas / DevOps: Git C · GitHub C · GitLab C · Linux/Bash C · GitHub Actions / GitLab CI C · VS Code C · JIRA / Confluence C · Docker B · Kubernetes B
Metodologías: Agile C · SCRUM C · Kanban C · MLOps C · DataOps C

## IDIOMAS

- Español: Nativo
- Inglés: B2 (Cambridge First Certificate, ene. 2024). Nivel real algo superior practicado durante un curso entero de Erasmus en contexto académico real diario.
- Euskera: B2
- Francés: B1

## CERTIFICACIONES

- Cambridge First Certificate in English (B2) — Cambridge Assessment English — ene. 2024
- Python — Curso completo (220h) — Edutin Academy — feb. 2024
- Claude Code in Action — Anthropic — may. 2026 (completado)

## PREFERENCIAS DE BÚSQUEDA

Tipos de puesto (prioridad): 1) Data Analyst, 2) Data Engineer, 3) ML/IA, 4) Software Engineer/Backend, 5) Otros roles de informática. Priorizar siempre ofertas junior.

Modalidad: ideal híbrida; adaptable a remoto, presencial o híbrido (no es dealbreaker).

Zonas geográficas (prioridad): País Vasco, Navarra, La Rioja y alrededores; 100% remoto siempre válido; movilidad total disponible (carnet B + vehículo propio).

## PERSONA PROFESIONAL

- Cómo se autodescribe: resolutivo, persistente, curioso
- Le energiza: encontrar soluciones a problemas complejos, especialmente cuando hay margen para enfoques alternativos e innovadores
- Estilo de trabajo: prefiere colaboración continua sobre aislamiento; lidera conversaciones técnicas dentro del equipo
- Hobbies con encaje profesional: montañismo + gimnasio (disciplina, planificación, persistencia) + investigación continua de novedades tecnológicas, especialmente IA y automatización

## ÁREAS EN DESARROLLO (autoconciencia honesta)

Como ingeniero junior, hay áreas donde tiene **conocimiento sólido pero todavía poca experiencia aplicada**, y las reconoce explícitamente:

- **Redes neuronales / Deep Learning**: tiene base teórica y ha trabajado con frameworks (TensorFlow, Keras, PyTorch a nivel introductorio), pero aún no ha llevado un modelo de DL a producción en un caso real. Su trabajo de ML en Michelin se apoya en gradient boosting (LightGBM) más que en NN.
- **Cloud (Azure, AWS)**: ha usado Azure y Azure Databricks dentro del entorno Michelin, pero a nivel funcional / consumo. AWS lo conoce a nivel introductorio. La arquitectura cloud profunda (IaC, networking, IAM avanzado) es algo que está construyendo.
- **Codebases muy maduros / equipos grandes**: sus contextos hasta ahora han sido proyectos acotados o suyos. Sabe que entrar en un repositorio con años de historia y un equipo de 10+ ingenieros le va a requerir tiempo de adaptación las primeras semanas — lo asume con naturalidad.
- **Tooling moderno de Data que no ha tocado en serio**: Snowflake, Terraform y Airflow/Prefect aparecen mucho en ofertas y prefiere no fingirlos en una entrevista. Los aprenderá el día que el puesto los requiera.

En soft skills, el área que él mismo identifica para mejorar es **saber cuándo poner stop a un problema técnico**. Su persistencia es uno de sus puntos fuertes, pero ocasionalmente se traduce en seguir empujando una solución cuando el coste-beneficio ya no la justifica. Es consciente y trabaja en ello.

## PUNTOS CLAVE PARA EL CHATBOT

- Experiencia REAL en industria (Michelin con datos industriales de producción a gran escala — no solo proyectos académicos)
- Punto fuerte: combinar data engineering + ML + visualización + puesta en producción
- 4 idiomas (ES nativo, EN B2 con práctica real en Erasmus, EU B2, FR B1)
- Disponibilidad inmediata + movilidad total con vehículo propio
- TFG con impacto medible real (>50% mejora en producción industrial, sistema en tiempo real con probabilidad calibrada, alertas con gradientes de severidad)
- Construye este portfolio con Claude Code (curso oficial de Anthropic, completado may. 2026); el chatbot integra Gemini + Groq fallback
- Diferenciador: experiencia con sistemas industriales reales (Osisoft PI System / AVEVA PI), perspectiva de planta + perspectiva de datos
`;

export const PROFILE_CONTENT: string = stripSalary(stripPhones(RAW_PROFILE));
