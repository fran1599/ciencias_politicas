const guideU1 = "https://docs.google.com/document/d/1uJFFEKiUxPkpsvbIvYjVwYEAyUdz4TA5Eu0jMnOrxZs/edit";
const summaryU1 = "https://docs.google.com/document/d/148LUoZsEbimfIAPY9uJP0TLLdxjl-dLWyAMzzfw9dlQ/edit";
const guideU2 = "https://docs.google.com/document/d/1gaWSfMh0wkFA_3Y6YbDbQPA8fDZ4raMMjpu64YQQkhg/edit";
const summaryU2 = "https://docs.google.com/document/d/1RrbzLBj5-NSlN87Mr2A4jHMAd-KNyyGX6InLKu6VPPI/edit";
const program2026 = "https://drive.google.com/file/d/10N8eAvg5X_PArx5opnfeflbr3cDAL5yN/view";
const schedule2026 = "https://drive.google.com/file/d/1eLECGSxPFV5U4-1W9KV5ekXNU_-RroWC/view";
const readingGuide = "https://drive.google.com/file/d/1oPWRAo4dB9lSsTNj5vXMpF4oysjGiv3l/view";
const compendium2026 = "https://drive.google.com/file/d/1e3npWR74pwoKGBkZq8M_wdvdKdRtFyR6/view";
const courseFolder = "https://drive.google.com/drive/folders/1bH050R8QThXZk-B1IfDhzgM1u4AvNkeT";

