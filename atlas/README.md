# Atlas personal · prototipo v0.2

Prototipo estático, aislado del sitio actual, para validar una unidad completa de aprendizaje antes de ampliar el sistema.

## Alcance

- piloto: Economía Política I, Unidades 1 y 2 (FCS-UNC, 2026);
- navegación materia → lectura → concepto → relaciones;
- programa navegable con doce lecturas y cobertura interna explícita;
- biblioteca con enlaces verificados y faltantes documentales visibles;
- cuatro reconstrucciones de lectura y nueve conceptos relacionados;
- cinco actividades alineadas al método de estudio;
- modo oscuro persistente;
- vigilancia epistémica visible mediante capas de procedencia;
- niveles de elaboración: Reconocer, Comprender, Relacionar, Discutir y Producir;
- notas y progreso locales en IndexedDB, con respaldo en `localStorage` si no está disponible;
- exportación e importación de `atlas-memory-v1.json`;
- sin PDFs, textos completos, credenciales ni datos personales en el repositorio.

## Ejecutar

Desde la raíz del repositorio:

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000/atlas/`.

## Fuentes académicas del piloto

- README del espacio de Economía Política I;
- Guías de lectura de Unidades 1 y 2;
- Resúmenes ampliados de Unidades 1 y 2;
- documento rector del Atlas.

El contenido público es una reconstrucción pedagógica breve y trazable. Los materiales originales permanecen en Drive; las elaboraciones personales permanecen en el navegador hasta que la persona exporta su Memory Card.
