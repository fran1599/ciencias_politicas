const guideU1 = "https://docs.google.com/document/d/1uJFFEKiUxPkpsvbIvYjVwYEAyUdz4TA5Eu0jMnOrxZs/edit";
const summaryU1 = "https://docs.google.com/document/d/148LUoZsEbimfIAPY9uJP0TLLdxjl-dLWyAMzzfw9dlQ/edit";
const guideU2 = "https://docs.google.com/document/d/1gaWSfMh0wkFA_3Y6YbDbQPA8fDZ4raMMjpu64YQQkhg/edit";
const summaryU2 = "https://docs.google.com/document/d/1RrbzLBj5-NSlN87Mr2A4jHMAd-KNyyGX6InLKu6VPPI/edit";

export const atlasData = {
  subject: {
    id: "economia-politica-i",
    name: "Economía Política I",
    institution: "FCS · UNC",
    year: 2026,
    pilotStatus: "Piloto documental",
    question: "¿Cómo se constituyen históricamente la economía de mercado y la economía política?",
    description: "Un recorrido para desnaturalizar la separación entre economía y política, reconstruir el mercado como institución histórica y estudiar las categorías de la economía política clásica.",
    units: [
      {
        id: "unidad-1", number: 1, title: "Economía, mercado y sustento",
        question: "¿Qué llamamos economía y qué consecuencias tiene esa definición?",
        guideUrl: guideU1, summaryUrl: summaryU1,
        bibliography: [
          { id: "polanyi-aristoteles", author: "Karl Polanyi", title: "Aristóteles descubre la economía", available: true },
          { id: "polanyi-mercado-autorregulado", author: "Karl Polanyi", title: "El mercado autorregulado y las mercancías ficticias", available: true },
          { author: "Karl Polanyi", title: "El sustento del hombre: Introducción", available: false },
          { author: "Karl Polanyi", title: "La falacia económica", available: false },
          { author: "Karl Polanyi", title: "El doble significado del término económico", available: false },
          { author: "Nora Britos", title: "Economía arraigada, mercancías ficticias y doble movimiento", available: false }
        ]
      },
      {
        id: "unidad-2", number: 2, title: "Interés, mercado y orden social",
        question: "¿Cómo llegó el mercado a imaginarse como principio de regulación social y política?",
        guideUrl: guideU2, summaryUrl: summaryU2,
        bibliography: [
          { id: "hirschman-pasiones-intereses", author: "Albert O. Hirschman", title: "Las pasiones y los intereses", available: true },
          { author: "Pierre Rosanvallon", title: "El mercado y las tres utopías liberales", available: false },
          { author: "Pierre Rosanvallon", title: "La economía como realización de la política", available: false },
          { author: "Pierre Rosanvallon", title: "El nuevo comercio o la sociedad como mercado", available: false },
          { id: "smith-division-trabajo", author: "Adam Smith", title: "División del trabajo, intercambio y extensión del mercado", available: true },
          { author: "Axel Kicillof", title: "Adam Smith y el nacimiento de la economía política clásica", available: false }
        ]
      }
    ]
  },
  readings: {
    "polanyi-aristoteles": {
      id: "polanyi-aristoteles", title: "Aristóteles descubre la economía", author: "Karl Polanyi", unit: "Unidad 1",
      type: "Texto obligatorio", sourceStatus: "Reconstrucción pedagógica",
      centralQuestion: "¿Por qué intercambio, dinero y comercio no equivalen necesariamente a una economía de mercado?",
      thesis: "Polanyi usa a Aristóteles para mostrar que la economía no constituye siempre una esfera autónoma: en la polis, las prácticas de provisión e intercambio permanecen subordinadas a instituciones políticas y comunitarias.",
      sections: [
        { title: "El problema del anacronismo", paragraphs: ["Leer la Antigüedad con las categorías de una sociedad de mercado hace aparecer a Aristóteles como un economista incompleto. Polanyi invierte el problema: la ausencia de una teoría moderna de precios señala que observaba otro orden institucional.", "La existencia de moneda, comerciantes o transferencias no prueba que los mercados coordinaran el conjunto de la vida social. Hay que preguntar qué instituciones organizaban el sustento y qué lugar ocupaba el intercambio dentro de la comunidad."] },
        { title: "Autarquía, reciprocidad y philia", paragraphs: ["La autarquía no significa aislamiento absoluto. Refiere a la capacidad de la comunidad para procurar las condiciones de su vida sin quedar organizada por una búsqueda ilimitada de dinero.", "La philia no es sólo amistad privada: nombra el vínculo que sostiene a la comunidad política. El intercambio sirve a la provisión mientras conserva una equivalencia compatible con ese vínculo."] },
        { title: "La lección metodológica", paragraphs: ["El argumento no idealiza a la polis: reconoce jerarquías, ciudadanía restringida y esclavitud. Su alcance es metodológico. Las categorías económicas son históricas; no deben proyectarse como si fueran neutrales y universales.", "Esta lectura abre la distinción entre el significado formal de lo económico —elección entre fines y medios escasos— y su significado substantivo: el proceso instituido por el cual una sociedad asegura sus medios de vida."] }
      ],
      relatedConcepts: ["economia-substantiva", "economia-encastrada"], relatedActivities: ["mapa-argumento-polanyi", "formal-substantivo"],
      sourceLinks: [{ label: "Guía de lectura · Unidad 1", url: guideU1 }, { label: "Resumen ampliado · Unidad 1", url: summaryU1 }]
    },
    "polanyi-mercado-autorregulado": {
      id: "polanyi-mercado-autorregulado", title: "El mercado autorregulado y las mercancías ficticias", author: "Karl Polanyi", unit: "Unidad 1",
      type: "Texto obligatorio", sourceStatus: "Reconstrucción pedagógica",
      centralQuestion: "¿Qué debe ocurrir para que el mercado pretenda coordinar la producción y la distribución del conjunto social?",
      thesis: "Una sociedad de mercado necesita tratar trabajo, tierra y dinero como mercancías, aunque ninguno haya sido producido para venderse; someterlos enteramente al mecanismo mercantil amenaza las bases sociales y naturales de la vida.",
      sections: [
        { title: "La ficción mercantil", paragraphs: ["Una mercancía, en sentido estricto, es algo producido para la venta. El trabajo remite a la actividad y la vida de las personas; la tierra, a la naturaleza; el dinero, a una institución de poder de compra y pagos. Por eso son mercancías ficticias.", "Ficticias no significa irreales ni carentes de precio. La ficción consiste en regular su oferta y demanda como si fueran bienes ordinarios sin consecuencias sobre la reproducción social."] },
        { title: "Un problema político e institucional", paragraphs: ["Salarios, desempleo, vivienda, renta, crédito y moneda dejan de aparecer como resultados puramente técnicos. Las reglas que los organizan distribuyen seguridad, riesgos y poder.", "El mercado no surge ni funciona fuera de la política: depende de normas jurídicas, autoridades monetarias, decisiones públicas y conflictos colectivos."] },
        { title: "Alcance de la crítica", paragraphs: ["Polanyi no afirma que todo intercambio sea imposible o ilegítimo. Discute el proyecto de convertir al mercado autorregulado en principio ordenador sin límites.", "Las respuestas protectoras tampoco son automáticamente emancipadoras: pueden ser universales, selectivas o excluyentes. Su contenido debe examinarse históricamente."] }
      ],
      relatedConcepts: ["mercado-autorregulado", "mercancias-ficticias", "doble-movimiento", "desmercantilizacion"], relatedActivities: ["objetar-mercancias-ficticias"],
      sourceLinks: [{ label: "Guía de lectura · Unidad 1", url: guideU1 }, { label: "Resumen ampliado · Unidad 1", url: summaryU1 }]
    },
    "hirschman-pasiones-intereses": {
      id: "hirschman-pasiones-intereses", title: "Las pasiones y los intereses", author: "Albert O. Hirschman", unit: "Unidad 2",
      type: "Texto obligatorio", sourceStatus: "Reconstrucción pedagógica",
      centralQuestion: "¿Cómo llegó el interés económico a justificarse como una fuerza capaz de moderar pasiones políticas peligrosas?",
      thesis: "Antes de presentarse como natural, la búsqueda de interés fue defendida como una pasión relativamente tranquila y previsible que podía contrapesar la violencia, la gloria y el afán de poder.",
      sections: [
        { title: "Una genealogía del interés", paragraphs: ["Hirschman reconstruye una transformación en la manera de pensar la conducta y el orden político. La ganancia no fue siempre una motivación moralmente aceptada: necesitó una justificación.", "El interés prometía volver las conductas calculables y previsibles. Comercio y actividad económica podían presentarse como fuerzas de pacificación."] },
        { title: "Interés no es naturaleza humana", paragraphs: ["La tesis no sostiene una evolución lineal hacia la racionalidad ni afirma que el interés sea bueno en sí mismo. Describe una operación intelectual e histórica.", "Interés tampoco equivale sin más al egoísmo contemporáneo: condensa una teoría de gobierno que espera efectos públicos estables de motivaciones privadas."] },
        { title: "La pregunta que permanece", paragraphs: ["La previsibilidad puede ayudar a contener ciertas pasiones, pero no garantiza justicia, igualdad ni cooperación libre de dominación.", "La crítica debe preguntar qué conductas se vuelven gobernables, quién define los intereses legítimos y qué conflictos quedan fuera de esa gramática."] }
      ],
      relatedConcepts: ["interes", "economia-encastrada"], relatedActivities: ["genealogia-interes"],
      sourceLinks: [{ label: "Guía de lectura · Unidad 2", url: guideU2 }, { label: "Resumen ampliado · Unidad 2", url: summaryU2 }]
    },
    "smith-division-trabajo": {
      id: "smith-division-trabajo", title: "División del trabajo, intercambio y extensión del mercado", author: "Adam Smith", unit: "Unidad 2",
      type: "Selección obligatoria", sourceStatus: "Reconstrucción pedagógica",
      centralQuestion: "¿Cómo se relacionan productividad, especialización, intercambio y extensión del mercado?",
      thesis: "La división del trabajo incrementa la productividad mediante destreza, ahorro de tiempo y uso de técnicas, pero su desarrollo depende de la posibilidad de intercambiar y de la extensión del mercado.",
      sections: [
        { title: "La fábrica de alfileres", paragraphs: ["La fragmentación de una tarea compleja en operaciones específicas multiplica el producto. Smith identifica mayor destreza, ahorro de tiempo y máquinas o procedimientos que facilitan el trabajo.", "La especialización tiene una dimensión técnica, pero también organiza ocupaciones, interdependencias y relaciones sociales."] },
        { title: "Intercambio y extensión del mercado", paragraphs: ["Para Smith, la división del trabajo no surge de un plan colectivo: se vincula con la propensión a trocar, permutar e intercambiar.", "El tamaño del mercado establece un límite. Sin suficientes intercambiantes, una persona no puede sostener una ocupación muy especializada."] },
        { title: "Evitar la mano invisible total", paragraphs: ["La metáfora de la mano invisible aparece en una discusión situada sobre restricciones a importaciones e inversión doméstica.", "No prueba que todo interés privado produzca siempre bienestar colectivo ni vuelve innecesarias las instituciones públicas. El argumento presupone un marco jurídico e institucional."] }
      ],
      relatedConcepts: ["division-trabajo", "mano-invisible", "interes"], relatedActivities: ["smith-en-contexto"],
      sourceLinks: [{ label: "Guía de lectura · Unidad 2", url: guideU2 }, { label: "Resumen ampliado · Unidad 2", url: summaryU2 }]
    }
  },
  concepts: {
    "economia-substantiva": { id: "economia-substantiva", name: "Economía substantiva", short: "Proceso instituido mediante el cual las personas procuran sus medios de vida en relación con la naturaleza y entre sí.", programLayer: "Unidad 1: problematización de la separación entre economía y política.", authorLayer: "En Polanyi, deriva de la dependencia material humana respecto de la naturaleza y de otras personas; no presupone mercado ni maximización.", reconstructionLayer: "Permite mirar quién organiza el sustento, bajo qué reglas y mediante qué instituciones, antes de reducirlo a decisiones de mercado.", criticalLayer: "Substantivo no significa moralmente bueno: también puede describir órdenes jerárquicos o excluyentes.", personalPrompt: "¿Qué instituciones garantizan hoy mi sustento y cuáles quedan ocultas si observo sólo intercambios monetarios?", related: ["economia-encastrada", "mercancias-ficticias", "mercado-autorregulado"], readings: ["polanyi-aristoteles"] },
    "economia-encastrada": { id: "economia-encastrada", name: "Economía encastrada", short: "Actividades de provisión integradas en relaciones políticas, sociales y culturales más amplias.", programLayer: "Unidad 1: carácter histórico e institucional de las formas económicas.", authorLayer: "La lectura polanyiana rechaza una economía naturalmente separada; sus actividades están arraigadas en instituciones sociales.", reconstructionLayer: "Permite preguntar qué vínculos y autoridades organizan una práctica económica concreta.", criticalLayer: "Arraigo no equivale a armonía: las instituciones pueden reproducir dominación y desigualdad.", personalPrompt: "¿En qué relaciones no mercantiles se apoya una plataforma que parece funcionar como mercado autónomo?", related: ["economia-substantiva", "mercado-autorregulado", "interes"], readings: ["polanyi-aristoteles", "hirschman-pasiones-intereses"] },
    "mercancias-ficticias": { id: "mercancias-ficticias", name: "Mercancías ficticias", short: "Trabajo, tierra y dinero tratados como mercancías aunque no fueron producidos para su venta.", programLayer: "Unidad 1: mercado autorregulado, mercantilización y derechos sociales.", authorLayer: "Para Polanyi, la ficción no significa que sean irreales, sino que someterlos enteramente al mercado compromete la reproducción social y natural.", reconstructionLayer: "Convierte salario, suelo y crédito en preguntas políticas e institucionales.", criticalLayer: "La regulación participa en la creación y reproducción de los mercados; no llega simplemente desde afuera.", personalPrompt: "¿Qué consecuencias distributivas aparecen cuando vivienda, suelo y crédito se tratan sólo como activos?", related: ["mercado-autorregulado", "doble-movimiento", "desmercantilizacion"], readings: ["polanyi-mercado-autorregulado"] },
    "mercado-autorregulado": { id: "mercado-autorregulado", name: "Mercado autorregulado", short: "Proyecto de coordinar producción y distribución mediante mercados formadores de precios que pretenden regularse por sí mismos.", programLayer: "Unidad 1: constitución histórica de la sociedad de mercado.", authorLayer: "Polanyi lo analiza como una construcción institucional que requiere convertir trabajo, tierra y dinero en mercancías.", reconstructionLayer: "No designa cualquier mercado, sino la pretensión de que el mecanismo mercantil ordene ámbitos decisivos de la vida.", criticalLayer: "Debe distinguirse el ideal autorregulado de los mercados históricos, siempre sostenidos por normas y autoridades.", personalPrompt: "¿Qué decisiones públicas hacen posible un mercado que luego se presenta como autónomo?", related: ["mercancias-ficticias", "doble-movimiento", "economia-encastrada"], readings: ["polanyi-mercado-autorregulado"] },
    "doble-movimiento": { id: "doble-movimiento", name: "Doble movimiento", short: "Tensión entre expansión de la mercantilización y respuestas sociales e institucionales de protección.", programLayer: "Unidad 1: mercantilización, protección y derechos sociales.", authorLayer: "Britos recupera a Polanyi para analizar resistencias, regulaciones, bienestar y otras respuestas protectoras.", reconstructionLayer: "Permite observar conflictos entre ampliación del mercado y protección de las condiciones de vida.", criticalLayer: "No es una ley automática ni garantiza una respuesta progresiva: también puede producir protecciones selectivas o excluyentes.", personalPrompt: "¿Qué grupos son protegidos y cuáles quedan afuera en una respuesta concreta a la mercantilización?", related: ["mercado-autorregulado", "mercancias-ficticias", "desmercantilizacion"], readings: ["polanyi-mercado-autorregulado"] },
    "desmercantilizacion": { id: "desmercantilizacion", name: "Desmercantilización", short: "Reducción de la dependencia directa del mercado para acceder a bienestar, seguridad y derechos.", programLayer: "Unidad 1: derechos sociales y formas de protección.", authorLayer: "En la lectura de Britos, refiere a políticas e instituciones que limitan la dependencia de la venta de fuerza de trabajo.", reconstructionLayer: "Ayuda a diferenciar protección, acceso efectivo y autonomía.", criticalLayer: "No equivale a abolir intercambios ni asegura igualdad o emancipación por sí misma.", personalPrompt: "¿Una política protege, desmercantiliza o emancipa? ¿Qué evidencia permitiría distinguirlo?", related: ["doble-movimiento", "mercancias-ficticias"], readings: ["polanyi-mercado-autorregulado"] },
    "interes": { id: "interes", name: "Interés", short: "Categoría histórica que vuelve ciertas motivaciones privadas calculables y políticamente gobernables.", programLayer: "Unidad 2: pasiones, intereses y génesis del orden liberal.", authorLayer: "Hirschman muestra cómo el interés fue valorado por su promesa de moderar pasiones violentas y volver previsible la conducta.", reconstructionLayer: "No es sólo egoísmo: funciona como una teoría acerca de cómo producir estabilidad social desde motivaciones privadas.", criticalLayer: "Previsibilidad no equivale a justicia; hay que preguntar qué intereses se legitiman y qué relaciones de poder se ocultan.", personalPrompt: "¿Qué gana y qué pierde una explicación política cuando traduce todas las motivaciones al lenguaje del interés?", related: ["mano-invisible", "division-trabajo", "economia-encastrada"], readings: ["hirschman-pasiones-intereses", "smith-division-trabajo"] },
    "division-trabajo": { id: "division-trabajo", name: "División del trabajo", short: "Especialización de tareas que incrementa la productividad y reorganiza interdependencias sociales.", programLayer: "Unidad 2: Smith y la economía política clásica.", authorLayer: "Smith la vincula con destreza, ahorro de tiempo, innovación, propensión al intercambio y extensión del mercado.", reconstructionLayer: "Debe leerse simultáneamente como mecanismo técnico, relación social y articulación territorial.", criticalLayer: "El aumento del producto no informa por sí solo cómo se distribuyen capacidades, cargas y beneficios.", personalPrompt: "¿Qué dependencias crea la especialización además de aumentar la productividad?", related: ["interes", "mano-invisible"], readings: ["smith-division-trabajo"] },
    "mano-invisible": { id: "mano-invisible", name: "Mano invisible", short: "Metáfora situada sobre efectos sociales no intencionales de decisiones individuales en un argumento específico de Smith.", programLayer: "Unidad 2: mercado, intercambio y restricciones al comercio.", authorLayer: "En el pasaje trabajado, un inversor que busca seguridad y prefiere la industria doméstica puede contribuir al producto social sin proponérselo.", reconstructionLayer: "No es una ley universal según la cual todo interés privado siempre maximiza el bienestar colectivo.", criticalLayer: "Su operación presupone instituciones y no resuelve por sí sola la discusión sobre distribución o fines colectivos.", personalPrompt: "¿Qué supuestos habría que demostrar antes de atribuir un resultado social beneficioso a decisiones privadas?", related: ["interes", "division-trabajo"], readings: ["smith-division-trabajo"] }
  },
  activities: [
    { id: "mapa-argumento-polanyi", operation: "Comprender", duration: "15 min", title: "Mapa del argumento de Polanyi", context: "Aristóteles descubre la economía", goal: "Separar problema, tesis y fundamentación antes de opinar sobre el texto.", steps: ["Formulá el problema del anacronismo en una pregunta.", "Escribí la tesis central en una sola oración.", "Elegí dos razones que sostienen esa tesis.", "Indicá una dificultad o límite de la argumentación."], prompt: "Problema:\n\nTesis:\n\nFundamentación:\n\nDificultad o límite:", relatedReading: "polanyi-aristoteles" },
    { id: "formal-substantivo", operation: "Relacionar", duration: "12 min", title: "Formal no significa falso", context: "Dos sentidos de lo económico", goal: "Distinguir dos categorías sin convertirlas en una oposición moral.", steps: ["Definí el sentido formal.", "Definí el sentido substantivo.", "Buscá una situación donde ambos sentidos operen juntos.", "Explicá qué oculta una lectura exclusivamente formal."], prompt: "Sentido formal:\n\nSentido substantivo:\n\nCaso donde se combinan:\n\nQué se vuelve invisible:", relatedConcept: "economia-substantiva" },
    { id: "objetar-mercancias-ficticias", operation: "Discutir", duration: "20 min", title: "Construir una objeción fuerte", context: "Mercancías ficticias", goal: "Evitar una adhesión automática reconstruyendo la mejor crítica posible al argumento.", steps: ["Explicá por qué trabajo, tierra y dinero son ficticios para Polanyi.", "Formulá una defensa del mecanismo de precios.", "Respondé desde Polanyi sin caricaturizar la objeción.", "Señalá qué cuestión queda abierta."], prompt: "Tesis de Polanyi:\n\nObjeción más fuerte:\n\nRespuesta posible:\n\nCuestión abierta:", relatedReading: "polanyi-mercado-autorregulado" },
    { id: "genealogia-interes", operation: "Relacionar", duration: "15 min", title: "Del interés privado al orden político", context: "Hirschman", goal: "Reconstruir el interés como categoría política e histórica, no como dato natural.", steps: ["Nombrá las pasiones que el interés debía moderar.", "Explicá por qué la previsibilidad se consideró valiosa.", "Relacioná esa promesa con una forma contemporánea de gobierno.", "Diferenciá estabilidad de justicia."], prompt: "Pasiones a moderar:\n\nPromesa del interés:\n\nRelación contemporánea:\n\nPor qué estabilidad no basta:", relatedReading: "hirschman-pasiones-intereses" },
    { id: "smith-en-contexto", operation: "Producir", duration: "20 min", title: "Desarmar la fórmula de la mano invisible", context: "Adam Smith", goal: "Producir un párrafo argumentativo que use la metáfora dentro de su contexto.", steps: ["Identificá el problema concreto del pasaje.", "Nombrá los supuestos institucionales.", "Explicá qué efecto no intencional describe.", "Escribí un párrafo que rechace la lectura totalizante sin negar el argumento."], prompt: "Borrador del párrafo argumentativo:", relatedReading: "smith-division-trabajo" }
  ],
  materials: [
    { kind: "Gobernanza", title: "README — Economía Política I", description: "Alcance, fuentes vigentes y método de trabajo del espacio de la materia.", url: "https://docs.google.com/document/d/1-r677L-1nk5qjtjtXPfKjMKP15ufGNWnlVSm-UAAjOg/edit", status: "Verificado" },
    { kind: "Programa", title: "Programa 2026", description: "El README lo identifica como fuente rectora, pero el archivo original no está disponible desde el Drive conectado.", url: null, status: "Enlace pendiente" },
    { kind: "Unidad 1", title: "Guías de lectura", description: "Diez operaciones de estudio aplicadas a los seis textos de la unidad.", url: guideU1, status: "Verificado" },
    { kind: "Unidad 1", title: "Resúmenes ampliados", description: "Reconstrucción del problema común, argumentos y relaciones de la unidad.", url: summaryU1, status: "Verificado" },
    { kind: "Unidad 2", title: "Guías de lectura", description: "Hirschman, Rosanvallon, Smith y Kicillof organizados por preguntas.", url: guideU2, status: "Verificado" },
    { kind: "Unidad 2", title: "Resúmenes ampliados", description: "Interés, mercado, división del trabajo y nacimiento de la economía política clásica.", url: summaryU2, status: "Verificado" },
    { kind: "Síntesis", title: "RESUMEN Economía Política I", description: "Documento principal de referencia existente para la cursada.", url: "https://docs.google.com/document/d/1swol7yB1iTckmnwqmWPvj_hlnOidwmjJfQ9P7DArzVA/edit", status: "Verificado" },
    { kind: "Carpeta", title: "Economía Política I", description: "Espacio organizado de guías y resúmenes del proyecto.", url: "https://drive.google.com/drive/folders/19wTBmy0X2da_nJsGKMOIzjxrdD9tkEG2", status: "Verificado" }
  ],
  levels: [
    { id: 1, name: "Reconocer", hint: "Identifico la tesis y los conceptos." },
    { id: 2, name: "Comprender", hint: "Puedo explicarlos con mis palabras." },
    { id: 3, name: "Relacionar", hint: "Los conecto con otros textos y problemas." },
    { id: 4, name: "Discutir", hint: "Reconozco objeciones y límites." },
    { id: 5, name: "Producir", hint: "Los uso en una elaboración propia." }
  ]
};
