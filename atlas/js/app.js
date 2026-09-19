import { atlasData } from "./data.js";
import { exportMemory, getAllRecords, getRecord, replaceAllRecords, saveRecord, validateMemory } from "./storage.js";

const main = document.querySelector("main");
const breadcrumb = document.querySelector("#breadcrumb");
const toast = document.querySelector("#toast");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector("#menu-button");
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
  if (parts[0] === "glosario") return "glossary";
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
  const relevant = ["reading:polanyi-aristoteles", ...Object.keys(atlasData.concepts).map(id => `concept:${id}`)];
  const values = relevant.map(id => records.find(record => record.id === id)?.level || 0);
  return Math.round((values.reduce((sum, value) => sum + value, 0) / (relevant.length * 5)) * 100);
}

async function renderHome() {
  const records = await getAllRecords();
  const progress = progressFor(records);
  setChrome("Mi recorrido", "home");
  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Tu plataforma de estudio · local-first</p>
      <h1>Volver a estudiar, sin volver a empezar.</h1>
      <p class="lead">El Atlas organiza el programa, los textos, los conceptos y tus elaboraciones. Enseña a demanda y conserva en tu dispositivo la memoria de cómo vas comprendiendo.</p>
      <div class="hero-actions">
        <a class="button" href="#/lectura/polanyi-aristoteles">Continuar con Polanyi</a>
        <a class="button button-ghost" href="#/materia/economia-politica-i">Ver la materia</a>
      </div>
    </section>

    <section class="card-grid" aria-label="Estado del recorrido">
      <article class="card wide">
        <div class="card-topline"><div><p class="eyebrow">Recorrido activo</p><h2>${atlasData.subject.name}</h2></div><span class="tag source">Programa ${atlasData.subject.year}</span></div>
        <p>${atlasData.subject.question}</p>
        <div class="progress-track" aria-label="Progreso ${progress}%"><span style="width:${progress}%"></span></div>
        <div class="metric-row"><div><strong>${progress}%</strong><span>profundidad registrada</span></div><div><strong>1</strong><span>unidad activa</span></div><div><strong>${records.length}</strong><span>registros privados</span></div></div>
      </article>
      <article class="card">
        <p class="eyebrow">Próximo paso</p>
        <h3>Explicar con tus palabras</h3>
        <p class="muted">¿Por qué tener moneda y comercio no alcanza para hablar de una sociedad de mercado?</p>
        <a class="button-text" href="#/lectura/polanyi-aristoteles">Abrir espacio de trabajo →</a>
      </article>
    </section>

    <div class="section-heading"><div><p class="eyebrow">Mapa mínimo</p><h2>Navegá por relaciones, no por carpetas</h2></div></div>
    <div class="path-list">
      <a class="path-item" href="#/materia/economia-politica-i"><span class="path-index">01</span><span><strong>Economía Política I</strong><small>Materia · FCS-UNC · 2026</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/lectura/polanyi-aristoteles"><span class="path-index">T</span><span><strong>Aristóteles descubre la economía</strong><small>Texto · Karl Polanyi</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/concepto/economia-substantiva"><span class="path-index">C</span><span><strong>Economía substantiva</strong><small>Concepto · relacionado con economía encastrada</small></span><span class="path-arrow">→</span></a>
    </div>`;
}

function renderSubject() {
  const subject = atlasData.subject;
  setChrome(`Materias / ${subject.name}`, "subject");
  main.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${subject.institution} · ${subject.year}</p>
      <h1>${subject.name}</h1>
      <p class="lead">${subject.description}</p>
    </section>
    <section class="card full">
      <div class="card-topline"><div><p class="eyebrow">Pregunta organizadora</p><h2>${subject.question}</h2></div><span class="tag">${subject.pilotStatus}</span></div>
      <p class="muted">El piloto no intenta representar toda la materia: prueba una unidad de aprendizaje completa y trazable antes de ampliar el sistema.</p>
    </section>
    <div class="section-heading"><div><p class="eyebrow">Unidad 1</p><h2>Economía, mercado y sustento</h2></div><span class="tag source">Fuente de cátedra verificada</span></div>
    <div class="path-list">
      <a class="path-item" href="#/lectura/polanyi-aristoteles"><span class="path-index">T1</span><span><strong>Polanyi · Aristóteles descubre la economía</strong><small>Reconstrucción pedagógica + espacio de elaboración personal</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/concepto/economia-substantiva"><span class="path-index">C1</span><span><strong>Economía substantiva</strong><small>Definición estratificada y relaciones conceptuales</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/concepto/economia-encastrada"><span class="path-index">C2</span><span><strong>Economía encastrada</strong><small>Instituciones políticas, sociales y culturales</small></span><span class="path-arrow">→</span></a>
      <a class="path-item" href="#/concepto/mercancias-ficticias"><span class="path-index">C3</span><span><strong>Mercancías ficticias</strong><small>Trabajo, tierra y dinero</small></span><span class="path-arrow">→</span></a>
    </div>`;
}

