import { atlasData } from "./data.js";
import { exportMemory, getAllRecords, getRecord, replaceAllRecords, saveRecord, validateMemory } from "./storage.js";

const main = document.querySelector("main");
const breadcrumb = document.querySelector("#breadcrumb");
const toast = document.querySelector("#toast");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector("#menu-button");
const themeButton = document.querySelector("#theme-button");
const helpButton = document.querySelector("#help-button");
const memoryHelpButton = document.querySelector("#memory-help");
const onboardingDialog = document.querySelector("#onboarding-dialog");
const onboardingClose = document.querySelector("#onboarding-close");
const onboardingStart = document.querySelector("#onboarding-start");
const onboardingDismiss = document.querySelector("#onboarding-dismiss");
const helpDialog = document.querySelector("#help-dialog");
const helpDialogClose = document.querySelector("#help-dialog-close");
const helpDialogEyebrow = document.querySelector("#help-dialog-eyebrow");
const helpDialogTitle = document.querySelector("#help-dialog-title");
const helpDialogIntro = document.querySelector("#help-dialog-intro");
const helpDialogSteps = document.querySelector("#help-dialog-steps");
const ONBOARDING_KEY = "atlas-onboarding-seen-v1";
let toastTimer;
let currentHelpTopic = "home";

const HELP_CONTENT = {
  home: {
    eyebrow: "Inicio",
    title: "Elegí una herramienta según lo que necesitás hacer",
    intro: "No hace falta recorrer el Atlas completo. Cada acceso abre un camino distinto de estudio.",
    steps: ["Materia: ubicarte en la cursada y elegir una unidad.", "Glosario: aclarar un concepto y recorrer sus relaciones.", "Actividades: practicar una operación concreta.", "Biblioteca: volver a programas, textos, guías y fuentes."]
  },
  subject: {
    eyebrow: "Materia",
    title: "Primero elegí una unidad; después, una lectura",
    intro: "Las unidades están plegadas para que el programa no aparezca entero de una vez. La unidad en cursada se abre primero.",
    steps: ["Abrí la unidad que quieras estudiar.", "Elegí “Estudiar en el Atlas” cuando haya una ficha navegable.", "Usá “Abrir texto” para volver a la fuente original."]
  },
  glossary: {
    eyebrow: "Glosario",
    title: "Buscá por bloque y abrí sólo el concepto necesario",
    intro: "Los conceptos están agrupados por su ubicación curricular. La definición completa aparece recién al entrar.",
    steps: ["Elegí una unidad o bloque.", "Abrí el concepto que te esté trabando.", "Compará programa, autor, reconstrucción y crítica sin confundir sus procedencias."]
  },
  activities: {
    eyebrow: "Actividades",
    title: "Elegí qué operación querés practicar",
    intro: "Las actividades se agrupan por capacidad, no por puntos ni consumo de pantallas.",
    steps: ["Comprender reconstruye un argumento.", "Relacionar conecta conceptos o autores.", "Discutir formula objeciones; Producir transforma lo estudiado en una elaboración."]
  },
  library: {
    eyebrow: "Biblioteca",
    title: "Volvé a la fuente que necesitás",
    intro: "Los materiales están separados por función para evitar una lista única y extensa.",
    steps: ["Fuentes de la cátedra: programa, cronograma, compendio y guía.", "Guías y resúmenes: apoyos para estudiar.", "Carpetas y método: organización documental del recorrido."]
  },
  reading: {
    eyebrow: "Lectura",
    title: "Reconstruí el argumento antes de evaluarlo",
    intro: "La pregunta y la tesis orientan. El desarrollo se abre por apartados para leerlo a tu ritmo.",
    steps: ["Leé la pregunta central.", "Contrastá la tesis reconstruida con el texto original.", "Abrí los apartados, conceptos o actividades sólo cuando los necesites."]
  },
  concept: {
    eyebrow: "Concepto",
    title: "Una palabra puede cambiar según su procedencia",
    intro: "La orientación breve no funciona como definición definitiva.",
    steps: ["Partí de la explicación inicial.", "Abrí cada capa para distinguir programa, autor, reconstrucción y crítica.", "Volvé a los textos relacionados antes de atribuir una tesis."]
  },
  activity: {
    eyebrow: "Actividad",
    title: "Dejá evidencia de una operación concreta",
    intro: "No busques una respuesta perfecta: explicá, relacioná, objetá o producí con lo que comprendiste.",
    steps: ["Leé el propósito y la consigna.", "Desarrollá la respuesta en el espacio privado.", "Marcá un nivel sólo como autoevaluación, no como nota."]
  },
  memory: {
    eyebrow: "Memory Card",
    title: "Tu proceso queda en este dispositivo",
    intro: "Notas, respuestas y niveles no se publican en el Atlas.",
    steps: ["Exportar descarga un archivo JSON de respaldo.", "Importar recupera ese archivo en otro navegador o dispositivo.", "Ningún dato se publica automáticamente."]
  }
};

