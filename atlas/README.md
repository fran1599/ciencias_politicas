# Atlas personal · prototipo v0.4

Prototipo estático, aislado del sitio principal, para convertir el programa de Economía Política I en un recorrido de estudio navegable y conservar localmente la memoria académica personal.

## Alcance

- piloto: Economía Política I (FCS-UNC, 2026), con sus cinco unidades;
- navegación materia → lectura → concepto → relaciones;
- veinte entradas de bibliografía básica verificadas contra el programa y localizadas dentro del compendio de 520 páginas;
- estado temporal explícito: unidades desarrolladas, en curso y mapeadas;
- biblioteca con programa, cronograma, guía orientadora, compendio y materiales de apoyo enlazados;
- cuatro reconstrucciones de lectura y doce conceptos relacionados;
- siete actividades alineadas al método de estudio y al momento de la cursada;
- onboarding breve de primera entrada, reabrible desde la ayuda global;
- portada orientada por intenciones: ubicarse, comprender o practicar;
- ayudas contextuales en las herramientas principales;
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

## Fuentes académicas

- Programa 2026 de Economía Política I;
- Cronograma de desarrollo de contenidos 2026;
- Compendio bibliográfico 2026;
- Guía orientadora general de lectura;
- README del espacio de Economía Política I;
- Guías de lectura de Unidades 1 y 2;
- Resúmenes ampliados de Unidades 1 y 2;
- documento rector del Atlas.

El contenido público es una reconstrucción pedagógica breve y trazable. Los materiales originales no se copian en el sitio: permanecen en Drive y se enlazan con su rango de páginas en el compendio. Las elaboraciones personales permanecen en el navegador hasta que la persona exporta su Memory Card.

## Criterio de contenido visible

La interfaz muestra sólo información necesaria para estudiar, orientarse, interpretar una etiqueta o comprender una función. Las hipótesis de evolución, decisiones arquitectónicas, estados de implementación y alternativas futuras pertenecen a la documentación del proyecto y no deben aparecer como texto explicativo dentro del Atlas.

La guía inicial presenta únicamente tres decisiones de uso: elegir una tarea, reconocer la procedencia del contenido y guardar el proceso personal. No intenta recorrer todas las pantallas. Su cierre queda registrado en `localStorage` y puede reabrirse desde el botón de ayuda o desde la Memory Card.