function renderGlossary() {
  setChrome("Glosario relacional", "glossary");
  const cards = Object.values(atlasData.concepts).map(concept => `
    <a class="concept-card" href="#/concepto/${concept.id}">
      <span class="tag reconstruction">Reconstrucción pedagógica</span>
      <h3>${concept.name}</h3>
      <p class="muted">${concept.short}</p>
      <span class="button-text">Abrir relaciones →</span>
    </a>`).join("");
  main.innerHTML = `
    <section class="hero"><p class="eyebrow">Conceptos en contexto</p><h1>Glosario relacional</h1><p class="lead">Cada término conserva quién lo formula, en qué problema interviene, cómo lo reconstruimos y qué discusión abre. No hay definiciones sin procedencia.</p></section>
    <div class="glossary-grid">${cards}</div>`;
}

function levelPicker(record) {
  return `<div class="level-picker" aria-label="Nivel de elaboración">
    ${atlasData.levels.map(level => `<button type="button" data-level="${level.id}" class="${record.level === level.id ? "active" : record.level > level.id ? "complete" : ""}" title="${level.hint}"><span>${level.id}</span>${level.name}</button>`).join("")}
  </div>`;
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
  const sources = reading.sourceLinks.map(source => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ↗</a></li>`).join("");
  main.innerHTML = `
    <div class="reading-layout">
      <article class="reading-body">
        <div class="meta-line"><span class="tag source">${reading.type}</span><span class="tag reconstruction">${reading.sourceStatus}</span></div>
        <h1>${reading.title}</h1>
        <p class="lead">${reading.author} · ${reading.unit}</p>
        <div class="callout"><p class="eyebrow">Pregunta de lectura</p><p><strong>${reading.centralQuestion}</strong></p></div>
        <div class="prose">
          <h2>Tesis reconstruida</h2><p>${reading.thesis}</p>
          ${sections}
          <p>Continuá por <a class="concept-link" href="#/concepto/economia-substantiva">economía substantiva</a> o <a class="concept-link" href="#/concepto/economia-encastrada">economía encastrada</a>.</p>
        </div>
        <section class="study-workspace" aria-labelledby="workspace-title">
          <p class="eyebrow">Tu memoria académica · privada</p><h2 id="workspace-title">Elaboración personal</h2>
          <p class="muted">Explicá el argumento, registrá una duda o ensayá una objeción. Este texto no se publica ni sale del dispositivo salvo que exportes tu Memory Card.</p>
          ${levelPicker(record)}
          <label for="personal-note"><strong>¿Qué entendí y qué necesito revisar?</strong></label>
          <textarea id="personal-note" placeholder="Escribí acá…">${escapeHtml(record.note)}</textarea>
          <div class="workspace-footer"><span class="save-status" id="save-status">Guardado local automático</span><span class="tag">Privado</span></div>
        </section>
      </article>
      <aside class="margin-panel" aria-label="Contexto de la lectura">
        <section class="panel"><p class="eyebrow">Vigilancia epistémica</p><h3>Qué estás leyendo</h3><p class="muted">Una reconstrucción pedagógica basada en materiales de estudio, no el texto original ni una cita del programa.</p></section>
        <section class="panel"><p class="eyebrow">Trazabilidad</p><h3>Fuentes de trabajo</h3><ul class="source-list">${sources}</ul></section>
      </aside>
    </div>`;
  bindWorkspace("reading", id, record);
}

async function renderConcept(id) {
  const concept = atlasData.concepts[id];
  if (!concept) return renderNotFound();
  const record = (await getRecord(`concept:${id}`)) || { id: `concept:${id}`, type: "concept", note: "", level: 0 };
  setChrome(`Glosario / ${concept.name}`, "glossary");
  main.innerHTML = `
    <section class="hero"><div class="meta-line"><span class="tag reconstruction">Concepto en construcción</span><span class="tag source">Unidad 1</span></div><h1>${concept.name}</h1><p class="lead">${concept.short}</p></section>
    <section aria-labelledby="layers-title"><p class="eyebrow">Definición estratificada</p><h2 id="layers-title">No mezclar las capas</h2>
      <div class="epistemic-stack">
        <div class="epistemic-row"><strong>Programa / cátedra</strong><span>${concept.programLayer}</span></div>
        <div class="epistemic-row"><strong>Autor / texto</strong><span>${concept.authorLayer}</span></div>
        <div class="epistemic-row"><strong>Reconstrucción</strong><span>${concept.reconstructionLayer}</span></div>
        <div class="epistemic-row"><strong>Lectura crítica</strong><span>${concept.criticalLayer}</span></div>
      </div>
    </section>
    <section class="card-grid">
      <article class="card wide"><p class="eyebrow">Relaciones</p><h2>Este concepto conversa con…</h2><div class="relations">${concept.related.map(related => `<a class="relation" href="#/concepto/${related}">${atlasData.concepts[related].name}</a>`).join("")}</div></article>
      <article class="card"><p class="eyebrow">Volver al texto</p><h3>Polanyi y Aristóteles</h3><p class="muted">Mirá cómo funciona el concepto dentro de un argumento.</p><a class="button-text" href="#/lectura/polanyi-aristoteles">Abrir lectura →</a></article>
    </section>
    <section class="study-workspace" aria-labelledby="workspace-title">
      <p class="eyebrow">Tu memoria académica · privada</p><h2 id="workspace-title">Hacer propio el concepto</h2>
      <p><strong>Pregunta de transferencia:</strong> ${concept.personalPrompt}</p>
      ${levelPicker(record)}
      <label for="personal-note"><strong>Mi definición, ejemplo u objeción</strong></label>
      <textarea id="personal-note" placeholder="Escribí acá…">${escapeHtml(record.note)}</textarea>
      <div class="workspace-footer"><span class="save-status" id="save-status">Guardado local automático</span><span class="tag">Privado</span></div>
    </section>`;
  bindWorkspace("concept", id, record);
}

function renderNotFound() {
  setChrome("No encontrado", "home");
  main.innerHTML = `<section class="empty"><p class="eyebrow">404</p><h1>Ese camino todavía no existe.</h1><p class="muted">El Atlas crece a partir del programa y de necesidades reales de estudio.</p><a class="button" href="#/">Volver al recorrido</a></section>`;
}

async function router() {
  const parts = routeParts();
  const route = currentRouteName(parts);
  try {
    if (!parts.length) await renderHome();
    else if (parts[0] === "materia") renderSubject();
    else if (parts[0] === "lectura") await renderReading(parts[1]);
    else if (parts[0] === "concepto") await renderConcept(parts[1]);
    else if (parts[0] === "glosario") renderGlossary();
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

document.querySelector("#export-memory").addEventListener("click", async () => {
  const payload = await exportMemory();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "atlas-memory-v1.json";
  link.click();
  URL.revokeObjectURL(url);
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
