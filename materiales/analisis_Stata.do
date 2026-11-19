* ==============================================================================
* Ejercicio reproducible para Stata - DATOS FICTICIOS (NO SON CASOS REALES)
* Propósito pedagógico: practicar importación, verificación de invariantes,
* tabulación cruzada y estadísticas descriptivas por grupo.
*
* ATENCION (riesgo de operación destructiva):
*   El comando `import delimited ..., clear` reemplaza y descarta cualquier
*   conjunto de datos abierto en memoria sin guardar cambios previos.
*   Guardá tu trabajo antes de ejecutar o iniciá una sesión nueva de Stata.
* ==============================================================================

version 15
* Si estás en la carpeta donde guardaste el CSV, verificá con `pwd` o usá `cd`.

* 1. Importar base ficticia (UTF-8 con encabezados en fila 1)
import delimited using "datos_practica_ts.csv", clear varnames(1) encoding("UTF-8")

* 2. Verificación de estructura, tipos de variables y ausencia de faltantes
describe
assert _N == 10
assert inlist(acceso, 0, 1)
assert inlist(zona, "Urbana", "Rural")
assert !missing(id, edad, acceso, distancia_km)
assert zona != ""
misstable summarize

* 3. Etiquetar variable binaria para facilitar la lectura de tablas
label define lbl_acceso 0 "Sin acceso" 1 "Con acceso"
label values acceso lbl_acceso

* 4. Tabulación cruzada con porcentajes por fila
* Esperado: Rural = 5 Sin acceso (100,0 %) | Urbana = 5 Con acceso (100,0 %)
tabulate zona acceso, row

* 5. Distancia promedio y medidas descriptivas por zona
* Esperado: Rural n=5, mean=22.0 | Urbana n=5, mean=3.2
tabstat distancia_km, by(zona) statistics(n mean sd min max)

* 6. Visualización exploratoria
graph box distancia_km, over(zona) ///
    title("Distancia al punto de atención (datos ficticios)") ///
    ytitle("Distancia (km)")
