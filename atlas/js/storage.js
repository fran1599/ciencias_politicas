const DB_NAME = "atlas-personal";
const DB_VERSION = 1;
const STORE = "memory";
const FALLBACK_KEY = "atlas-memory-fallback-v1";

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB no disponible"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, action) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, mode);
    const request = action(transaction.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

function fallbackRead() {
  try { return JSON.parse(localStorage.getItem(FALLBACK_KEY) || "[]"); }
  catch { return []; }
}

function fallbackWrite(records) {
  localStorage.setItem(FALLBACK_KEY, JSON.stringify(records));
}

export async function getRecord(id) {
  try { return (await withStore("readonly", store => store.get(id))) || null; }
  catch { return fallbackRead().find(record => record.id === id) || null; }
}

export async function saveRecord(record) {
  const next = { ...record, updatedAt: new Date().toISOString() };
  try { await withStore("readwrite", store => store.put(next)); }
  catch {
    const records = fallbackRead().filter(item => item.id !== next.id);
    records.push(next);
    fallbackWrite(records);
  }
  return next;
}

export async function getAllRecords() {
  try { return await withStore("readonly", store => store.getAll()); }
  catch { return fallbackRead(); }
}

export async function replaceAllRecords(records) {
  const allowedTypes = new Set(["reading", "concept", "activity"]);
  const normalized = records.map(record => ({
    id: String(record.id),
    type: allowedTypes.has(record.type) ? record.type : "reading",
    note: typeof record.note === "string" ? record.note : "",
    level: Math.max(0, Math.min(5, Number(record.level) || 0)),
    updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : new Date().toISOString()
  }));
  try {
    const db = await openDatabase();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      store.clear();
      normalized.forEach(record => store.put(record));
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch { fallbackWrite(normalized); }
  return normalized;
}

export async function exportMemory() {
  return {
    schema: "atlas-memory-v1",
    exportedAt: new Date().toISOString(),
    records: await getAllRecords()
  };
}

export function validateMemory(payload) {
  if (!payload || payload.schema !== "atlas-memory-v1" || !Array.isArray(payload.records)) {
    throw new Error("El archivo no es una Memory Card atlas-memory-v1 válida.");
  }
  for (const record of payload.records) {
    if (!record || typeof record.id !== "string") throw new Error("La Memory Card contiene un registro inválido.");
  }
  return payload;
}
