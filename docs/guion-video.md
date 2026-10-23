# Guion del video explicativo (5–7 min)

**Reglas:** duración entre 5:00 y 7:00 · participan los 2 integrantes · cámara encendida durante cada intervención ·
no leer textos largos, explicar con sus palabras.

**Antes de grabar:** ejecutar `npm run dev`, abrir http://localhost:4200 y tener GitHub abierto en otra pestaña.

| # | Tiempo | Quién | Qué mostrar | Qué decir (ideas clave) |
|---|---|---|---|---|
| 1 | 0:00 – 0:30 (30 s) | Jorge Vilcapuma | Diapositiva | Saludo, nombre del equipo, proyecto **ProdManager Pro** y presentación de los 2 integrantes con su rol. |
| 2 | 0:30 – 1:15 (45 s) | Jorge Vilcapuma | Diapositiva, bloque 2 | Problema: las MYPEs pierden hasta 15% de ventas por no controlar stock. Solución: SPA en Angular. Público objetivo y 3 objetivos específicos. |
| 3 | 1:15 – 2:15 (60 s) | Jorge Vilcapuma | App → Landing (scroll) | Recorrer las 7 secciones: Navbar, Hero con CTA, 3 tarjetas de Servicios, Nosotros, barra CTA, formulario de Contacto (mostrar una validación) y Footer. Mencionar que es responsiva. |
| 4 | 2:15 – 3:15 (60 s) | Jorge Vilcapuma | VS Code: árbol de carpetas, `product.model.ts`, `product.service.ts`, `db.json` | Estructura modular (components, services, models). La interfaz `Product`. El servicio usa `HttpClient` y devuelve Observables; métodos getAll, create, update, delete. JSON Server expone la API en `localhost:3000/products`. |
| 5 | 3:15 – 4:15 (60 s) | Daniel Leyva | App → Inventario y Registrar | Tabla con 10 registros traídos de la API, tarjetas de estadísticas, búsqueda y filtro por categoría, estados (Disponible / Stock bajo / Agotado). Registrar un producto nuevo: enviar vacío para mostrar validaciones y luego completar. Ver que aparece en la tabla (11). Editar y eliminar. |
| 6 | 4:15 – 5:00 (45 s) | Daniel Leyva | GitHub | Repositorio público, README documentado (tecnologías, `npm install`, `npm run dev`), historial de commits de todos los integrantes. |
| 7 | 5:00 – 5:30 (30 s) | Ambos | Diapositiva | Conclusiones y aprendizajes: consumo de APIs con servicios, Reactive Forms, trabajo en equipo con Git. Despedida. |

**Total aproximado: 5:30 min** (dejar margen para no bajar de 5:00 ni pasar de 7:00).

## Lista de verificación antes de entregar

- [ ] ¿Se entiende el propósito, problema y público del sistema?
- [ ] ¿La Landing Page muestra las 7 secciones?
- [ ] ¿Sabemos explicar componentes, servicios y modelos?
- [ ] ¿Sabemos explicar cómo se consumen los datos de la API REST?
- [ ] ¿Mostramos los 10+ registros y probamos el formulario?
- [ ] ¿El repositorio está actualizado, público y documentado?
- [ ] ¿Cada integrante tiene al menos un commit visible?
- [ ] ¿Todos los integrantes hablan con cámara encendida?
