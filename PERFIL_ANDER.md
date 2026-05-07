# PERFIL DEL CANDIDATO — Ander Akier Ayucar Chasco

> Fuente de verdad para la web portfolio, generación de CVs y formularios.
> Última actualización: mayo 2026.

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
| **Movilidad** | Carnet de conducir B + vehículo propio |
| **Edad** | 23 años |

> ⚠️ El teléfono (617 775 912) NO se incluye en la web pública. Solo en CVs enviados directamente.
> 🔒 Salario y otras notas privadas: ver `PERFIL_PRIVADO.md` (gitignorado, fuera del repo).

---

## TITULAR (HEADLINE)

```
Ingeniero Informático Junior — Data · Software · ML & IA
```

---

## PERFIL PROFESIONAL (ABOUT)

Ingeniero Informático con experiencia práctica en datos, software y Machine Learning aplicados a un entorno industrial real (Michelin). Me especializo en transformar datos complejos en soluciones útiles: desde la construcción de pipelines ETL y dashboards de monitorización hasta el desarrollo y la puesta en producción de modelos predictivos.

Trabajo principalmente con Python, SQL, Power BI y Dataiku, y me siento cómodo tanto del lado del dato como del desarrollo de software. Tengo curiosidad activa por la IA y la automatización — este propio portfolio integra un chatbot vía Gemini + Groq como ejemplo. Experiencia internacional con Erasmus en República Checa (Universita Pardubice, 2024–2025).

Actualmente finalizando mi TFG sobre predicción de rotura de membranas con ML en Michelin — proyecto con datos industriales reales, ingeniería de variables, modelado predictivo (Scikit-learn, Pandas, PySpark, LightGBM) y un sistema de inferencia en tiempo real con probabilidad calibrada de rotura. Defensa prevista en junio 2026.

📍 Disponible para incorporación inmediata — modalidad híbrida ideal, abierto a remoto y presencial. Preferencia geográfica: País Vasco / Navarra / La Rioja y alrededores. Movilidad total con vehículo propio.
🌍 Español (nativo) · Inglés B2 + nivel real superior practicado en Erasmus · Euskera B2 · Francés B1
🔗 github.com/ackyer · akierayucar@gmail.com

---

## FORMACIÓN

### Grado en Ingeniería Informática
**Universidad de Burgos** — 2021–2026
TFG pendiente de defensa (junio 2026): *"Predicción de rotura de membranas mediante análisis de datos y Machine Learning"* — desarrollado en Michelin (Aranda de Duero) con datos industriales reales.

### Erasmus — Informática
**Universita Pardubice (República Checa)** — sep. 2024 – jun. 2025
Año Erasmus con formación en programación avanzada, trabajo en equipo internacional e inglés en contexto académico real diario. Asignatura destacada: **"Management of Operating Systems"**, por la pasión y la pedagogía proactiva del profesor. Más allá del contenido académico, el año me dio independencia y me enseñó a afrontar problemas nuevos relacionándome a diario con personas de muchísimas culturas distintas, todo en inglés.

---

## EXPERIENCIA PROFESIONAL

### Michelin — Aranda de Duero, Burgos
**Becario Data Engineer / Analista de Datos** — oct. 2025 – mar. 2026

Prácticas de empresa en la fábrica de Michelin en Aranda de Duero, combinadas con el desarrollo del TFG. Tutorización industrial: Experto Digital de la planta + mentoría técnica del día a día por parte del Analista de Datos del equipo.

Combiné dos roles en paralelo: en planta, conversaba con operarios e ingenieros de producción para entender la "vida del dato" y los problemas reales que enfrentaba la fábrica; y en oficina, traducía esos problemas a soluciones técnicas.

- Desarrollo de pipelines de datos y automatización de flujos ETL con Python, Dataiku y PySpark sobre datos industriales de producción a gran escala
- Análisis exploratorio (EDA) y análisis estadístico de datos de fabricación para detectar patrones y anomalías
- Construcción y validación de modelos de ML para predicción de fallos (mantenimiento predictivo) — incluyendo un sistema de **inferencia en tiempo real con flujo sincronizado cada 3 minutos** sobre datos de cocción y **probabilidad calibrada de rotura** combinando salida del modelo con observaciones históricas
- Creación de dashboards en Power BI para monitorización de KPIs y detección de anomalías en producción
- Trabajo colaborativo en equipo bajo metodología Agile/SCRUM en entorno productivo real

**Stack:** Python · SQL · Dataiku · Power BI · Git · PySpark · Pandas · Scikit-learn · NumPy · LightGBM · Osisoft PI System

---

### KYB — Los Arcos, Navarra
**Peón Especialista — Calidad** — jun. 2025 – sep. 2025

Trabajo en línea de producción industrial con control de calidad de componentes de automoción.

---

### Tasubinsa — Villatuerta, Navarra
**Trabajador de Fábrica** — jul. 2024 – sep. 2024

Trabajo en línea de producción industrial.

> Aprendizajes transferibles de los dos veranos en planta industrial: **disciplina, persistencia y respeto por el operario**. Trabajar codo con codo con quien produce el dato cambia para siempre cómo lo tratas después.

