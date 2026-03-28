# Ciencias Políticas — UNC

Portal personal de seguimiento de la Licenciatura en Ciencia Política · UNC.

## Estructura

```
/
├── index.html              ← Punto de entrada
├── css/style.css           ← Estilos
├── js/app.js               ← Lógica del sitio
└── data/
    ├── horarios.json       ← Horarios por cuatrimestre
    ├── materias.json       ← Info, materiales, links, parciales por materia
    └── correlatividades.json ← Nodos y aristas del árbol de correlatividades
```

## Activar GitHub Pages

1. Subir el repo a GitHub (`git push`)
2. Settings → Pages → Source: `Deploy from a branch` → rama `main`, carpeta `/` (root)
3. El sitio queda disponible en `https://<usuario>.github.io/ciencias-politicas/`

## Cómo actualizar contenido

### Agregar un material a una materia

En `data/materias.json`, localizar la materia por `id` y agregar un objeto al array `materiales`:

```json
"materiales": [
  { "titulo": "Texto de Lechner — El orden deseado", "url": "https://..." }
]
```

### Agregar un link de NotebookLM

Igual que materiales pero en el array `notebook_lm`:

```json
"notebook_lm": [
  { "titulo": "Guía Historia Social I — Unidad 1", "url": "https://notebooklm.google.com/..." }
]
```

### Agregar una fecha de parcial

En el array `parciales` de la materia:

```json
"parciales": [
  { "fecha": "2025-05-14", "descripcion": "Primer parcial — Unidades 1 a 4" }
]
```

### Agregar un horario nuevo o modificar uno existente

Editar `data/horarios.json`. Cada entrada tiene:

```json
{
  "id": 1,
  "materia": "Nombre exacto de la materia",
  "codigo": "613",
  "tipo": "Teórico",
  "dia": "lunes",
  "hora_inicio": 18,
  "hora_fin": 20,
  "aula": "Baterías A - A2",
  "docentes": ["Apellido, Nombre"]
}
```

> Los nombres de `materia` en `horarios.json` deben coincidir exactamente con los de `MATERIA_COLOR_MAP` en `app.js` para que el color se asigne correctamente.

### Notas personales

Las notas que escribís en la pestaña Materias se guardan en `localStorage` del navegador. No se sincronizan con el repo — son locales por dispositivo.

---

**Stack:** HTML · CSS · JS vanilla. Sin dependencias, sin build tools.
