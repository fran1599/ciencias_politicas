# Investigación de diseño para Atlas v0.7

Fecha: 20 de septiembre de 2026  
Estado: propuesta de evolución, no contenido visible de la plataforma

## Pregunta de diseño

¿Cómo puede el Atlas conservar densidad académica, trazabilidad y libertad de exploración sin presentar demasiada información ni demasiadas decisiones al mismo tiempo?

La dificultad actual no es sólo la extensión de los textos. La divulgación progresiva redujo la cantidad visible, pero todavía deja varios bloques y acciones con una jerarquía semejante. La siguiente evolución debe orientar una sesión de estudio sin convertir el recorrido en un curso rígido ni en una acumulación de puntos.

## Áreas pertinentes

- arquitectura de información: organización, rotulado, navegación, búsqueda y encontrabilidad;
- interacción persona-computadora y diseño de interacción: relación entre acciones, estados y respuesta de la interfaz;
- diseño de contenidos: orden, lenguaje, jerarquía y momento de aparición de la información;
- diseño instruccional y experiencia de aprendizaje: secuenciación, práctica, recuperación y retroalimentación;
- psicología cognitiva: atención, memoria de trabajo y carga cognitiva;
- accesibilidad: uso con teclado, tacto, lectores de pantalla y preferencias de movimiento.

## Hallazgos comparados

| Referencia | Patrón observado | Traducción posible al Atlas |
| --- | --- | --- |
| Wikimedia | ancho de lectura limitado, buscador prominente, cabecera fija, tabla de contenidos y herramientas agrupadas | orientación persistente dentro de lecturas y unidades; no depender sólo de acordeones |
| GOV.UK | los desplegables sirven para información secundaria o para elegir entre secciones relacionadas; no deben ocultar lo que todas las personas necesitan | mantener visible la pregunta, la procedencia y el próximo paso; plegar desarrollo y apoyos |
| freeCodeCamp | currículum autoasistido dividido en módulos y actividades variadas: lecciones, práctica, revisión, cuestionarios y proyectos | una operación de estudio por pantalla y proyectos de integración como evidencia de avance |
| Khan Academy | progreso por curso, unidad y habilidad con estados cualitativos modificados por la práctica | conservar niveles cualitativos, pero asociarlos a evidencia y revisión, no a clics |
| Duolingo | camino recomendado, unidades pequeñas, práctica intercalada, guía por unidad y retorno rápido al punto actual | proponer un siguiente paso y una revisión, sin impedir la exploración libre |

Teachable puede aportar el modelo de curso lineal y reproducción de contenidos, pero no se toma como referencia central: el Atlas necesita articular programa, conceptos, fuentes, práctica y memoria personal, no sólo entregar clases en orden.

## Criterio para la evolución

La interfaz debe distinguir dos comportamientos:

1. **Continuar estudiando:** una ruta sugerida con una sola acción primaria.
2. **Consultar o explorar:** acceso libre a materia, glosario, actividades y biblioteca.

La ruta sugerida orienta; no bloquea contenidos. Su función es reducir la decisión inmediata, no prescribir una única forma de aprender.

## Arquitectura propuesta para v0.7

### 1. Inicio con próximo paso

El primer bloque debería responder tres preguntas sin desplegar el resto del sistema:

- dónde quedó el recorrido;
- qué conviene hacer ahora;
- cuánto tiempo o qué tipo de esfuerzo requiere.

Acción primaria propuesta: **Continuar con la próxima operación**. Debajo quedan accesos secundarios para buscar un concepto, elegir otra unidad o abrir una fuente.

### 2. Sesión de estudio enfocada

Cada sesión reúne un solo objeto principal —lectura, concepto o actividad— y muestra una secuencia breve:

1. ubicar la pregunta;
2. reconocer la procedencia;
3. comprender o recuperar el argumento;
4. producir una evidencia personal;
5. decidir el próximo paso.

No todos los pasos necesitan estar completos en una visita. La Memory Card conserva el estado.

### 3. Orientación persistente

En rutas profundas debe permanecer visible una orientación compacta, por ejemplo:

`Economía Política I → Unidad 3 → Marx → Valor`

En lecturas extensas conviene sumar un índice local de apartados y una acción para volver al punto actual. Esto toma de Wikipedia la estabilidad de la navegación, no su densidad enciclopédica.

### 4. Divulgación progresiva con jerarquía

- nivel 1: pregunta, estado, procedencia y acción siguiente;
- nivel 2: tesis o definición breve;
- nivel 3: desarrollo por apartados;
- nivel 4: relaciones, discusión crítica y fuentes.

Los acordeones siguen siendo útiles en los niveles 3 y 4. No deberían convertirse en la estructura completa del sitio ni anidarse repetidamente.

### 5. Progreso con significado pedagógico

Se conservan los niveles Reconocer, Comprender, Relacionar, Discutir y Producir. Una versión posterior puede pedir una evidencia mínima antes de sugerir un cambio de nivel:

- nota propia;
- respuesta a una pregunta de recuperación;
- relación entre dos conceptos;
- objeción argumentada;
- producción integradora.

No se recomiendan XP, rachas obligatorias, rankings ni recompensas por abrir pantallas. La gamificación pertinente es la visibilidad del recorrido, la continuidad y la sensación de capacidad creciente.

## Microayudas y movimiento

En mobile, la ayuda debe abrirse al tocar `?`; no puede depender del hover. En dispositivos con puntero puede aparecer una etiqueta breve, mientras que la explicación completa permanece en un diálogo accesible. Las ayudas temporales deben poder descartarse y no contener controles interactivos.

El movimiento debe comunicar:

- cambio de ruta;
- apertura de una capa;
- respuesta a una acción;
- continuidad entre estados.

Las transiciones deben ser breves y respetar `prefers-reduced-motion`. No se usa animación continua ni movimiento decorativo alrededor del texto de estudio.

## Vigilancia epistémica

La simplificación de la navegación no autoriza a simplificar indebidamente el contenido. En cada objeto académico deben preservarse:

- la distinción entre programa, autor, reconstrucción pedagógica y lectura crítica;
- el enlace a la fuente o la referencia verificable;
- el carácter provisorio de toda inferencia;
- la posibilidad de volver al texto original;
- la separación entre contenido público y elaboración personal.

## Secuencia recomendada

1. diseñar el inicio con próximo paso y accesos secundarios;
2. crear el armazón de sesión de estudio y orientación persistente;
3. relacionar el próximo paso con la Memory Card;
4. probar el recorrido en mobile con tareas reales;
5. recién después ajustar búsquedas, recomendaciones y visualización de progreso.

## Fuentes consultadas

- Wikimedia, [Desktop Improvements](https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements)
- GOV.UK Design System, [Details](https://design-system.service.gov.uk/components/details/)
- GOV.UK Design System, [Accordion](https://design-system.service.gov.uk/components/accordion/)
- Nielsen Norman Group, [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- Interaction Design Foundation, [Information Architecture](https://ixdf.org/literature/topics/information-architecture)
- freeCodeCamp, [repositorio y currículum](https://github.com/freeCodeCamp/freeCodeCamp)
- Khan Academy, [Course and Unit Mastery](https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery)
- Duolingo, [The Science Behind the Home Screen Redesign](https://blog.duolingo.com/new-duolingo-home-screen-design/)
- W3C WAI, [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- W3C WAI, [Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- W3C WAI, [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