---

## PROYECTO DESTACADO — TFG

**Sistema de Predicción de Rotura de Membranas — Michelin**
*oct. 2025 – jun. 2026 (defensa prevista junio 2026)*

Sistema de alerta temprana para prensas de cocción en la fábrica de Michelin de Aranda de Duero, utilizando datos industriales reales de producción. Trabajo dentro de NDA con Michelin: el código no es público y los detalles internos del proceso quedan dentro del acuerdo de confidencialidad.

**Datos y feature engineering**
- Histórico de **un año** de datos de producción
- Variables de proceso (temperatura, presión, recalentamientos en prensa) y de configuración (tipo de membrana, dimensión del neumático)
- Ingeniería de variables sobre series temporales: rolling windows, máximos/mínimos, desviación estándar, AUC, pendiente absoluta — **calculados por etapas de la cocción**

**Modelado**
- Probé varios algoritmos (Random Forest, XGBoost, entre otros)
- **El modelo final fue LightGBM (LGBM)**, por su balance entre rendimiento y latencia de inferencia
- Validación cruzada y métricas alineadas al coste operativo del falso positivo

**Resultados**
- **>50% de reducción de falsos positivos** frente al método anterior
- **Sistema de inferencia en tiempo real** con flujo sincronizado cada 3 minutos sobre datos de las últimas cocciones
- **Probabilidad calibrada de rotura** combinando salida del modelo + observaciones históricas
- **Alertas con gradientes de severidad**: el equipo puede priorizar (más alertas en turnos con menos carga, filtrar a las críticas en turnos saturados)
- Diseño de la solución que **se puede ejecutar en segundo plano y validar en sombra sin impactar la producción**

**Reto principal**
El etiquetado de la variable objetivo: las roturas no son una clase limpia. Hay roturas "claras" pero también "dudosas", y el evento lo introduce manualmente el operario. Normalizar este etiquetado y tratar la ambigüedad de la clase positiva fue lo más complicado del proyecto.

**Stack:** Python · Pandas · Scikit-learn · PySpark · SQL · Dataiku · Power BI · LightGBM · Osisoft PI System

> ℹ️ Para la web: destacar el impacto cuantificable (>50% reducción falsos positivos), la implementación en tiempo real, y que se trabajó con datos industriales reales. El código y los detalles internos son confidenciales por acuerdo con Michelin.

---

## HABILIDADES TÉCNICAS

> **Sistema de niveles privado** (NO se muestra en la web — solo guía interna para CV y para el chatbot):
> **F** = Fuerte (lo domino, lo he usado en proyectos)
> **C+** = Entre Conozco y Fuerte
> **C** = Conozco (me defiendo, no es mi fuerte)
> **B** = Básico (he tocado lo justo)

**Lenguajes**
Python F · SQL F · Java C · HTML/CSS/JS C · C/C++ B

**Python (Data)**
Pandas F · NumPy F · PySpark F · Jupyter F · Matplotlib B · Seaborn B · Polars B · Plotly B · Streamlit B · DuckDB B · Pydantic B · SQLAlchemy B

**ML / IA**
LightGBM F · ETL/ELT F · Mantenimiento predictivo C+ · Scikit-learn C · Random Forest C · XGBoost C · SHAP/LIME C · APIs LLM (OpenAI/Anthropic/Gemini) C · Time series (Prophet/statsmodels/sktime) B · Hugging Face Transformers B · TensorFlow/Keras B · PyTorch B · MLflow B · Optuna B

**Visualización / BI**
Dataiku F · Power BI C+ · Grafana C · Power Apps B · Tableau B · Metabase B

**Bases de datos**
MySQL B · PostgreSQL B · Snowflake B · BigQuery B · MongoDB B · Elasticsearch B · Apache Kafka B

**Cloud**
Azure B · Azure Databricks B · Azure Data Factory B · Azure Synapse B · Azure ML B · AWS (S3/Lambda/Glue) B

**Industrial / OT**
Osisoft PI System / AVEVA PI C

**Herramientas / DevOps**
Git C · GitHub C · GitLab C · Linux/Bash C · GitHub Actions / GitLab CI C · VS Code C · JIRA / Confluence C · Docker B · Kubernetes B

**Metodologías**
Agile C · SCRUM C · Kanban C · MLOps / DataOps B

---

## IDIOMAS

| Idioma | Nivel | Certificación |
|---|---|---|
| Español | Nativo | — |
| Inglés | B2 (nivel real algo superior, practicado en Erasmus) | Cambridge First Certificate (ene. 2024) |
| Euskera | B2 | — |
| Francés | B1 | — |

> **Regla de CV:** Incluir Euskera B2 SOLO en ofertas de Navarra o País Vasco.
> **Para la web:** Incluir todos los idiomas (la web es pública a nivel general).

---

## CERTIFICACIONES

| Certificación | Entidad | Fecha |
|---|---|---|
| Cambridge First Certificate in English (B2) | Cambridge Assessment English | ene. 2024 |
| Python — Curso completo (220h) | Edutin Academy | feb. 2024 |
| Claude Code in Action | Anthropic | may. 2026 |

