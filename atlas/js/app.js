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
const ONBOARDING_KEY = "atlas-onboarding-seen-v1";
let toastTimer;

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

function setChrome(label, routeName) {
  breadcrumb.textContent = label;
  document.querySelectorAll("[data-route]").forEach(link => {
    if (link.dataset.route === routeName) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  sidebar.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function contextHelp(title, text) {
  return `<details class="context-help"><summary>¿Cómo uso esta parte?</summary><div><strong>${title}</strong><p>${text}</p></div></details>`;
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
  const bibliographyCount = atlasData.subject.units.reduce((sum, unit) => sum + unit.bibliography.length, 0);
  const workedRecords = records.filter(record => record.level > 0).length;
  setChrome("Mi recorrido", "home");
  main.innerHTML = `
    <section class="hero home-hero">
      <p class="eyebrow">Atlas personal de Ciencia Política</p>
      <h1>¿Qué necesitás estudiar hoy?</h1>
      <p class="lead">Entrá por una materia, un concepto o una actividad. El Atlas te orienta, enlaza las fuentes y guarda en este dispositivo tus notas y avances.</p>
      <div class="hero-actions">
        <a class="button" href="#/materia/economia-politica-i">Continuar Economía Política I</a>
        <button class="button button-ghost" type="button" data-open-guide>Cómo usar el Atlas</button>
      </div>
    </section>

    <section aria-labelledby="start-title">
      <div class="section-heading compact"><div><p class="eyebrow">Tres formas de empezar</p><h2 id="start-title">Elegí según lo que necesites</h2></div></div>
      <div class="intent-grid">
        <a class="intent-card primary" href="#/materia/economia-politica-i"><span class="intent-icon" aria-hidden="true">1</span><span><strong>Ubicarme en la cursada</strong><small>Ver unidades, lecturas y qué corresponde estudiar ahora.</small></span><span aria-hidden="true">→</span></a>
        <a class="intent-card" href="#/glosario"><span class="intent-icon" aria-hidden="true">2</span><span><strong>Entender un concepto</strong><small>Partir de una explicación breve y recorrer sus relaciones.</small></span><span aria-hidden="true">→</span></a>
        <a class="intent-card" href="#/actividades"><span class="intent-icon" aria-hidden="true">3</span><span><strong>Practicar lo aprendido</strong><small>Responder, comparar o producir con guardado privado.</small></span><span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section class="card-grid" aria-label="Estado del recorrido">
      <article class="card wide">
        <div class="card-topline"><div><p class="eyebrow">Recorrido activo</p><h2>${atlasData.subject.name}</h2></div><span class="tag source">Corpus ${atlasData.subject.year}</span></div>
        <p>${atlasData.subject.question}</p>
        <div class="metric-row"><div><strong>${workedRecords}</strong><span>contenidos con nivel marcado</span></div><div><strong>${atlasData.subject.units.length}</strong><span>unidades del programa</span></div><div><strong>${records.length}</strong><span>registros privados</span></div></div>
        <p class="metric-note">Los niveles son una autoevaluación para decidir el próximo paso, no una nota ni una medida definitiva de aprendizaje.</p>
      </article>
      <article class="card">
        <p class="eyebrow">Próximo paso sugerido</p>
        <h3>Integrar antes de la evaluación</h3>
        <p class="muted">El cronograma ubica la semana de exámenes después de las unidades 1, 2 y el primer bloque de la 3. Practicá una tesis que haga conversar autores.</p>
        <a class="button-text" href="#/actividad/tpe-unidades-1-2">Abrir ensayo de TPE →</a>
      </article>
    </section>

    <details class="more-navigation">
      <summary>Ver todas las herramientas y fuentes</summary>
      <div class="path-list">
        <a class="path-item" href="#/materia/economia-politica-i"><span class="path-index">05</span><span><strong>${bibliographyCount} lecturas en cinco unidades</strong><small>Programa, recorrido de cursada y acceso al compendio</small></span><span class="path-arrow">→</span></a>
        <a class="path-item" href="#/glosario"><span class="path-index">${String(Object.keys(atlasData.concepts).length).padStart(2, "0")}</span><span><strong>Glosario relacional</strong><small>Conceptos con procedencia y discusión crítica</small></span><span class="path-arrow">→</span></a>
        <a class="path-item" href="#/actividades"><span class="path-index">${String(atlasData.activities.length).padStart(2, "0")}</span><span><strong>Actividades académicas</strong><small>Comprender, relacionar, discutir y producir</small></span><span class="path-arrow">→</span></a>
        <a class="path-item" href="#/biblioteca"><span class="path-index">B</span><span><strong>Biblioteca y fuentes</strong><small>Programa, cronograma, guías y materiales enlazados</small></span><span class="path-arrow">→</span></a>
      </div>
    </details>`;
}

function renderSubject() {
  const subject = atlasData.subject;
  const bibliographyCount = subject.units.reduce((sum, unit) => sum + unit.bibliography.length, 0);
  setChrome(`Materias / ${subject.name}`, "subject");
  const units = subject.units.map(unit => `
    <section class="unit-block">
      <div class="section-heading"><div><div class="meta-line"><p class="eyebrow">Unidad ${unit.number}</p><span class="tag status-${unit.statusKind}">${unit.status}</span></div><h2>${unit.title}</h2><p class="muted">${unit.question}</p></div><div class="catalog-actions"><a class="button button-small button-ghost" href="${unit.guideUrl}" target="_blank" rel="noreferrer">Guía ↗</a>${unit.summaryUrl ? `<a class="button button-small button-ghost" href="${unit.summaryUrl}" target="_blank" rel="noreferrer">Resumen ↗</a>` : ""}</div></div>
      <div class="catalog-list">
        ${unit.bibliography.map(item => `
          <article class="catalog-item">
            <div><h3>${item.author} · ${item.title}</h3><p class="muted">${item.reference} · ${item.pages}. ${item.available ? "Incluye una guía navegable dentro del Atlas." : "Disponible para leer en el compendio."}</p></div>
            <div class="catalog-actions">${item.available ? `<a class="button button-small" href="#/lectura/${item.id}">Estudiar en el Atlas</a>` : `<span class="tag">En el compendio</span>`}<a class="button button-small button-ghost" href="${subject.compendiumUrl}" target="_blank" rel="noreferrer">Abrir texto ↗</a></div>
          </article>`).join("")}
      </div>
    </section>`).join("");
  main.innerHTML = `
    <section class="hero"><p class="eyebrow">${subject.institution} · ${subject.year}</p><h1>${subject.name}</h1><p class="lead">${subject.description}</p></section>
    ${contextHelp("Empezá por la unidad que dice “En cursada”", "Cada lectura indica dónde está en el compendio. Cuando aparece “Estudiar en el Atlas”, además tenés una explicación, conceptos relacionados y un espacio privado para elaborar lo leído.")}
    <section class="card full"><div class="card-topline"><div><p class="eyebrow">Pregunta general</p><h2>${subject.question}</h2></div><span class="tag">${subject.pilotStatus}</span></div><p class="muted">Las ${bibliographyCount} lecturas básicas fueron contrastadas con el Programa 2026 y ubicadas dentro del compendio de 520 páginas. Usá las etiquetas para distinguir qué podés estudiar dentro del Atlas y qué se abre directamente en la fuente.</p><div class="hero-actions"><a class="button button-small" href="${subject.programUrl}" target="_blank" rel="noreferrer">Programa oficial ↗</a><a class="button button-small button-ghost" href="${subject.scheduleUrl}" target="_blank" rel="noreferrer">Cronograma ↗</a><a class="button button-small button-ghost" href="${subject.compendiumUrl}" target="_blank" rel="noreferrer">Compendio ↗</a></div></section>
    <div class="callout"><p class="eyebrow">Corte temporal · 20/09/2026</p><p>Según el cronograma, las unidades 1 y 2 ya fueron trabajadas, la unidad 3.1 está en curso y del 21 al 25 de septiembre corresponde la semana de exámenes. El bloque marginalista está previsto desde el 29 de septiembre. Las fechas de evaluación siguen siendo provisorias.</p></div>
    ${units}`;
}

function renderGlossary() {
  setChrome("Glosario relacional", "glossary");
  const cards = Object.values(atlasData.concepts).map(concept => `
    <a class="concept-card" href="#/concepto/${concept.id}"><span class="tag reconstruction">Reconstrucción pedagógica</span><h3>${concept.name}</h3><p class="muted">${concept.short}</p><span class="button-text">Abrir relaciones →</span></a>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Conceptos en contexto</p><h1>Glosario relacional</h1><p class="lead">Cada término conserva quién lo formula, en qué problema interviene, cómo lo reconstruimos y qué discusión abre. No hay definiciones sin procedencia.</p></section>${contextHelp("Entrá por el concepto que te esté trabando", "Primero vas a encontrar una orientación breve. Después podés distinguir lo que plantea el programa, lo atribuible al autor, la reconstrucción pedagógica y la lectura crítica.")}<div class="glossary-grid">${cards}</div>`;
}

function renderActivities() {
  setChrome("Actividades", "activities");
  const cards = atlasData.activities.map(activity => `
    <article class="activity-card"><div class="meta-line"><span class="tag question">${activity.operation}</span><span class="tag">${activity.duration}</span></div><h3>${activity.title}</h3><p class="muted">${activity.goal}</p><a class="button-text" href="#/actividad/${activity.id}">Empezar →</a></article>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Aprender haciendo</p><h1>Actividades con propósito</h1><p class="lead">No suman puntos por tocar botones. Cada una ejercita una operación del método: reconstruir, relacionar, discutir o producir.</p></section>${contextHelp("Usalas para comprobar qué podés hacer con lo estudiado", "Elegí por operación y tiempo disponible. Tu respuesta y el nivel que marques se guardan sólo en este dispositivo dentro de la Memory Card.")}<div class="activity-grid">${cards}</div>`;
}

function renderLibrary() {
  setChrome("Biblioteca", "library");
  const cards = atlasData.materials.map(material => `
    <article class="resource-card ${material.url ? "" : "pending"}"><div class="meta-line"><span class="tag source">${material.kind}</span><span class="tag">${material.status}</span></div><h3>${material.title}</h3><p class="muted">${material.description}</p>${material.url ? `<a class="button-text" href="${material.url}" target="_blank" rel="noreferrer">Abrir material ↗</a>` : `<span class="muted">Sin enlace verificable</span>`}</article>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Acceso y trazabilidad</p><h1>Biblioteca académica</h1><p class="lead">Reúne los materiales verificados de la materia y los documentos de elaboración del proyecto. Los textos originales no se copian en el sitio: se enlazan a la carpeta compartida.</p></section>${contextHelp("Vení acá cuando necesites volver a la fuente", "El programa ordena la materia, el cronograma ubica los tiempos, la guía propone preguntas y el compendio reúne las lecturas. Los resúmenes sirven como apoyo, no como reemplazo.")}<div class="callout"><p class="eyebrow">Criterio documental y de derechos</p><p>Programa, cronograma, guía y compendio fueron verificados directamente. El Atlas publica referencias, rangos de páginas y reconstrucciones propias; no redistribuye los PDF ni presenta el resumen como sustituto de las obras. El acceso a cada archivo depende de los permisos definidos por quienes administran el Drive.</p></div><div class="resource-grid">${cards}</div>`;
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
  setChrome(`${atlasData.subject.name} / ${reading.author}`, "subject");
  const sections = reading.sections.map(section => `<section><h2>${section.title}</h2>${section.paragraphs.map(text => `<p>${text}</p>`).join("")}</section>`).join("");
  const concepts = reading.relatedConcepts.map(conceptId => `<a class="relation" href="#/concepto/${conceptId}">${atlasData.concepts[conceptId].name}</a>`).join("");
  const activities = reading.relatedActivities.map(activityId => { const activity = atlasData.activities.find(item => item.id === activityId); return `<a class="relation" href="#/actividad/${activityId}">${activity.title}</a>`; }).join("");
  const sources = reading.sourceLinks.map(source => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ↗</a></li>`).join("");
  main.innerHTML = `
    <div class="reading-layout"><article class="reading-body"><div class="meta-line"><span class="tag source">${reading.type}</span><span class="tag reconstruction">${reading.sourceStatus}</span></div><h1>${reading.title}</h1><p class="lead">${reading.author} · ${reading.unit}</p>
      ${contextHelp("Leé primero la pregunta y la tesis reconstruida", "Después seguí los argumentos, abrí los conceptos que necesites y volvé a la fuente desde el panel de trazabilidad. Tu elaboración queda en la sección privada del final.")}
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
  setChrome(`Glosario / ${concept.name}`, "glossary");
  const readings = concept.readings.map(readingId => `<a class="relation" href="#/lectura/${readingId}">${atlasData.readings[readingId].author} · ${atlasData.readings[readingId].title}</a>`).join("") || `<span class="muted">Consultá la lectura correspondiente desde la materia para abrirla en el compendio.</span>`;
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag reconstruction">Concepto en construcción</span><span class="tag source">Corpus verificado</span></div><h1>${concept.name}</h1><p class="lead">${concept.short}</p></section>
    ${contextHelp("Empezá por la orientación breve y después compará las capas", "La misma palabra puede cambiar según el autor y el momento histórico. Por eso el Atlas evita una definición única y separa procedencia, reconstrucción y crítica.")}
    <section aria-labelledby="layers-title"><p class="eyebrow">Definición estratificada</p><h2 id="layers-title">No mezclar las capas</h2><div class="epistemic-stack"><div class="epistemic-row"><strong>Programa / cátedra</strong><span>${concept.programLayer}</span></div><div class="epistemic-row"><strong>Autor / texto</strong><span>${concept.authorLayer}</span></div><div class="epistemic-row"><strong>Reconstrucción</strong><span>${concept.reconstructionLayer}</span></div><div class="epistemic-row"><strong>Lectura crítica</strong><span>${concept.criticalLayer}</span></div></div></section>
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
  setChrome(`Actividades / ${activity.title}`, "activities");
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag question">${activity.operation}</span><span class="tag">${activity.duration}</span></div><h1>${activity.title}</h1><p class="lead">${activity.goal}</p><a class="button-text" href="${relatedHref}">Volver a ${relatedLabel} →</a></section>
    ${contextHelp("Hacé la consigna sin buscar una respuesta perfecta", "El objetivo es dejar evidencia de una operación concreta: explicar, relacionar, objetar o producir. Podés volver después y revisar lo guardado.")}
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

helpButton.addEventListener("click", openOnboarding);
memoryHelpButton.addEventListener("click", openOnboarding);
onboardingClose.addEventListener("click", closeOnboarding);
onboardingDismiss.addEventListener("click", closeOnboarding);
onboardingStart.addEventListener("click", closeOnboarding);
onboardingDialog.addEventListener("cancel", () => localStorage.setItem(ONBOARDING_KEY, "true"));
onboardingDialog.addEventListener("click", event => {
  const bounds = onboardingDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeOnboarding();
});
document.addEventListener("click", event => {
  if (event.target.closest("[data-open-guide]")) openOnboarding();
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
