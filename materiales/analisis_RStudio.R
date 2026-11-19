# ==============================================================================
# Ejercicio reproducible para RStudio - DATOS FICTICIOS (NO SON CASOS REALES)
# Propósito pedagógico: practicar lectura de CSV, control de calidad, tablas y
# medidas descriptivas. Distribución construida artificialmente; no usar para
# inferencia causal ni generalización.
# ==============================================================================

# 1. Definir o verificar el directorio de trabajo donde se guardó el CSV.
# Ejemplo en RStudio: Session -> Set Working Directory -> To Source File Location
# o ejecutar: setwd("ruta/a/tu/carpeta")

# 2. Lectura segura preservando codificación UTF-8 con BOM (Windows/Excel)
datos <- read.csv(
  "datos_practica_ts.csv",
  fileEncoding = "UTF-8-BOM",
  stringsAsFactors = FALSE
)

# 3. Controles de integridad esperados (10 filas, sin faltantes, acceso 0/1)
stopifnot(
  nrow(datos) == 10,
  ncol(datos) == 5,
  !anyNA(datos),
  all(datos$zona %in% c("Urbana", "Rural")),
  all(datos$acceso %in% c(0, 1))
)

# 4. Inspección de estructura, tipos de variables y ausencia de faltantes
str(datos)
print(colSums(is.na(datos)))
print(summary(datos[, c("edad", "acceso", "distancia_km")]))

# 5. Tabulación cruzada Zona x Acceso y porcentajes por fila
# Esperado: Rural 5 sin acceso (100,0 %), Urbana 5 con acceso (100,0 %)
tabla_zona_acceso <- table(
  datos$zona,
  datos$acceso,
  dnn = c("Zona", "Acceso (0 = No, 1 = Si)")
)
print(tabla_zona_acceso)
print(round(prop.table(tabla_zona_acceso, 1) * 100, 1))

# 6. Distancia media por zona
# Esperado: Rural = 22.0 km | Urbana = 3.2 km
print(aggregate(distancia_km ~ zona, data = datos, FUN = mean))

# 7. Visualización exploratoria (gráfico de cajas)
boxplot(
  distancia_km ~ zona,
  data = datos,
  main = "Distancia al punto de atención según zona (datos ficticios)",
  xlab = "Zona de residencia",
  ylab = "Distancia (km)",
  col = c("#d2b28e", "#a9bdac")
)
