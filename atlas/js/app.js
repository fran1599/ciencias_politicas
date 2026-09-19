import { atlasData } from "./data.js";
import { exportMemory, getAllRecords, getRecord, replaceAllRecords, saveRecord, validateMemory } from "./storage.js";

const main = document.querySelector("main");
const breadcrumb = document.querySelector("#breadcrumb");
const toast = document.querySelector("#toast");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector("#menu-button");
const themeButton = document.querySelector("#theme-button");
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

function progressFor(records) {
  const ids = [
    ...Object.keys(atlasData.readings).map(id => `reading:${id}`),
    ...Object.keys(atlasData.concepts).map(id => `concept:${id}`),
    ...atlasData.activities.map(activity => `activity:${activity.id}`)
  ];
  const points = ids.reduce((sum, id) => sum + (records.find(record => record.id === id)?.level || 0), 0);
  return Math.round((points / (ids.length * 5)) * 100);
}

async function renderHome() {
  const records = await getAllRecords();
  const progress = progressFor(records);
  setChrome("Mi recorrido", "home");
  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Tu plataforma de estudio · local-first</p>
      <h1>Volver a estudiar, sin volver a empezar.</h1>
      <p class="lead">El Atlas organiza el programa, las lecturas, los conceptos, las actividades y tus elaboraciones. Enseña a demanda y conserva en tu dispositivo la memoria de cómo vas comprendiendo.</p>
      <div class="hero-actions">
        <a class="button" href="#/actividad/mapa-argumento-polanyi">Hacer una actividad</a>
        <a class="button button-ghost" href="#/materia/economia-politica-i">Ver el programa navegable</a>
      </div>
    </section>

    <section class="card-grid" aria-label="Estado del recorrido">
      <article class="card wide">
        <div class="card-topline"><div><p class="eyebrow">Recorrido activo</p><h2>${atlasData.subject.name}</h2></div><span class="tag source">Corpus ${atlasData.subject.year}</span></div>
        <p>${atlasData.subject.question}</p>
        <div class="progress-track" aria-label="Progreso ${progress}%"><span style="width:${progress}%"></span></div>
        <div class="metric-row"><div><strong>${progress}%</strong><span>profundidad registrada</span></div><div><strong>${atlasData.subject.units.length}</strong><span>unidades mapeadas</span></div><div><strong>${records.length}</strong><span>registros privados</span></div></div>
      </article>
      <article class="card">
        <p class="eyebrow">Próximo paso sugerido</p>
        <h3>Reconstruir antes de opinar</h3>
        <p class="muted">Separá problema, tesis y fundamentación en “Aristóteles descubre la economía”.</p>
        <a class="button-text" href="#/actividad/mapa-argumento-polanyi">Abrir actividad →</a>
      </article>
    </section>

    <div class="section-heading"><div><p class="eyebrow">Mapa ampliado</p><h2>Navegá por relaciones, no por carpetas</h2></div></div>
    <div class="path-list">
      <a class="path-item" href="#/materia/economia-politica-i"><span class="path-index">02</span><span><strong>Dos unidades y doce lecturas</strong><small>Programa navegable · cuatro reconstrucciones disponibles</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/glosario"><span class="path-index">09</span><span><strong>Glosario relacional</strong><small>Conceptos con autoría, reconstrucción y lectura crítica</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/actividades"><span class="path-index">05</span><span><strong>Actividades académicas</strong><small>Comprender, relacionar, discutir y producir</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/biblioteca"><span class="path-index">B</span><span><strong>Biblioteca y fuentes</strong><small>Enlaces verificados y vacíos documentales visibles</small></span><span class="path-arrow">→</span></a>
    </div>`;
}

function renderSubject() {
  const subject = atlasData.subject;
  setChrome(`Materias / ${subject.name}`, "subject");
  const units = subject.units.map(unit => `
    <section class="unit-block">
      <div class="section-heading"><div><p class="eyebrow">Unidad ${unit.number}</p><h2>${unit.title}</h2><p class="muted">${unit.question}</p></div><div class="catalog-actions"><a class="button button-small button-ghost" href="${unit.guideUrl}" target="_blank" rel="noreferrer">Guía ↗</a><a class="button button-small button-ghost" href="${unit.summaryUrl}" target="_blank" rel="noreferrer">Resumen ↗</a></div></div>
      <div class="catalog-list">
        ${unit.bibliography.map(item => `
          <article class="catalog-item">
            <div><h3>${item.author} · ${item.title}</h3><p class="muted">${item.available ? "Reconstrucción navegable disponible." : "Registrado en la guía; desarrollo interno pendiente."}</p></div>
            <div class="catalog-actions">${item.available ? `<a class="button button-small" href="#/lectura/${item.id}">Abrir en Atlas</a>` : `<span class="tag">En preparación</span>`}<a class="button button-small button-ghost" href="${unit.guideUrl}" target="_blank" rel="noreferrer">Ver guía ↗</a></div>
          </article>`).join("")}
      </div>
    </section>`).join("");
  main.innerHTML = `
    <section class="hero"><p class="eyebrow">${subject.institution} · ${subject.year}</p><h1>${subject.name}</h1><p class="lead">${subject.description}</p></section>
    <section class="card full"><div class="card-topline"><div><p class="eyebrow">Pregunta general</p><h2>${subject.question}</h2></div><span class="tag">${subject.pilotStatus}</span></div><p class="muted">Las doce lecturas fueron verificadas en las guías vigentes. Cuatro ya tienen reconstrucción interna; las demás permanecen visibles para no confundir cobertura del programa con contenido efectivamente desarrollado.</p></section>
    ${units}`;
}

function renderGlossary() {
  setChrome("Glosario relacional", "glossary");
  const cards = Object.values(atlasData.concepts).map(concept => `
    <a class="concept-card" href="#/concepto/${concept.id}"><span class="tag reconstruction">Reconstrucción pedagógica</span><h3>${concept.name}</h3><p class="muted">${concept.short}</p><span class="button-text">Abrir relaciones →</span></a>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Conceptos en contexto</p><h1>Glosario relacional</h1><p class="lead">Cada término conserva quién lo formula, en qué problema interviene, cómo lo reconstruimos y qué discusión abre. No hay definiciones sin procedencia.</p></section><div class="glossary-grid">${cards}</div>`;
}

function renderActivities() {
  setChrome("Actividades", "activities");
  const cards = atlasData.activities.map(activity => `
    <article class="activity-card"><div class="meta-line"><span class="tag question">${activity.operation}</span><span class="tag">${activity.duration}</span></div><h3>${activity.title}</h3><p class="muted">${activity.goal}</p><a class="button-text" href="#/actividad/${activity.id}">Empezar →</a></article>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Aprender haciendo</p><h1>Actividades con propósito</h1><p class="lead">No suman puntos por tocar botones. Cada una ejercita una operación del método: reconstruir, relacionar, discutir o producir.</p></section><div class="activity-grid">${cards}</div>`;
}

function renderLibrary() {
  setChrome("Biblioteca", "library");
  const cards = atlasData.materials.map(material => `
    <article class="resource-card ${material.url ? "" : "pending"}"><div class="meta-line"><span class="tag source">${material.kind}</span><span class="tag">${material.status}</span></div><h3>${material.title}</h3><p class="muted">${material.description}</p>${material.url ? `<a class="button-text" href="${material.url}" target="_blank" rel="noreferrer">Abrir material ↗</a>` : `<span class="muted">Sin enlace verificable</span>`}</article>`).join("");
  main.innerHTML = `<section class="hero"><p class="eyebrow">Acceso y trazabilidad</p><h1>Biblioteca académica</h1><p class="lead">Reúne los materiales que pudimos verificar. Los textos originales no se reproducen en el sitio: se enlazan cuando existe una ubicación autorizada y accesible.</p></section><div class="callout"><p class="eyebrow">Estado documental</p><p>Las guías y resúmenes declaran haber sido construidos con el Programa 2026, el cronograma y el compendio vigentes. El archivo original del programa no está disponible desde el Drive conectado; por eso aparece como pendiente y no como fuente enlazada.</p></div><div class="resource-grid">${cards}</div>`;
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
  const readings = concept.readings.map(readingId => `<a class="relation" href="#/lectura/${readingId}">${atlasData.readings[readingId].author} · ${atlasData.readings[readingId].title}</a>`).join("");
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag reconstruction">Concepto en construcción</span><span class="tag source">Corpus verificado</span></div><h1>${concept.name}</h1><p class="lead">${concept.short}</p></section>
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
window.addEventListener("DOMContentLoaded", router);