export const atlasData = {
  subject: {
    id: "economia-politica-i",
    name: "Economía Política I",
    institution: "FCS · UNC",
    year: 2026,
    pilotStatus: "Programa completo · contenido progresivo",
    question: "¿Cómo se constituyen históricamente las categorías económicas y qué permiten comprender de las relaciones políticas y sociales?",
    description: "Un recorrido para estudiar la constitución histórica de la economía política, discutir la autonomía aparente de lo económico y apropiarse críticamente de herramientas básicas de micro y macroeconomía.",
    programUrl: program2026,
    scheduleUrl: schedule2026,
    compendiumUrl: compendium2026,
    units: [
      {
        id: "unidad-1", number: 1, title: "El lugar de la economía y sus significados",
        question: "¿Qué llamamos economía y qué consecuencias tiene esa definición?",
        status: "Desarrollada", statusKind: "developed", guideUrl: guideU1, summaryUrl: summaryU1,
        bibliography: [
          { id: "polanyi-aristoteles", author: "Karl Polanyi", title: "Aristóteles descubre la economía", reference: "Polanyi (2012)", pages: "PDF 13–30", available: true },
          { id: "polanyi-mercado-autorregulado", author: "Karl Polanyi", title: "El mercado autorregulado y las mercancías ficticias", reference: "Polanyi (1944/2003), cap. VI", pages: "PDF 31–38", available: true },
          { author: "Karl Polanyi", title: "Introducción; La falacia económica; El doble significado del término económico", reference: "Polanyi (1977/1994)", pages: "PDF 39–68", available: false },
          { author: "Nora Britos", title: "Karl Polanyi: economía arraigada, mercancías ficticias y doble movimiento", reference: "Britos (2016), cap. I", pages: "PDF 72–145", available: false }
        ]
      },
      {
        id: "unidad-2", number: 2, title: "Interés, mercado y orden social",
        question: "¿Cómo llegó el mercado a imaginarse como principio de regulación social y política?",
        status: "Desarrollada", statusKind: "developed", guideUrl: guideU2, summaryUrl: summaryU2,
        bibliography: [
          { id: "hirschman-pasiones-intereses", author: "Albert O. Hirschman", title: "Cómo se recurrió a los intereses para contrarrestar las pasiones", reference: "Hirschman (1978), primera parte", pages: "PDF 149–180", available: true },
          { author: "Pierre Rosanvallon", title: "El mercado y las tres utopías liberales; caps. 2 y 3", reference: "Rosanvallon (1979/2006)", pages: "PDF 183–214", available: false },
          { id: "smith-division-trabajo", author: "Adam Smith", title: "División del trabajo, intercambio, extensión del mercado y mano invisible", reference: "Smith (1776/1988), I.1–3 y IV.2", pages: "PDF 225–247", available: true },
          { author: "Axel Kicillof", title: "Adam Smith y el nacimiento de la economía política clásica", reference: "Kicillof (2010), lección 1", pages: "PDF 249–273", available: false }
        ]
      },
      {
        id: "unidad-3", number: 3, title: "Los fundamentos del valor",
        question: "¿Cómo explican las teorías clásica y marginalista el valor y el intercambio?",
        status: "En curso", statusKind: "current", guideUrl: readingGuide,
        bibliography: [
          { author: "Adam Smith", title: "Origen y uso del dinero; precio real y nominal; componentes del precio", reference: "Smith (1776/1988), I.4–6", pages: "PDF 277–294", available: false },
          { author: "Axel Kicillof", title: "Adam Smith y la formación del sistema clásico", reference: "Kicillof (2010), lección 2", pages: "PDF 295–320", available: false },
          { author: "Léon Walras", title: "De la riqueza social", reference: "Walras (1874/1987), lección 3", pages: "PDF 321–330", available: false },
          { author: "Axel Kicillof", title: "La revolución marginalista", reference: "Kicillof (2010), lección 4", pages: "PDF 331–356", available: false }
        ]
      },
      {
        id: "unidad-4", number: 4, title: "Marshall y la síntesis neoclásica",
        question: "¿Cómo se construyen el equilibrio, la oferta y la demanda en la microeconomía neoclásica?",
        status: "Mapeada", statusKind: "mapped", guideUrl: readingGuide,
        bibliography: [
          { author: "Alfred Marshall", title: "Introducción; Naturaleza de la economía", reference: "Marshall (1890/1954), caps. I y II", pages: "PDF 359–372", available: false },
          { author: "Axel Kicillof", title: "El marginalismo de Marshall", reference: "Kicillof (2010), lección 5", pages: "PDF 373–397", available: false }
        ]
      },
      {
        id: "unidad-5", number: 5, title: "Keynes y conceptos básicos de macroeconomía",
        question: "¿Cómo transforma Keynes el problema del empleo, la demanda efectiva y la intervención estatal?",
        status: "Mapeada", statusKind: "mapped", guideUrl: readingGuide,
        bibliography: [
          { author: "Raúl Prebisch", title: "Prefacio", reference: "Prebisch (1947/1971)", pages: "PDF 401–405", available: false },
          { author: "John Maynard Keynes", title: "La teoría general; postulados clásicos; demanda efectiva", reference: "Keynes (1936/1956), caps. 1–3", pages: "PDF 409–426", available: false },
          { author: "Raúl Prebisch", title: "Esquema de la teoría keynesiana; salarios y precios", reference: "Prebisch (1947/1971), caps. IX–X", pages: "PDF 427–436", available: false },
          { author: "Axel Kicillof", title: "La contribución de Keynes", reference: "Kicillof (2010), lección 6", pages: "PDF 437–464", available: false },
          { author: "Mario Damill", title: "Análisis macroeconómico y marco contable", reference: "Damill (2004), caps. 1–2", pages: "PDF 465–514", available: false },
          { author: "Jeffrey Sachs y Felipe Larraín", title: "Contabilidad de la balanza de pagos", reference: "Sachs y Larraín (1994), cap. 6, apéndice", pages: "PDF 515–520", available: false }
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
      sourceLinks: [{ label: "Texto en el compendio · PDF 13–30", url: compendium2026 }, { label: "Guía de lectura · Unidad 1", url: guideU1 }, { label: "Resumen ampliado · Unidad 1", url: summaryU1 }]
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
      sourceLinks: [{ label: "Texto en el compendio · PDF 31–38", url: compendium2026 }, { label: "Guía de lectura · Unidad 1", url: guideU1 }, { label: "Resumen ampliado · Unidad 1", url: summaryU1 }]
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
      sourceLinks: [{ label: "Texto en el compendio · PDF 149–180", url: compendium2026 }, { label: "Guía de lectura · Unidad 2", url: guideU2 }, { label: "Resumen ampliado · Unidad 2", url: summaryU2 }]
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
      sourceLinks: [{ label: "Texto en el compendio · PDF 225–247", url: compendium2026 }, { label: "Guía de lectura · Unidad 2", url: guideU2 }, { label: "Resumen ampliado · Unidad 2", url: summaryU2 }]
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
    "mano-invisible": { id: "mano-invisible", name: "Mano invisible", short: "Metáfora situada sobre efectos sociales no intencionales de decisiones individuales en un argumento específico de Smith.", programLayer: "Unidad 2: mercado, intercambio y restricciones al comercio.", authorLayer: "En el pasaje trabajado, un inversor que busca seguridad y prefiere la industria doméstica puede contribuir al producto social sin proponérselo.", reconstructionLayer: "No es una ley universal según la cual todo interés privado siempre maximiza el bienestar colectivo.", criticalLayer: "Su operación presupone instituciones y no resuelve por sí sola la discusión sobre distribución o fines colectivos.", personalPrompt: "¿Qué supuestos habría que demostrar antes de atribuir un resultado social beneficioso a decisiones privadas?", related: ["interes", "division-trabajo", "valor-cambio"], readings: ["smith-division-trabajo"] },
    "valor-uso": { id: "valor-uso", name: "Valor de uso", short: "Capacidad atribuida a un bien para satisfacer una necesidad o cumplir una utilidad.", programLayer: "Unidad 3.1: controversias sobre valor, precio y riqueza en la economía política clásica.", authorLayer: "Smith distingue la utilidad de un objeto de su poder para obtener otros bienes en el intercambio.", reconstructionLayer: "La distinción permite evitar que utilidad, precio y valor se traten como sinónimos.", criticalLayer: "Reconocer una utilidad no explica por sí solo el precio ni quién puede acceder al bien.", personalPrompt: "¿Qué cambia al analizar un bien por su utilidad, su precio o las relaciones sociales que permiten producirlo?", related: ["valor-cambio", "trabajo-comandado"], readings: [] },
    "valor-cambio": { id: "valor-cambio", name: "Valor de cambio", short: "Poder de una mercancía para adquirir otras mercancías mediante el intercambio.", programLayer: "Unidad 3.1: valor y precio de las mercancías; alcances de su solapamiento conceptual.", authorLayer: "En Smith, la distinción abre el problema de encontrar una medida del valor intercambiable y conduce al trabajo como referencia.", reconstructionLayer: "No equivale automáticamente al precio monetario observado: exige distinguir medida, expresión y fluctuación.", criticalLayer: "La equivalencia mercantil no elimina las asimetrías de propiedad, negociación ni distribución.", personalPrompt: "¿Qué supuestos convierten un intercambio observable en una relación de equivalencia?", related: ["valor-uso", "trabajo-comandado", "mano-invisible"], readings: [] },
    "trabajo-comandado": { id: "trabajo-comandado", name: "Trabajo comandado", short: "Cantidad de trabajo ajeno que una mercancía permite comprar o disponer en el intercambio.", programLayer: "Unidad 3.1: teoría del valor-trabajo en Smith, conmensurabilidad y origen del beneficio.", authorLayer: "Smith recurre al trabajo que una mercancía puede comandar como medida del valor, aunque su argumento convive con otras determinaciones del precio.", reconstructionLayer: "Conviene distinguir trabajo comandado, trabajo incorporado y costos de producción: no son formulaciones intercambiables.", criticalLayer: "La categoría vuelve visible el poder social contenido en el intercambio, pero plantea dificultades para medir trabajos heterogéneos.", personalPrompt: "¿Qué relación entre propiedad y capacidad de mando aparece cuando el valor se expresa como trabajo ajeno disponible?", related: ["valor-cambio", "valor-uso", "division-trabajo"], readings: [] }
  },
  activities: [
    { id: "mapa-argumento-polanyi", operation: "Comprender", duration: "15 min", title: "Mapa del argumento de Polanyi", context: "Aristóteles descubre la economía", goal: "Separar problema, tesis y fundamentación antes de opinar sobre el texto.", steps: ["Formulá el problema del anacronismo en una pregunta.", "Escribí la tesis central en una sola oración.", "Elegí dos razones que sostienen esa tesis.", "Indicá una dificultad o límite de la argumentación."], prompt: "Problema:\n\nTesis:\n\nFundamentación:\n\nDificultad o límite:", relatedReading: "polanyi-aristoteles" },
    { id: "formal-substantivo", operation: "Relacionar", duration: "12 min", title: "Formal no significa falso", context: "Dos sentidos de lo económico", goal: "Distinguir dos categorías sin convertirlas en una oposición moral.", steps: ["Definí el sentido formal.", "Definí el sentido substantivo.", "Buscá una situación donde ambos sentidos operen juntos.", "Explicá qué oculta una lectura exclusivamente formal."], prompt: "Sentido formal:\n\nSentido substantivo:\n\nCaso donde se combinan:\n\nQué se vuelve invisible:", relatedConcept: "economia-substantiva" },
    { id: "objetar-mercancias-ficticias", operation: "Discutir", duration: "20 min", title: "Construir una objeción fuerte", context: "Mercancías ficticias", goal: "Evitar una adhesión automática reconstruyendo la mejor crítica posible al argumento.", steps: ["Explicá por qué trabajo, tierra y dinero son ficticios para Polanyi.", "Formulá una defensa del mecanismo de precios.", "Respondé desde Polanyi sin caricaturizar la objeción.", "Señalá qué cuestión queda abierta."], prompt: "Tesis de Polanyi:\n\nObjeción más fuerte:\n\nRespuesta posible:\n\nCuestión abierta:", relatedReading: "polanyi-mercado-autorregulado" },
    { id: "genealogia-interes", operation: "Relacionar", duration: "15 min", title: "Del interés privado al orden político", context: "Hirschman", goal: "Reconstruir el interés como categoría política e histórica, no como dato natural.", steps: ["Nombrá las pasiones que el interés debía moderar.", "Explicá por qué la previsibilidad se consideró valiosa.", "Relacioná esa promesa con una forma contemporánea de gobierno.", "Diferenciá estabilidad de justicia."], prompt: "Pasiones a moderar:\n\nPromesa del interés:\n\nRelación contemporánea:\n\nPor qué estabilidad no basta:", relatedReading: "hirschman-pasiones-intereses" },
    { id: "smith-en-contexto", operation: "Producir", duration: "20 min", title: "Desarmar la fórmula de la mano invisible", context: "Adam Smith", goal: "Producir un párrafo argumentativo que use la metáfora dentro de su contexto.", steps: ["Identificá el problema concreto del pasaje.", "Nombrá los supuestos institucionales.", "Explicá qué efecto no intencional describe.", "Escribí un párrafo que rechace la lectura totalizante sin negar el argumento."], prompt: "Borrador del párrafo argumentativo:", relatedReading: "smith-division-trabajo" },
    { id: "tpe-unidades-1-2", operation: "Producir", duration: "30 min", title: "Ensayo de integración para el TPE", context: "Unidades 1 y 2 · semana de exámenes", goal: "Articular dos autores alrededor de un problema común sin convertir el trabajo en una suma de resúmenes.", steps: ["Elegí un problema: autonomía de lo económico, orden social o mercado.", "Formulá una tesis discutible en una oración.", "Usá un argumento de Polanyi y otro de Hirschman, Rosanvallon o Smith.", "Marcá una tensión entre ambos autores.", "Cerrá con una consecuencia para el análisis político."], prompt: "Problema:\n\nTesis:\n\nAutor 1 y evidencia:\n\nAutor 2 y evidencia:\n\nTensión:\n\nConclusión:", relatedConcept: "interes" },
    { id: "valor-en-smith", operation: "Comprender", duration: "20 min", title: "Tres problemas del valor en Smith", context: "Unidad 3.1 · capítulos IV a VI", goal: "Distinguir dinero, medida del valor y componentes del precio antes de evaluar la teoría.", steps: ["Explicá qué problema resuelve el dinero y qué problema no resuelve.", "Diferenciá valor de uso y valor de cambio con un ejemplo.", "Separá trabajo comandado, trabajo incorporado y precio monetario.", "Ubicá salario, beneficio y renta en el precio.", "Anotá la contradicción o dificultad que te parezca central."], prompt: "Dinero:\n\nUso / cambio:\n\nTrabajo y medida:\n\nComponentes del precio:\n\nDificultad central:", relatedConcept: "valor-cambio" }
  ],
  materials: [
    { kind: "Gobernanza", title: "README — Economía Política I", description: "Alcance, fuentes vigentes y método de trabajo del espacio de la materia.", url: "https://docs.google.com/document/d/1-r677L-1nk5qjtjtXPfKjMKP15ufGNWnlVSm-UAAjOg/edit", status: "Verificado" },
    { kind: "Programa", title: "Programa 2026", description: "Fuente rectora: fundamentos, cinco unidades, bibliografía, metodología y condiciones de evaluación.", url: program2026, status: "Verificado" },
    { kind: "Cronograma", title: "Cronograma de contenidos 2026", description: "Secuencia semanal, evaluaciones y bibliografía de referencia. Fechas de evaluación declaradas provisorias por la cátedra.", url: schedule2026, status: "Verificado" },
    { kind: "Corpus", title: "Compendio bibliográfico", description: "Las veinte entradas básicas del programa reunidas en 520 páginas. El Atlas indica el rango PDF de cada lectura.", url: compendium2026, status: "Verificado" },
    { kind: "Método", title: "Guía orientadora de lectura", description: "Diez preguntas para identificar problema, tesis, fundamentación, dificultades, objeciones y aprendizajes.", url: readingGuide, status: "Verificado" },
    { kind: "Unidad 1", title: "Guías de lectura", description: "Diez operaciones de estudio aplicadas a los seis textos de la unidad.", url: guideU1, status: "Verificado" },
    { kind: "Unidad 1", title: "Resúmenes ampliados", description: "Reconstrucción del problema común, argumentos y relaciones de la unidad.", url: summaryU1, status: "Verificado" },
    { kind: "Unidad 2", title: "Guías de lectura", description: "Hirschman, Rosanvallon, Smith y Kicillof organizados por preguntas.", url: guideU2, status: "Verificado" },
    { kind: "Unidad 2", title: "Resúmenes ampliados", description: "Interés, mercado, división del trabajo y nacimiento de la economía política clásica.", url: summaryU2, status: "Verificado" },
    { kind: "Síntesis", title: "RESUMEN Economía Política I", description: "Documento principal de referencia existente para la cursada.", url: "https://docs.google.com/document/d/1swol7yB1iTckmnwqmWPvj_hlnOidwmjJfQ9P7DArzVA/edit", status: "Verificado" },
    { kind: "Carpeta", title: "Materiales oficiales de la materia", description: "Programa, cronograma, compendio, complementarios, técnicas de estudio y resumen compartido.", url: courseFolder, status: "Verificado" },
    { kind: "Carpeta", title: "Espacio de elaboración del proyecto", description: "Guías y resúmenes producidos para acompañar el estudio.", url: "https://drive.google.com/drive/folders/19wTBmy0X2da_nJsGKMOIzjxrdD9tkEG2", status: "Verificado" },
    { kind: "Apoyo", title: "Leer para escribir", description: "Material de apoyo para transformar lectura académica en producción escrita.", url: "https://drive.google.com/file/d/1voe01kNpSOLVw2kEIUFvSUBclGd7VR1M/view", status: "Verificado" },
    { kind: "Apoyo", title: "Técnicas de estudio", description: "Material complementario para organizar el trabajo de estudio.", url: "https://drive.google.com/file/d/1DT0BeGr4OggJEFPznlXeTbD6-I2b6kNG/view", status: "Verificado" }
  ],
  levels: [
    { id: 1, name: "Reconocer", hint: "Identifico la tesis y los conceptos." },
    { id: 2, name: "Comprender", hint: "Puedo explicarlos con mis palabras." },
    { id: 3, name: "Relacionar", hint: "Los conecto con otros textos y problemas." },
    { id: 4, name: "Discutir", hint: "Reconozco objeciones y límites." },
    { id: 5, name: "Producir", hint: "Los uso en una elaboración propia." }
  ]
};