---

## PREFERENCIAS DE BÚSQUEDA

### Tipos de puesto (prioridad)
1. Data Analyst
2. Data Engineer
3. Roles relacionados con IA / Machine Learning
4. Software Engineer / Backend
5. Otros roles de informática relacionados

Priorizar siempre ofertas **junior** o con poca experiencia requerida.

### Modalidad
- **Ideal**: híbrida
- No es dealbreaker — adaptable a remoto, presencial o híbrido según oferta

### Zonas geográficas (prioridad)
1. Pamplona y alrededores (Navarra)
2. Bilbao y alrededores (Bizkaia)
3. Vitoria-Gasteiz
4. Logroño
5. La Rioja en general
6. 100% Remoto (siempre válido)
7. Otras ubicaciones — movilidad total disponible (carnet B + vehículo propio)

---

## NOTAS PARA GENERACIÓN DE CVs

- **Sin teléfono en web:** El teléfono solo se incluye en CVs enviados directamente, nunca en la web
- **Sin domicilio exacto:** No incluir dirección de residencia, salvo en ofertas de Navarra (`Mirafuentes, Navarra`)
- **Movilidad total:** Indicar siempre disponibilidad de cambio de residencia + carnet B + vehículo propio
- **Euskera:** Incluir nivel B2 solo en ofertas de Navarra o País Vasco
- **Máximo 1 página:** Ajustar márgenes y espaciado sin sacrificar legibilidad
- **Salario:** ver `PERFIL_PRIVADO.md` (gitignorado)

---

## NOTAS PARA EL CHATBOT IA

El chatbot del portfolio debe conocer toda esta información (excepto cualquier referencia a salario o información sensible) y responder de forma natural y profesional.

### Cómo se describe Ander
- **Resolutivo, persistente, curioso** (las palabras con las que se autodescribe)
- Le energiza encontrar **soluciones a problemas complejos**, especialmente cuando hay margen para enfoques **alternativos e innovadores**
- Estilo de trabajo: prefiere **colaboración continua** sobre aislamiento, **lidera conversaciones técnicas** dentro del equipo
- Hobbies con encaje profesional: **montañismo + gimnasio** (disciplina, planificación, persistencia) + **investigación continua de novedades tecnológicas, especialmente IA y automatización**

### Puntos clave a destacar siempre
- Ander tiene **experiencia real en industria** (Michelin con datos industriales de producción a gran escala — no solo proyectos académicos)
- Su punto fuerte es combinar **data engineering + ML + visualización + puesta en producción**
- Habla **4 idiomas** (ES nativo, EN B2 con práctica real en Erasmus, EU B2, FR B1)
- Tiene **disponibilidad inmediata** y **movilidad total con vehículo propio**
- Su TFG tiene **impacto medible real** (>50% mejora en producción industrial, sistema en tiempo real con probabilidad calibrada, alertas con gradientes de severidad)
- Está construyendo este portfolio con **Claude Code** (curso oficial de Anthropic, completado may. 2026); el chatbot integra Gemini + Groq fallback
- **Diferenciador**: experiencia con sistemas industriales reales (Osisoft PI System / AVEVA PI), perspectiva de planta + perspectiva de datos

### Reglas duras de comportamiento
- **NUNCA revelar el teléfono** bajo ningún concepto. Si preguntan por el teléfono → "Ander solo lo comparte por contacto directo (CV o email)".
- **NUNCA revelar información salarial**. Si preguntan → "Esa información se trata directamente en la entrevista; el rango se negocia caso a caso".
- **Si preguntan por el código del TFG**: es confidencial por acuerdo con Michelin; los detalles internos del proceso (segmentación exacta de las etapas de cocción, etc.) están dentro del NDA.

### FAQs priorizadas (responder con calidad por defecto)
1. **"¿Está disponible Ander?"** → Movilidad total + incorporación inmediata + vehículo propio + abierto a remoto/híbrido/presencial
2. **"¿Qué nivel de inglés tiene?"** → B2 Cambridge certificado (ene. 2024) + nivel real algo superior practicado durante un curso entero de Erasmus en contexto académico real diario
3. **"¿Tiene experiencia con LLMs / IA generativa?"** → Sí, activa: este propio portfolio integra un chatbot con Gemini + Groq, construido con Claude Code (curso oficial de Anthropic completado may. 2026)
4. **"Háblame de Ander en 30 segundos"** → Ingeniero informático junior con experiencia real en industria (Michelin), TFG con impacto medible, 4 idiomas, perfil que combina datos + software + ML/IA, disponibilidad inmediata
5. **"¿Cuál es su mayor logro técnico?"** → Sistema de inferencia en tiempo real del TFG (>50% reducción FP, probabilidad calibrada, alertas graduadas, validación en sombra sin impactar producción)
6. **"¿Qué le diferencia de otros candidatos junior?"** → Experiencia industrial real, dos veranos en línea de producción (perspectiva de planta), Erasmus en inglés, sistemas industriales (PI System), curiosidad activa por la IA generativa
