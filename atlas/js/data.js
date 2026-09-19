export const atlasData = {
  subject: {
    id: "economia-politica-i",
    name: "Economía Política I",
    institution: "FCS · UNC",
    year: 2026,
    pilotStatus: "Piloto documental",
    question: "¿Qué llamamos economía y qué consecuencias tiene esa definición?",
    description:
      "Un recorrido histórico y sociológico para distinguir el sustento humano de la economía de mercado y examinar las instituciones que hacen posible cada forma de provisión.",
    units: [
      {
        id: "unidad-1",
        number: 1,
        title: "Economía, mercado y sustento",
        status: "En curso",
        readings: ["polanyi-aristoteles"],
        concepts: ["economia-substantiva", "economia-encastrada", "mercancias-ficticias"]
      }
    ]
  },
  readings: {
    "polanyi-aristoteles": {
      id: "polanyi-aristoteles",
      title: "Aristóteles descubre la economía",
      author: "Karl Polanyi",
      unit: "Unidad 1",
      type: "Texto obligatorio",
      sourceStatus: "Reconstrucción pedagógica",
      centralQuestion: "¿Por qué intercambio, dinero y comercio no equivalen necesariamente a una economía de mercado?",
      thesis:
        "Polanyi usa a Aristóteles para mostrar que la economía no constituye siempre una esfera autónoma: en la polis, las prácticas de provisión e intercambio permanecen subordinadas a instituciones políticas y comunitarias.",
      sections: [
        {
          title: "El problema del anacronismo",
          paragraphs: [
            "Leer la Antigüedad con las categorías de una sociedad de mercado hace aparecer a Aristóteles como un economista incompleto. Polanyi invierte el problema: la ausencia de una teoría moderna de precios no es una carencia del autor, sino una señal de que observaba otro orden institucional.",
            "La existencia de moneda, comerciantes o transferencias de bienes no prueba que los mercados coordinaran el conjunto de la vida social. Para comprender esa sociedad hay que preguntar qué instituciones organizaban el sustento y qué lugar ocupaba el intercambio dentro de la comunidad."
          ]
        },
        {
          title: "Autarquía, reciprocidad y philia",
          paragraphs: [
            "La autarquía no significa aislamiento absoluto. Refiere a la capacidad de la comunidad para procurar las condiciones de su vida sin quedar organizada por una búsqueda ilimitada de dinero. En ese marco, la reciprocidad y la justicia regulan los intercambios.",
            "La philia no es sólo amistad privada: nombra el vínculo que sostiene a la comunidad política. El intercambio es aceptable mientras sirve a la provisión y conserva una equivalencia compatible con ese vínculo; se vuelve problemático cuando la ganancia se independiza de las necesidades."
          ]
        },
        {
          title: "La lección metodológica",
          paragraphs: [
            "El argumento no idealiza a la polis: reconoce jerarquías, ciudadanía restringida y esclavitud. Su alcance es metodológico. Las categorías económicas son históricas; no deben proyectarse como si fueran neutrales y universales.",
            "Esta lectura abre la distinción entre el significado formal de lo económico —elección entre fines y medios escasos— y su significado substantivo: el proceso instituido por el cual una sociedad asegura sus medios de vida."
          ]
        }
      ],
      relatedConcepts: ["economia-substantiva", "economia-encastrada"],
      sourceLinks: [
        {
          label: "Guías de lectura · Unidad 1",
          url: "https://docs.google.com/document/d/1uJFFEKiUxPkpsvbIvYjVwYEAyUdz4TA5Eu0jMnOrxZs/edit"
        },
        {
          label: "Resúmenes ampliados · Unidad 1",
          url: "https://docs.google.com/document/d/148LUoZsEbimfIAPY9uJP0TLLdxjl-dLWyAMzzfw9dlQ/edit"
        }
      ]
    }
  },
  concepts: {
    "economia-substantiva": {
      id: "economia-substantiva",
      name: "Economía substantiva",
      short: "Proceso instituido mediante el cual las personas procuran sus medios de vida en relación con la naturaleza y entre sí.",
      programLayer: "Unidad 1: problematización de la separación entre economía y política.",
      authorLayer: "En Polanyi, deriva de la dependencia material humana respecto de la naturaleza y de otras personas; no presupone mercado ni maximización.",
      reconstructionLayer: "Sirve para mirar quién organiza el sustento, bajo qué reglas y mediante qué instituciones, antes de reducirlo a decisiones de mercado.",
      criticalLayer: "No debe confundirse “substantivo” con moralmente bueno: también puede describir órdenes jerárquicos o excluyentes.",
      personalPrompt: "¿Qué instituciones garantizan hoy mi sustento y cuáles quedan ocultas si observo sólo intercambios monetarios?",
      related: ["economia-encastrada", "mercancias-ficticias"],
      readings: ["polanyi-aristoteles"]
    },
    "economia-encastrada": {
      id: "economia-encastrada",
      name: "Economía encastrada",
      short: "Actividades de provisión integradas en relaciones políticas, sociales y culturales más amplias.",
      programLayer: "Unidad 1: carácter histórico e institucional de las formas económicas.",
      authorLayer: "La lectura polanyiana rechaza una economía naturalmente separada; sus actividades están arraigadas en instituciones sociales.",
      reconstructionLayer: "El concepto permite preguntar qué vínculos y autoridades organizan una práctica económica concreta.",
      criticalLayer: "Arraigo no equivale a armonía: las instituciones que integran la economía pueden reproducir dominación y desigualdad.",
      personalPrompt: "¿En qué relaciones no mercantiles se apoya una plataforma digital que parece funcionar como mercado autónomo?",
      related: ["economia-substantiva", "mercancias-ficticias"],
      readings: ["polanyi-aristoteles"]
    },
    "mercancias-ficticias": {
      id: "mercancias-ficticias",
      name: "Mercancías ficticias",
      short: "Trabajo, tierra y dinero tratados como mercancías aunque no fueron producidos para su venta.",
      programLayer: "Unidad 1: mercado autorregulado, mercantilización y derechos sociales.",
      authorLayer: "Para Polanyi, la ficción no significa que sean irreales o no tengan precio, sino que someterlos enteramente al mercado compromete la reproducción social y natural.",
      reconstructionLayer: "Convierte precios aparentemente técnicos —salario, suelo, crédito— en preguntas políticas e institucionales.",
      criticalLayer: "La regulación no llega desde afuera de un mercado puro: participa en la creación y reproducción de los propios mercados.",
      personalPrompt: "¿Qué consecuencias distributivas aparecen cuando el acceso a vivienda depende de tratar suelo y crédito sólo como activos?",
      related: ["economia-substantiva", "economia-encastrada"],
      readings: []
    }
  },
  levels: [
    { id: 1, name: "Reconocer", hint: "Identifico la tesis y los conceptos." },
    { id: 2, name: "Comprender", hint: "Puedo explicarlos con mis palabras." },
    { id: 3, name: "Relacionar", hint: "Los conecto con otros textos y problemas." },
    { id: 4, name: "Discutir", hint: "Reconozco objeciones y límites." },
    { id: 5, name: "Producir", hint: "Los uso en una elaboración propia." }
  ]
};
