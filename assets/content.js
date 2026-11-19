window.BOOK_CONTENT = {
  "version": "0.3",
  "source": "Manual_IA_Trabajo_Social_v02.docx",
  "front": [
    {
      "type": "p",
      "text": "MANUAL PROFESIONAL · EDICIÓN DE TRABAJO"
    },
    {
      "type": "h2",
      "text": "Inteligencia artificial aplicada al Trabajo Social"
    },
    {
      "type": "p",
      "text": "ChatGPT · investigación académica · RStudio · Stata · ATLAS.ti · Windows 11"
    },
    {
      "type": "p",
      "text": "Guía de aprendizaje inicial-intermedio para una profesional que ya utiliza software de investigación y desea incorporar IA con criterio metodológico."
    },
    {
      "type": "p",
      "text": "Versión 0.2 | Contenido integrado y ejercicios reproducibles | 17 de noviembre de 2026"
    },
    {
      "type": "p",
      "text": "ESTADO: material de formación en revisión. No acredita ejecución de programas ni confirmación de las funciones exactas de la notebook."
    },
    {
      "type": "h2",
      "text": "Cómo usar este manual"
    },
    {
      "type": "p",
      "text": "1. Leé el objetivo de cada módulo y realizá el ejercicio de práctica."
    },
    {
      "type": "p",
      "text": "2. Ejecutá los ejemplos únicamente con los datos ficticios proporcionados."
    },
    {
      "type": "p",
      "text": "3. Compará las salidas obtenidas con los resultados esperados."
    },
    {
      "type": "p",
      "text": "4. Consultá con IA cuando algo no se entienda, pero verificá las respuestas en el programa y en fuentes originales."
    },
    {
      "type": "p",
      "text": "5. No cargues historias sociales, entrevistas identificables, expedientes ni datos personales en asistentes públicos sin autorización institucional válida."
    },
    {
      "type": "h2",
      "text": "Ruta de aprendizaje"
    },
    {
      "type": "table",
      "rows": [
        [
          "Módulo",
          "Resultado de aprendizaje"
        ],
        [
          "1",
          "Hacer instrucciones precisas y revisar respuestas"
        ],
        [
          "2",
          "Organizar proyectos, archivos y fuentes"
        ],
        [
          "3",
          "Diseñar investigación y búsqueda bibliográfica"
        ],
        [
          "4",
          "Analizar datos ficticios con R y Stata"
        ],
        [
          "5",
          "Codificar testimonios ficticios en ATLAS.ti"
        ],
        [
          "6",
          "Crear documentos, proyectos y presentaciones"
        ],
        [
          "7",
          "Proteger información y auditar decisiones"
        ]
      ]
    }
  ],
  "modules": [
    {
      "id": 1,
      "title": "ChatGPT como asistente metodológico",
      "blocks": [
        {
          "type": "p",
          "text": "La IA generativa produce texto, ayuda a organizar ideas y puede proponer código. No constituye evidencia científica ni valida por sí sola un análisis. Un resultado plausible puede ser incorrecto."
        },
        {
          "type": "h2",
          "text": "Método de los cinco elementos"
        },
        {
          "type": "table",
          "rows": [
            [
              "Elemento",
              "Pregunta útil"
            ],
            [
              "Rol",
              "¿Qué perspectiva especializada necesito?"
            ],
            [
              "Contexto",
              "¿Qué población, territorio y método están involucrados?"
            ],
            [
              "Objetivo",
              "¿Qué producto concreto espero?"
            ],
            [
              "Restricciones",
              "¿Qué no debe inventar, asumir o modificar?"
            ],
            [
              "Formato",
              "¿Tabla, matriz, lista de verificaciones o borrador?"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Actuá como asistente metodológico en Trabajo Social. Estoy explorando barreras de acceso a programas sociales en un territorio aún no definido. Proponé una matriz preliminar de dimensiones, indicadores y fuentes posibles. Diferenciá hipótesis de evidencia; no inventes datos, testimonios ni citas. Presentá la respuesta en una tabla y cerrá con cinco preguntas que necesito resolver."
        },
        {
          "type": "h2",
          "text": "Ejercicio"
        },
        {
          "type": "p",
          "text": "1. Copiá el prompt en ChatGPT."
        },
        {
          "type": "p",
          "text": "2. Detectá al menos dos supuestos que haya hecho el asistente."
        },
        {
          "type": "p",
          "text": "3. Pedile: “Revisá tu propuesta e identificá limitaciones metodológicas”."
        },
        {
          "type": "p",
          "text": "4. Anotá qué información necesitarías obtener para usar esa matriz en un estudio real."
        },
        {
          "type": "p",
          "text": "Control: la IA debe separar propuestas exploratorias de resultados empíricos. Una segunda respuesta de la misma IA no sustituye validación independiente."
        }
      ],
      "tag": "Fundamentos",
      "minutes": 18,
      "subtitle": "Aprendé a pedir, conversar y verificar",
      "goal": "Formular instrucciones claras con el método de los cinco elementos y revisar críticamente las respuestas distinguiendo hipótesis de evidencia.",
      "check": "Verificá que la respuesta distinga propuestas exploratorias de resultados empíricos y que hayas identificado al menos dos supuestos del asistente.",
      "pitfall": "Tomar una tabla o respuesta bien redactada como evidencia validada sin revisar sus supuestos ni pedir limitaciones.",
      "files": []
    },
    {
      "id": 2,
      "title": "Proyectos, documentos y fuentes",
      "blocks": [
        {
          "type": "p",
          "text": "Un proyecto de ChatGPT puede agrupar conversaciones, archivos e instrucciones. La disponibilidad y los límites de archivos dependen de la cuenta y del servicio. No todas las herramientas poseen acceso a los mismos archivos o funciones."
        },
        {
          "type": "p",
          "text": "1. Creá un proyecto denominado “Investigación social - práctica”."
        },
        {
          "type": "p",
          "text": "2. Incorporá instrucciones: “no inventes referencias, evidencia ni resultados; indicá lo que falta”."
        },
        {
          "type": "p",
          "text": "3. Adjuntá únicamente un artículo académico público o un documento ficticio."
        },
        {
          "type": "p",
          "text": "4. Pedí una ficha de lectura con objetivo, marco teórico, método, hallazgos y limitaciones."
        },
        {
          "type": "p",
          "text": "5. Abrí el documento original y comprobá las páginas y las citas."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Analizá solamente el artículo que adjunté. Presentá autoría y título tal como aparecen, pregunta, metodología, resultados y limitaciones. Indicá sección o página de cada afirmación. Si un punto no aparece, escribí “no identificado”. No completes vacíos con conocimientos externos."
        },
        {
          "type": "h2",
          "text": "Advertencia de privacidad"
        },
        {
          "type": "p",
          "text": "No cargues archivos de casos reales, intervenciones, datos de salud, contactos o entrevistas identificables por comodidad. La anonimización debe evaluar riesgo de reidentificación, no solo borrar nombres."
        }
      ],
      "tag": "Organización",
      "minutes": 20,
      "subtitle": "Creá un espacio para cada investigación",
      "goal": "Organizar conversaciones, instrucciones y fuentes verificables en un proyecto de estudio, resguardando la privacidad de personas reales.",
      "check": "Comprobá que cada afirmación de la ficha cite sección o página del artículo original y que ningún vacío haya sido rellenado con datos externos.",
      "pitfall": "Subir entrevistas, historias sociales o informes identificables pensando que basta con borrar el nombre para evitar la reidentificación.",
      "files": []
    },
    {
      "id": 3,
      "title": "Diseñar una investigación social",
      "blocks": [
        {
          "type": "p",
          "text": "Caso transversal del manual: “Barreras de acceso a programas de asistencia social”. Es una simulación sin población real ni resultados empíricos."
        },
        {
          "type": "h2",
          "text": "Secuencia recomendable"
        },
        {
          "type": "p",
          "text": "1. Delimitar población, territorio, período y alcance."
        },
        {
          "type": "p",
          "text": "2. Definir pregunta y objetivos coherentes."
        },
        {
          "type": "p",
          "text": "3. Explorar conceptos y buscar bibliografía verificable."
        },
        {
          "type": "p",
          "text": "4. Seleccionar técnicas, población y muestreo."
        },
        {
          "type": "p",
          "text": "5. Planificar obtención de datos y consentimiento."
        },
        {
          "type": "p",
          "text": "6. Definir análisis y límites de interpretación."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Para la pregunta “¿Qué barreras territoriales, administrativas e informativas afectan el acceso a programas sociales?”, proponé tres diseños posibles: descriptivo cuantitativo, cualitativo exploratorio y mixto. Compará unidad de análisis, técnicas, evidencia necesaria, sesgos posibles y restricciones éticas. No elijas un diseño hasta conocer recursos, población y propósito."
        },
        {
          "type": "h2",
          "text": "Revisión bibliográfica"
        },
        {
          "type": "p",
          "text": "Prepará búsquedas con sinónimos y operadores booleanos; revisá resultados en repositorios o bases académicas y descargá las fuentes originales. Una referencia sugerida por IA debe localizarse y comprobarse antes de citarse."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Generá estrategias de búsqueda para Google Scholar y SciELO sobre desigualdad territorial y acceso a políticas sociales, en español e inglés. Usá operadores AND/OR. No inventes publicaciones; generá cadenas de búsqueda y criterios de selección."
        }
      ],
      "tag": "Metodología",
      "minutes": 24,
      "subtitle": "De una inquietud a un diseño investigable",
      "goal": "Comparar enfoques cuantitativos, cualitativos y mixtos y construir estrategias de búsqueda bibliográfica verificables en repositorios reales.",
      "check": "Contrastá que las cadenas AND/OR funcionen en Google Scholar o SciELO y que cada referencia sugerida esté localizada en su fuente original.",
      "pitfall": "Aceptar citas bibliográficas generadas por la IA sin abrir los repositorios académicos ni confirmar autoría, año y revista.",
      "files": []
    },
    {
      "id": 4,
      "title": "Laboratorio cuantitativo: RStudio y Stata",
      "blocks": [
        {
          "type": "p",
          "text": "Se incluye el archivo datos_practica_ts.csv con 10 observaciones ficticias. Su diseño produce asociación perfecta entre zona y acceso, exclusivamente para enseñar tablas; no es apropiado para inferencia causal ni generalización."
        },
        {
          "type": "table",
          "rows": [
            [
              "Variable",
              "Descripción",
              "Tipo"
            ],
            [
              "id",
              "Identificador",
              "Entera"
            ],
            [
              "zona",
              "Rural / Urbana",
              "Categórica"
            ],
            [
              "edad",
              "Edad en años",
              "Numérica"
            ],
            [
              "acceso",
              "1: sí / 0: no",
              "Binaria"
            ],
            [
              "distancia_km",
              "Distancia al punto de atención",
              "Numérica"
            ]
          ]
        },
        {
          "type": "h2",
          "text": "Práctica con RStudio"
        },
        {
          "type": "p",
          "text": "1. Abrí un proyecto de prueba y guardá el CSV junto al script analisis_RStudio.R."
        },
        {
          "type": "p",
          "text": "2. Revisá el contenido del script antes de ejecutarlo."
        },
        {
          "type": "p",
          "text": "3. Ejecutá el script; verificá 10 registros y ausencia de datos faltantes."
        },
        {
          "type": "p",
          "text": "4. Identificá la tabla zona × acceso y el promedio de distancia por zona."
        },
        {
          "type": "p",
          "text": "5. Compará cada salida con la tabla de control que aparece más adelante."
        },
        {
          "type": "h2",
          "text": "Práctica con Stata"
        },
        {
          "type": "p",
          "text": "1. Guardá cualquier trabajo abierto y comenzá una sesión nueva."
        },
        {
          "type": "p",
          "text": "2. Abrí analisis_Stata.do, que utiliza import delimited, clear."
        },
        {
          "type": "p",
          "text": "3. Asegurate de que el CSV se encuentra en el directorio de trabajo o ajustá su ruta."
        },
        {
          "type": "p",
          "text": "4. Ejecutá y comprobá cantidad de registros, tabulación cruzada y distancias promedio."
        },
        {
          "type": "p",
          "text": "5. Documentá diferencias de formato entre ambos programas, si las hubiera."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Revisá este código de R/Stata sin cambiarlo. Explicá qué operaciones realiza, qué archivos lee y cuáles modifica. Señalá errores probables, supuestos estadísticos y comprobaciones reproducibles. No declares “validado” un resultado si no ejecutaste el código sobre la base."
        },
        {
          "type": "h2",
          "text": "Resultados esperados"
        },
        {
          "type": "table",
          "rows": [
            [
              "Indicador",
              "Esperado"
            ],
            [
              "Total registros",
              "10"
            ],
            [
              "Zona Urbana / Rural",
              "5 / 5"
            ],
            [
              "Con acceso / Sin acceso",
              "5 / 5"
            ],
            [
              "Urbanos con acceso",
              "5 de 5"
            ],
            [
              "Rurales con acceso",
              "0 de 5"
            ],
            [
              "Distancia media urbana",
              "3,2 km"
            ],
            [
              "Distancia media rural",
              "22,0 km"
            ],
            [
              "Celdas sin datos",
              "0"
            ]
          ]
        },
        {
          "type": "p",
          "text": "Interpretación: esta distribución fue construida artificialmente. No demuestra que la residencia rural cause falta de acceso. La lectura debe considerar muestreo, medición, variables omitidas y contexto."
        }
      ],
      "tag": "Datos",
      "minutes": 35,
      "subtitle": "Practicá con RStudio y Stata",
      "goal": "Practicar la lectura, verificación y tabulación descriptiva de una base ficticia en RStudio y Stata comparando salidas contra una tabla de control.",
      "check": "Confirmá 10 registros, 0 valores faltantes, acceso 5/5 urbano vs. 0/5 rural, y distancia media de 3,2 km urbana frente a 22,0 km rural.",
      "pitfall": "Interpretar la asociación artificial del ejercicio como causalidad rural, o ejecutar import delimited, clear en Stata sin guardar antes el trabajo abierto.",
      "files": [
        "datos_practica_ts.csv",
        "analisis_RStudio.R",
        "analisis_Stata.do"
      ]
    },
    {
      "id": 5,
      "title": "Laboratorio cualitativo: ATLAS.ti",
      "blocks": [
        {
          "type": "p",
          "text": "El archivo entrevistas_ficticias.txt contiene tres testimonios inventados sobre traslados, información administrativa y seguimiento de trámites."
        },
        {
          "type": "p",
          "text": "1. Creá un proyecto de prueba en ATLAS.ti e importá el TXT como documento de práctica."
        },
        {
          "type": "p",
          "text": "2. Leé la totalidad del material antes de codificar."
        },
        {
          "type": "p",
          "text": "3. Marcá segmentos referidos a costos, viajes, información y seguimiento."
        },
        {
          "type": "p",
          "text": "4. Proponé códigos descriptivos y escribí una definición breve para cada uno."
        },
        {
          "type": "p",
          "text": "5. Agrupá códigos en categorías tentativas sin borrar diferencias entre relatos."
        },
        {
          "type": "p",
          "text": "6. Registrá en un memo qué decisiones tomaste y por qué."
        },
        {
          "type": "table",
          "rows": [
            [
              "Fragmento de práctica",
              "Código provisional"
            ],
            [
              "“El colectivo me salía caro”",
              "Costo de transporte"
            ],
            [
              "“Me enteré ... por una vecina”",
              "Redes personales de información"
            ],
            [
              "“Nadie me explicó bien”",
              "Comunicación institucional insuficiente"
            ],
            [
              "“No sabía dónde consultar”",
              "Dificultad de seguimiento"
            ]
          ]
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Analizá estos testimonios FICTICIOS mediante codificación temática exploratoria. Entregá extracto literal, código propuesto, justificación, categoría tentativa e interpretación alternativa. No inventes testimonios ni afirmes saturación teórica. Separá datos textuales de tus inferencias."
        },
        {
          "type": "p",
          "text": "Las funciones de IA propias de ATLAS.ti dependen de la edición, la versión y las condiciones de tratamiento de datos. Verificá esa disponibilidad antes de utilizarlas con material real."
        }
      ],
      "tag": "Entrevistas",
      "minutes": 30,
      "subtitle": "Interpretá testimonios con ATLAS.ti",
      "goal": "Codificar testimonios ficticios con definiciones operativas, categorías tentativas y memos analíticos, diferenciando ATLAS.ti de la asistencia externa con ChatGPT.",
      "check": "Asegurate de que cada código tenga definición breve, extracto literal de apoyo, memo de decisiones y al menos una interpretación alternativa.",
      "pitfall": "Afirmar saturación teórica con tres testimonios ficticios o usar funciones de IA integradas con material real sin verificar edición y política de datos.",
      "files": [
        "entrevistas_ficticias.txt"
      ]
    },
    {
      "id": 6,
      "title": "Productividad profesional",
      "blocks": [
        {
          "type": "h2",
          "text": "Informe institucional sin inventar resultados"
        },
        {
          "type": "p",
          "text": "Escenario ficticio: cuatro talleres comunitarios, 35 participantes en total y consultas sobre documentación y programas sociales. No se dispone de evaluación de impacto."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Redactá un borrador de informe institucional con introducción, objetivo, actividades, datos conocidos, información faltante y recomendaciones preliminares. Usá solo estos hechos: cuatro talleres, 35 participantes y consultas sobre documentación y programas. No inventes fechas, porcentajes, satisfacción ni mejoras de aprendizaje."
        },
        {
          "type": "h2",
          "text": "Del borrador al archivo"
        },
        {
          "type": "p",
          "text": "1. Revisá el texto producido por IA y corregí sus supuestos."
        },
        {
          "type": "p",
          "text": "2. Copiá la versión aprobada a Word u otro editor."
        },
        {
          "type": "p",
          "text": "3. Aplicá títulos y tablas; guardá DOCX."
        },
        {
          "type": "p",
          "text": "4. Exportá una copia PDF para lectura."
        },
        {
          "type": "p",
          "text": "5. Conservá el documento original para futuras correcciones."
        },
        {
          "type": "h2",
          "text": "Otras aplicaciones"
        },
        {
          "type": "li",
          "text": "Excel: organizar un cronograma, crear filtros y validar fórmulas; no confundir actividad realizada con impacto social."
        },
        {
          "type": "li",
          "text": "PowerPoint: sintetizar una investigación en diapositivas con datos verificables, sin inventar gráficos."
        },
        {
          "type": "li",
          "text": "Windows 11: Win+H para dictado cuando esté disponible; Win+Shift+S para capturas; Win+Z para organizar ventanas."
        },
        {
          "type": "p",
          "text": "Copilot en aplicaciones de Microsoft 365 puede requerir una licencia diferente. Copilot en navegador no significa necesariamente que exista edición integrada dentro de Word o Excel."
        }
      ],
      "tag": "Productividad",
      "minutes": 25,
      "subtitle": "Convertí ideas en documentos útiles",
      "goal": "Redactar borradores de informes y materiales profesionales a partir de hechos estrictamente conocidos, manteniendo control humano en Word, Excel y PowerPoint.",
      "check": "Revisá que el borrador conserve solo los hechos provistos (4 talleres, 35 participantes) y explicite la información faltante en lugar de inventar porcentajes.",
      "pitfall": "Confundir actividades realizadas con impacto social, o asumir que Copilot en el navegador incluye edición integrada dentro de Word o Excel.",
      "files": []
    },
    {
      "id": 7,
      "title": "Privacidad, ética y auditoría",
      "blocks": [
        {
          "type": "p",
          "text": "En Trabajo Social, la confidencialidad y las decisiones que afectan derechos requieren especial cuidado. No deben delegarse evaluaciones individuales, diagnósticos ni decisiones de elegibilidad a una IA generativa."
        },
        {
          "type": "table",
          "rows": [
            [
              "Situación",
              "Conducta recomendada"
            ],
            [
              "Informe de un caso identificable",
              "No cargarlo en un servicio externo no autorizado"
            ],
            [
              "Base pública, descargada legalmente",
              "Comprobar licencia, fuente y alcance"
            ],
            [
              "Datos sintéticos del manual",
              "Se pueden usar para practicar"
            ],
            [
              "Referencia académica sugerida por IA",
              "Localizar y comprobar la fuente original"
            ],
            [
              "Comando estadístico propuesto por IA",
              "Revisar, ejecutar y comparar resultados"
            ],
            [
              "Resultado sobre persona real",
              "Revisión profesional e institucional"
            ]
          ]
        },
        {
          "type": "h2",
          "text": "Protocolo de revisión en seis pasos"
        },
        {
          "type": "p",
          "text": "1. Identificá qué información proporcionaste a la herramienta."
        },
        {
          "type": "p",
          "text": "2. Separá dato comprobado, propuesta, inferencia y supuesto."
        },
        {
          "type": "p",
          "text": "3. Comprobá fuentes originales y referencias."
        },
        {
          "type": "p",
          "text": "4. Revisá código, transformaciones y archivos modificados."
        },
        {
          "type": "p",
          "text": "5. Contrastá resultados con otras evidencias o procedimientos."
        },
        {
          "type": "p",
          "text": "6. Registrá decisiones, limitaciones y uso de IA cuando corresponda."
        },
        {
          "type": "h3",
          "text": "PROMPT DE PRÁCTICA"
        },
        {
          "type": "prompt",
          "text": "Auditá el texto que te voy a proporcionar. Etiquetá cada afirmación como dato, resultado, interpretación, hipótesis o recomendación. Indicá las frases sin respaldo y la evidencia necesaria para sostenerlas. No agregues información externa sin distinguirla expresamente."
        }
      ],
      "tag": "Criterio",
      "minutes": 22,
      "subtitle": "Cuidá los datos y tu criterio",
      "goal": "Aplicar un protocolo de auditoría en seis pasos para resguardar la confidencialidad, etiquetar afirmaciones y sostener el criterio profesional.",
      "check": "Confirmá que cada enunciado del texto auditado quede etiquetado como dato, resultado, interpretación, hipótesis o recomendación con su respaldo.",
      "pitfall": "Delegar evaluaciones individuales, diagnósticos o criterios de elegibilidad sobre personas reales en una herramienta de IA generativa.",
      "files": []
    }
  ],
  "appendix": [
    {
      "type": "h2",
      "text": "Proyecto final: integrar métodos sin forzar conclusiones"
    },
    {
      "type": "p",
      "text": "1. Definí pregunta y variables del caso ficticio."
    },
    {
      "type": "p",
      "text": "2. Ejecutá la base cuantitativa en RStudio o Stata."
    },
    {
      "type": "p",
      "text": "3. Codificá testimonios ficticios en ATLAS.ti."
    },
    {
      "type": "p",
      "text": "4. Construí una matriz de hallazgos y limitaciones."
    },
    {
      "type": "p",
      "text": "5. Redactá un informe de 3 a 5 páginas con objetivos, método, resultados y discusión."
    },
    {
      "type": "p",
      "text": "6. Marcá lo que es ficticio y distinguí cualquier hipótesis de resultados observados."
    },
    {
      "type": "h3",
      "text": "PROMPT DE PRÁCTICA"
    },
    {
      "type": "prompt",
      "text": "Tengo un ejercicio de métodos mixtos con una base de 10 registros ficticios y tres testimonios también ficticios, sin vínculo individual entre sí. Ayudame a construir una matriz de integración. Separá resultados descriptivos cuantitativos, temas cualitativos, puntos de posible diálogo y afirmaciones que no pueden sostenerse. No infieras causalidad."
    },
    {
      "type": "h2",
      "text": "Guía breve de herramientas de la notebook"
    },
    {
      "type": "p",
      "text": "Se conoce la familia HP OmniBook 3 y que probablemente usa Intel Core Ultra 7. El número exacto del procesador y la disponibilidad de funciones Copilot+ no están confirmados. No se debe prometer NPU de 40+ TOPS, Recall, Cocreator ni efectos específicos sin verificar hardware y Windows."
    },
    {
      "type": "li",
      "text": "Para comenzar: Copilot en la web y ChatGPT requieren conexión y pueden solicitar cuenta."
    },
    {
      "type": "li",
      "text": "Las funciones de IA dentro de Word, Excel y otros programas pueden requerir licencias independientes."
    },
    {
      "type": "li",
      "text": "Para asistencia visual o por voz, revisar disponibilidad, consentimiento y permisos de pantalla/micrófono."
    },
    {
      "type": "li",
      "text": "Antes de cargar documentos profesionales, comprobar autorización y política de datos de la institución."
    },
    {
      "type": "h2",
      "text": "Glosario breve"
    },
    {
      "type": "table",
      "rows": [
        [
          "Término",
          "Significado"
        ],
        [
          "Prompt",
          "Instrucción enviada a un asistente de IA"
        ],
        [
          "Alucinación",
          "Respuesta que parece válida pero contiene información inventada o errónea"
        ],
        [
          "NPU",
          "Procesador especializado para ciertas tareas de IA compatibles"
        ],
        [
          "Variable",
          "Característica registrada u observada en una unidad de análisis"
        ],
        [
          "Código cualitativo",
          "Etiqueta para organizar segmentos significativos"
        ],
        [
          "Memo",
          "Registro de reflexiones y decisiones analíticas"
        ],
        [
          "Trazabilidad",
          "Posibilidad de reconstruir cómo se obtuvo un resultado"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Fuentes para consultar y actualizar"
    },
    {
      "type": "li",
      "text": "ChatGPT - proyectos: https://help.openai.com/en/articles/10169521-projects-in-chatgpt"
    },
    {
      "type": "li",
      "text": "ChatGPT - análisis de datos: https://help.openai.com/en/articles/8437071"
    },
    {
      "type": "li",
      "text": "Controles de datos: https://help.openai.com/en/articles/7730893-data-controls-faq"
    },
    {
      "type": "li",
      "text": "Documentación RStudio: https://docs.posit.co/ide/user/"
    },
    {
      "type": "li",
      "text": "Stata documentación: https://www.stata.com/support/documentation/"
    },
    {
      "type": "li",
      "text": "ATLAS.ti recursos: https://atlasti.com/"
    },
    {
      "type": "li",
      "text": "Microsoft Windows: https://support.microsoft.com/windows"
    },
    {
      "type": "li",
      "text": "Ley 25.326, Argentina: https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790"
    },
    {
      "type": "p",
      "text": "Nota editorial: las funciones de productos y las políticas pueden cambiar. Verificar edición, versión, licencia y condiciones vigentes antes de utilizar datos reales."
    }
  ]
};