const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function routeParts() {
  return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
}

function currentRouteName(parts) {
  if (!parts.length) return "home";
  if (["glosario", "concepto"].includes(parts[0])) return "glossary";
  if (["actividades", "actividad"].includes(parts[0])) return "activities";
  if (parts[0] === "biblioteca") return "library";
  return "subject";
}

function setChrome(label, routeName, helpTopic = routeName) {
  breadcrumb.textContent = label;
  currentHelpTopic = helpTopic;
  helpButton.dataset.tooltip = `Ayuda: ${label}`;
  document.querySelectorAll("[data-route]").forEach(link => {
    if (link.dataset.route === routeName) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  sidebar.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function animatePageIn() {
  main.classList.remove("is-entering");
  void main.offsetWidth;
  main.classList.add("is-entering");
}

function openHelp(topic = currentHelpTopic) {
  const content = HELP_CONTENT[topic] || HELP_CONTENT.home;
  helpDialogEyebrow.textContent = content.eyebrow;
  helpDialogTitle.textContent = content.title;
  helpDialogIntro.textContent = content.intro;
  helpDialogSteps.innerHTML = content.steps.map(step => `<li>${step}</li>`).join("");
  if (typeof helpDialog.showModal === "function") helpDialog.showModal();
  else helpDialog.setAttribute("open", "");
}

function closeHelp() {
  if (typeof helpDialog.close === "function") helpDialog.close();
  else helpDialog.removeAttribute("open");
}

function toolCard({ href, topic, icon, title, description }) {
  return `<article class="tool-card"><a class="tool-card-link" href="${href}"><span class="intent-icon" aria-hidden="true">${icon}</span><span><strong>${title}</strong><small>${description}</small></span><span aria-hidden="true">→</span></a><button class="mini-help" type="button" data-help-topic="${topic}" data-tooltip="Cómo se usa" aria-label="Ayuda sobre ${title}">?</button></article>`;
}

function openOnboarding() {
  if (typeof onboardingDialog.showModal === "function") onboardingDialog.showModal();
  else onboardingDialog.setAttribute("open", "");
}

function closeOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, "true");
  if (typeof onboardingDialog.close === "function") onboardingDialog.close();
  else onboardingDialog.removeAttribute("open");
}

async function renderHome() {
  const records = await getAllRecords();
  const workedRecords = records.filter(record => record.level > 0).length;
  setChrome("Mi recorrido", "home");
  main.innerHTML = `
    <section class="hero home-hero">
      <p class="eyebrow">Atlas personal de Ciencia Política</p>
      <h1>¿Qué necesitás estudiar hoy?</h1>
      <p class="lead">Elegí una herramienta. El contenido completo aparece recién cuando lo necesitás.</p>
      <div class="hero-actions">
        <a class="button" href="#/materia/economia-politica-i">Continuar Economía Política I</a>
        <button class="button button-ghost" type="button" data-open-guide><span aria-hidden="true">?</span> Guía inicial</button>
      </div>
    </section>

    <section aria-labelledby="start-title">
      <div class="section-heading compact"><div><p class="eyebrow">Herramientas</p><h2 id="start-title">Entrá por la acción</h2></div></div>
      <div class="tool-grid">
        ${toolCard({ href: "#/materia/economia-politica-i", topic: "subject", icon: "1", title: "Seguir la materia", description: "Elegir unidad y lectura." })}
        ${toolCard({ href: "#/glosario", topic: "glossary", icon: "2", title: "Buscar un concepto", description: "Aclarar y relacionar." })}
        ${toolCard({ href: "#/actividades", topic: "activities", icon: "3", title: "Practicar", description: "Comprender, discutir o producir." })}
        ${toolCard({ href: "#/biblioteca", topic: "library", icon: "4", title: "Abrir fuentes", description: "Volver a textos y materiales." })}
      </div>
    </section>

    <details class="progressive-section home-status">
      <summary><span><strong>Mi recorrido</strong><small>Estado, próximo paso y memoria local</small></span><span aria-hidden="true">⌄</span></summary>
      <div class="progressive-content card-grid" aria-label="Estado del recorrido">
        <article class="card wide">
          <div class="card-topline"><div><p class="eyebrow">Materia activa</p><h2>${atlasData.subject.name}</h2></div><span class="tag source">${atlasData.subject.year}</span></div>
          <div class="metric-row"><div><strong>${workedRecords}</strong><span>contenidos trabajados</span></div><div><strong>${records.length}</strong><span>registros privados</span></div></div>
          <p class="metric-note">Los niveles orientan el próximo paso; no son una nota.</p>
        </article>
        <article class="card">
          <p class="eyebrow">Próximo paso</p><h3>Integrar lo estudiado</h3>
          <a class="button-text" href="#/actividad/tpe-unidades-1-2">Abrir ensayo de integración →</a>
        </article>
      </div>
    </details>`;
}

function renderSubject() {
  const subject = atlasData.subject;
  const bibliographyCount = subject.units.reduce((sum, unit) => sum + unit.bibliography.length, 0);
  setChrome(`Materias / ${subject.name}`, "subject");
  const units = subject.units.map(unit => `
    <details class="progressive-section unit-block" ${unit.statusKind === "current" ? "open" : ""}>
      <summary><span class="unit-summary"><span class="unit-number">${unit.number}</span><span><strong>${unit.title}</strong><small>${unit.bibliography.length} lecturas</small></span></span><span class="tag status-${unit.statusKind}">${unit.status}</span><span aria-hidden="true">⌄</span></summary>
      <div class="progressive-content">
        <p class="unit-question">${unit.question}</p>
        <div class="catalog-actions unit-actions"><a class="button button-small button-ghost" href="${unit.guideUrl}" target="_blank" rel="noreferrer">Guía ↗</a>${unit.summaryUrl ? `<a class="button button-small button-ghost" href="${unit.summaryUrl}" target="_blank" rel="noreferrer">Resumen ↗</a>` : ""}</div>
        <div class="catalog-list">
        ${unit.bibliography.map(item => `
          <article class="catalog-item">
            <div><p class="catalog-author">${item.author}</p><h3>${item.title}</h3><p class="muted">${item.reference} · ${item.pages}</p></div>
            <div class="catalog-actions">${item.available ? `<a class="button button-small" href="#/lectura/${item.id}">Estudiar</a>` : `<span class="tag">En el compendio</span>`}<a class="button button-small button-ghost" href="${subject.compendiumUrl}" target="_blank" rel="noreferrer">Abrir texto ↗</a></div>
          </article>`).join("")}
        </div>
      </div>
    </details>`).join("");
  main.innerHTML = `
    <section class="hero compact-hero"><p class="eyebrow">${subject.institution} · ${subject.year}</p><h1>${subject.name}</h1><p class="lead">Elegí una unidad para ver sus lecturas. La unidad en cursada está abierta.</p></section>
    <div class="current-focus"><span class="tag status-current">Ahora</span><span><strong>Unidad 3 · Los fundamentos del valor</strong><small>Semana de exámenes del 21 al 25 de septiembre; las fechas son provisorias.</small></span></div>
    <details class="progressive-section subject-about">
      <summary><span><strong>Sobre la materia y sus fuentes</strong><small>${bibliographyCount} lecturas básicas contrastadas con el Programa 2026</small></span><span aria-hidden="true">⌄</span></summary>
      <div class="progressive-content"><p>${subject.question}</p><p class="muted">${subject.description}</p><div class="hero-actions"><a class="button button-small" href="${subject.programUrl}" target="_blank" rel="noreferrer">Programa ↗</a><a class="button button-small button-ghost" href="${subject.scheduleUrl}" target="_blank" rel="noreferrer">Cronograma ↗</a><a class="button button-small button-ghost" href="${subject.compendiumUrl}" target="_blank" rel="noreferrer">Compendio ↗</a></div></div>
    </details>
    <div class="section-heading compact"><div><p class="eyebrow">Recorrido</p><h2>Unidades</h2></div></div>
    ${units}`;
}

function renderGlossary() {
  setChrome("Glosario relacional", "glossary");
  const groups = ["Unidad 1", "Unidad 2", "Unidad 3"];
  const groupedConcepts = groups.map(group => {
    const concepts = Object.values(atlasData.concepts).filter(concept => concept.programLayer.startsWith(group));
    return `<details class="progressive-section concept-group" ${group === "Unidad 3" ? "open" : ""}><summary><span><strong>${group}</strong><small>${concepts.length} conceptos</small></span><span aria-hidden="true">⌄</span></summary><div class="progressive-content compact-link-list">${concepts.map(concept => `<a href="#/concepto/${concept.id}"><strong>${concept.name}</strong><span aria-hidden="true">→</span></a>`).join("")}</div></details>`;
  }).join("");
  main.innerHTML = `<section class="hero compact-hero"><p class="eyebrow">Conceptos en contexto</p><h1>Glosario relacional</h1><p class="lead">Elegí el bloque y después el concepto. Las definiciones completas conservan su procedencia.</p></section>${groupedConcepts}`;
}

function renderActivities() {
  setChrome("Actividades", "activities");
  const operations = ["Comprender", "Relacionar", "Discutir", "Producir"];
  const groups = operations.map(operation => {
    const activities = atlasData.activities.filter(activity => activity.operation === operation);
    return `<details class="progressive-section activity-group"><summary><span><strong>${operation}</strong><small>${activities.length} ${activities.length === 1 ? "actividad" : "actividades"}</small></span><span aria-hidden="true">⌄</span></summary><div class="progressive-content activity-grid">${activities.map(activity => `<article class="activity-card"><div class="meta-line"><span class="tag">${activity.duration}</span></div><h3>${activity.title}</h3><p class="muted">${activity.goal}</p><a class="button-text" href="#/actividad/${activity.id}">Empezar →</a></article>`).join("")}</div></details>`;
  }).join("");
  main.innerHTML = `<section class="hero compact-hero"><p class="eyebrow">Aprender haciendo</p><h1>¿Qué querés practicar?</h1><p class="lead">Elegí una capacidad. Tu respuesta se guarda sólo en este dispositivo.</p></section>${groups}`;
}

function renderLibrary() {
  setChrome("Biblioteca", "library");
  const collections = [
    { title: "Fuentes de la cátedra", kinds: ["Programa", "Cronograma", "Corpus", "Método"] },
    { title: "Guías, resúmenes y apoyos", kinds: ["Unidad 1", "Unidad 2", "Síntesis", "Apoyo"] },
    { title: "Carpetas y gobernanza", kinds: ["Gobernanza", "Carpeta"] }
  ];
  const groups = collections.map((collection, index) => {
    const materials = atlasData.materials.filter(material => collection.kinds.includes(material.kind));
    return `<details class="progressive-section resource-group" ${index === 0 ? "open" : ""}><summary><span><strong>${collection.title}</strong><small>${materials.length} materiales</small></span><span aria-hidden="true">⌄</span></summary><div class="progressive-content resource-grid">${materials.map(material => `<article class="resource-card ${material.url ? "" : "pending"}"><div class="meta-line"><span class="tag source">${material.kind}</span><span class="tag">${material.status}</span></div><h3>${material.title}</h3><p class="muted">${material.description}</p>${material.url ? `<a class="button-text" href="${material.url}" target="_blank" rel="noreferrer">Abrir material ↗</a>` : `<span class="muted">Sin enlace verificable</span>`}</article>`).join("")}</div></details>`;
  }).join("");
  main.innerHTML = `<section class="hero compact-hero"><p class="eyebrow">Acceso y trazabilidad</p><h1>Biblioteca académica</h1><p class="lead">Elegí primero el tipo de material. Los originales permanecen enlazados en Drive.</p></section>${groups}<details class="rights-note"><summary>Criterio documental y de derechos</summary><p>El Atlas publica referencias, rangos de páginas y reconstrucciones propias. No redistribuye los PDF ni presenta los resúmenes como sustitutos de las obras.</p></details>`;
}

function levelPicker(record) {
  return `<div class="level-picker" aria-label="Nivel de elaboración">${atlasData.levels.map(level => `<button type="button" data-level="${level.id}" class="${record.level === level.id ? "active" : record.level > level.id ? "complete" : ""}" title="${level.hint}"><span>${level.id}</span>${level.name}</button>`).join("")}</div>`;
}

function bindWorkspace(kind, id, initialRecord) {
  const textarea = document.querySelector("#personal-note");
  const saveStatus = document.querySelector("#save-status");
  let record = initialRecord;
  let timer;
  async function persist(partial, message = "Guardado en este dispositivo") {
    record = await saveRecord({ ...record, ...partial, id: `${kind}:${id}`, type: kind });
    saveStatus.textContent = message;
    await refreshMemoryCount();
  }
  textarea.addEventListener("input", () => {
    saveStatus.textContent = "Cambios pendientes…";
    clearTimeout(timer);
    timer = setTimeout(() => persist({ note: textarea.value }), 500);
  });
  document.querySelectorAll("[data-level]").forEach(button => button.addEventListener("click", async () => {
    const level = Number(button.dataset.level);
    await persist({ level, note: textarea.value }, `Nivel ${level}: ${atlasData.levels[level - 1].name}`);
    document.querySelectorAll("[data-level]").forEach(item => {
      const value = Number(item.dataset.level);
      item.classList.toggle("active", value === level);
      item.classList.toggle("complete", value < level);
    });
    showToast(`Progreso actualizado: ${atlasData.levels[level - 1].name}`);
  }));
}

async function renderReading(id) {
  const reading = atlasData.readings[id];
  if (!reading) return renderNotFound();
  const record = (await getRecord(`reading:${id}`)) || { id: `reading:${id}`, type: "reading", note: "", level: 0 };
  setChrome(`${atlasData.subject.name} / ${reading.author}`, "subject", "reading");
  const sections = reading.sections.map((section, index) => `<details class="reading-section" ${index === 0 ? "open" : ""}><summary><strong>${section.title}</strong><span aria-hidden="true">⌄</span></summary><div>${section.paragraphs.map(text => `<p>${text}</p>`).join("")}</div></details>`).join("");
  const concepts = reading.relatedConcepts.map(conceptId => `<a class="relation" href="#/concepto/${conceptId}">${atlasData.concepts[conceptId].name}</a>`).join("");
  const activities = reading.relatedActivities.map(activityId => { const activity = atlasData.activities.find(item => item.id === activityId); return `<a class="relation" href="#/actividad/${activityId}">${activity.title}</a>`; }).join("");
  const sources = reading.sourceLinks.map(source => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ↗</a></li>`).join("");
  main.innerHTML = `
    <div class="reading-layout"><article class="reading-body"><div class="meta-line"><span class="tag source">${reading.type}</span><span class="tag reconstruction">${reading.sourceStatus}</span></div><h1>${reading.title}</h1><p class="lead">${reading.author} · ${reading.unit}</p>
      <div class="callout"><p class="eyebrow">Pregunta de lectura</p><p><strong>${reading.centralQuestion}</strong></p></div>
      <div class="prose"><h2>Tesis reconstruida</h2><p>${reading.thesis}</p>${sections}</div>
      <section class="panel"><p class="eyebrow">Seguir navegando</p><h3>Conceptos relacionados</h3><div class="relations">${concepts}</div><h3 style="margin-top:1.2rem">Actividades</h3><div class="relations">${activities}</div></section>
      <section class="study-workspace" aria-labelledby="workspace-title"><p class="eyebrow">Tu memoria académica · privada</p><h2 id="workspace-title">Elaboración personal</h2><p class="muted">Explicá el argumento, registrá una duda o ensayá una objeción. Este texto no se publica ni sale del dispositivo salvo que exportes tu Memory Card.</p>${levelPicker(record)}<label for="personal-note"><strong>¿Qué entendí y qué necesito revisar?</strong></label><textarea id="personal-note" placeholder="Escribí acá…">${escapeHtml(record.note)}</textarea><div class="workspace-footer"><span class="save-status" id="save-status">Guardado local automático</span><span class="tag">Privado</span></div></section>
    </article><aside class="margin-panel" aria-label="Contexto de la lectura"><section class="panel"><p class="eyebrow">Vigilancia epistémica</p><h3>Qué estás leyendo</h3><p class="muted">Una reconstrucción pedagógica basada en materiales de estudio, no el texto original ni una cita del programa.</p></section><section class="panel"><p class="eyebrow">Trazabilidad</p><h3>Fuentes de trabajo</h3><ul class="source-list">${sources}</ul><a class="button-text" href="#/biblioteca">Ver biblioteca →</a></section></aside></div>`;
  bindWorkspace("reading", id, record);
}

async function renderConcept(id) {
  const concept = atlasData.concepts[id];
  if (!concept) return renderNotFound();
  const record = (await getRecord(`concept:${id}`)) || { id: `concept:${id}`, type: "concept", note: "", level: 0 };
  setChrome(`Glosario / ${concept.name}`, "glossary", "concept");
  const readings = concept.readings.map(readingId => `<a class="relation" href="#/lectura/${readingId}">${atlasData.readings[readingId].author} · ${atlasData.readings[readingId].title}</a>`).join("") || `<span class="muted">Consultá la lectura correspondiente desde la materia para abrirla en el compendio.</span>`;
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag reconstruction">Concepto en construcción</span><span class="tag source">Corpus verificado</span></div><h1>${concept.name}</h1><p class="lead">${concept.short}</p></section>
    <section aria-labelledby="layers-title"><p class="eyebrow">Definición estratificada</p><h2 id="layers-title">Abrí una capa por vez</h2><div class="epistemic-stack"><details class="epistemic-layer" open><summary>Programa / cátedra</summary><p>${concept.programLayer}</p></details><details class="epistemic-layer"><summary>Autor / texto</summary><p>${concept.authorLayer}</p></details><details class="epistemic-layer"><summary>Reconstrucción pedagógica</summary><p>${concept.reconstructionLayer}</p></details><details class="epistemic-layer"><summary>Lectura crítica</summary><p>${concept.criticalLayer}</p></details></div></section>
    <section class="card-grid"><article class="card wide"><p class="eyebrow">Relaciones</p><h2>Este concepto conversa con…</h2><div class="relations">${concept.related.map(related => `<a class="relation" href="#/concepto/${related}">${atlasData.concepts[related].name}</a>`).join("")}</div></article><article class="card"><p class="eyebrow">Volver a los textos</p><h3>Argumentos relacionados</h3><div class="relations">${readings}</div></article></section>
    <section class="study-workspace" aria-labelledby="workspace-title"><p class="eyebrow">Tu memoria académica · privada</p><h2 id="workspace-title">Hacer propio el concepto</h2><p><strong>Pregunta de transferencia:</strong> ${concept.personalPrompt}</p>${levelPicker(record)}<label for="personal-note"><strong>Mi definición, ejemplo u objeción</strong></label><textarea id="personal-note" placeholder="Escribí acá…">${escapeHtml(record.note)}</textarea><div class="workspace-footer"><span class="save-status" id="save-status">Guardado local automático</span><span class="tag">Privado</span></div></section>`;
  bindWorkspace("concept", id, record);
}

async function renderActivity(id) {
  const activity = atlasData.activities.find(item => item.id === id);
  if (!activity) return renderNotFound();
  const record = (await getRecord(`activity:${id}`)) || { id: `activity:${id}`, type: "activity", note: "", level: 0 };
  const relatedHref = activity.relatedReading ? `#/lectura/${activity.relatedReading}` : `#/concepto/${activity.relatedConcept}`;
  const relatedLabel = activity.relatedReading ? atlasData.readings[activity.relatedReading].title : atlasData.concepts[activity.relatedConcept].name;
  setChrome(`Actividades / ${activity.title}`, "activities", "activity");
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag question">${activity.operation}</span><span class="tag">${activity.duration}</span></div><h1>${activity.title}</h1><p class="lead">${activity.goal}</p><a class="button-text" href="${relatedHref}">Volver a ${relatedLabel} →</a></section>
    <section class="card full"><p class="eyebrow">Consigna</p><h2>${activity.context}</h2><ol class="step-list">${activity.steps.map(step => `<li>${step}</li>`).join("")}</ol></section>
    <section class="study-workspace" aria-labelledby="workspace-title"><p class="eyebrow">Tu respuesta · privada</p><h2 id="workspace-title">Espacio de trabajo</h2>${levelPicker(record)}<label for="personal-note"><strong>Desarrollo</strong></label><textarea id="personal-note">${escapeHtml(record.note || activity.prompt)}</textarea><div class="workspace-footer"><span class="save-status" id="save-status">Guardado local automático al editar</span><span class="tag">Memory Card</span></div></section>`;
  bindWorkspace("activity", id, record);
}

function renderNotFound() {
  setChrome("No encontrado", "home");
  main.innerHTML = `<section class="empty"><p class="eyebrow">404</p><h1>Ese camino todavía no existe.</h1><p class="muted">El Atlas crece a partir del programa y de necesidades reales de estudio.</p><a class="button" href="#/">Volver al recorrido</a></section>`;
}

async function router() {
  const parts = routeParts();
  try {
    if (!parts.length) await renderHome();
    else if (parts[0] === "materia") renderSubject();
    else if (parts[0] === "lectura") await renderReading(parts[1]);
    else if (parts[0] === "concepto") await renderConcept(parts[1]);
    else if (parts[0] === "glosario") renderGlossary();
    else if (parts[0] === "actividades") renderActivities();
    else if (parts[0] === "actividad") await renderActivity(parts[1]);
    else if (parts[0] === "biblioteca") renderLibrary();
    else renderNotFound();
    animatePageIn();
    document.title = `${breadcrumb.textContent} · Atlas`;
    await refreshMemoryCount();
  } catch (error) {
    console.error(error);
    showToast("No pudimos abrir esta parte del Atlas.");
  }
}

async function refreshMemoryCount() {
  const records = await getAllRecords();
  document.querySelector("#memory-records").textContent = `${records.length} ${records.length === 1 ? "registro" : "registros"}`;
}

function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "☀" : "◐";
  themeButton.setAttribute("aria-label", theme === "dark" ? "Activar modo claro" : "Activar modo oscuro");
  if (persist) localStorage.setItem("atlas-theme", theme);
}

themeButton.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
applyTheme(document.documentElement.dataset.theme || "light", false);

helpButton.addEventListener("click", () => openHelp(currentHelpTopic));
memoryHelpButton.addEventListener("click", () => openHelp("memory"));
helpDialogClose.addEventListener("click", closeHelp);
onboardingClose.addEventListener("click", closeOnboarding);
onboardingDismiss.addEventListener("click", closeOnboarding);
onboardingStart.addEventListener("click", closeOnboarding);
onboardingDialog.addEventListener("cancel", () => localStorage.setItem(ONBOARDING_KEY, "true"));
onboardingDialog.addEventListener("click", event => {
  const bounds = onboardingDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeOnboarding();
});
helpDialog.addEventListener("click", event => {
  const bounds = helpDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeHelp();
});
document.addEventListener("click", event => {
  const helpTrigger = event.target.closest("[data-help-topic]");
  if (helpTrigger) openHelp(helpTrigger.dataset.helpTopic);
  if (event.target.closest("[data-open-guide]")) openOnboarding();
});
document.addEventListener("focusin", event => event.target.closest?.("[data-tooltip]")?.classList.remove("tooltip-dismissed"));
document.addEventListener("pointerout", event => {
  const trigger = event.target.closest?.("[data-tooltip]");
  if (trigger && !trigger.contains(event.relatedTarget)) trigger.classList.remove("tooltip-dismissed");
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  document.querySelectorAll("[data-tooltip]").forEach(trigger => trigger.classList.add("tooltip-dismissed"));
  if (document.activeElement?.matches?.("[data-tooltip]")) document.activeElement.blur();
});

document.querySelector("#export-memory").addEventListener("click", async () => {
  const payload = await exportMemory();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "atlas-memory-v1.json"; link.click(); URL.revokeObjectURL(url);
  showToast("Memory Card exportada.");
});

document.querySelector("#import-memory").addEventListener("change", async event => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const payload = validateMemory(JSON.parse(await file.text()));
    await replaceAllRecords(payload.records);
    showToast(`Memory Card importada: ${payload.records.length} registros.`);
    await router();
  } catch (error) { showToast(error.message); }
  event.target.value = "";
});

menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", async () => {
  await router();
  if (!localStorage.getItem(ONBOARDING_KEY)) openOnboarding();
});
