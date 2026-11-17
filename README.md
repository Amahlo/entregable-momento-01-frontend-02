# sazon-integrador

# Módulo de Despensa Virtual (`src/despensa/`) — Sa·zón Digital

* **Autor:** Hernán Darío Pérez Higuita
* **Módulo asignado:** Célula 3 · Gestión de Ingredientes en el Hogar (`src/despensa/`)
* **Stack tecnológico:** React, Vite, JavaScript (ES6+), Tailwind CSS, CSS Modularizado (`sazon.css`) y persistencia asíncrona en `localStorage`.

---

## Resumen de la Implementación

El módulo implementa de forma incremental la gestión completa del inventario personal de ingredientes en el hogar bajo una arquitectura modular por responsabilidades (**Componentes**, **Custom Hooks**, **Servicios**, **Utilidades** y **Estilos encapsulados**), cumpliendo principios **SOLID**, **Clean Code** y codificación **UTF-8**:

1. **Búsqueda reactiva con autocompletado:** Campo controlado que consulta el catálogo maestro de ingredientes y filtra coincidencias insensibles a tildes y mayúsculas (`normalize('NFD')`).
2. **Resolución de equivalencias y sinónimos coloquiales:** Traducción pura e inmutable de términos regionales o cotidianos (por ejemplo, *"tinto"*, *"tajadas"*, *"choclo"*, *"saltinas"*) hacia la entidad oficial del catálogo corporativo antes de desplegar o registrar sugerencias.
3. **Selección rápida y prevención de duplicados:** Incorporación inmediata del ingrediente oficial seleccionado a la despensa personal con retroalimentación mediante notificaciones (`Toast`) y bloqueo de registros repetidos.
4. **Eliminación individual y vaciado masivo persistente:** Retiro puntual por chip o limpieza completa de la despensa con actualización inmutable de estado y persistencia controlada en `localStorage` (`"[]"`), evitando restaurar datos semilla al recargar la aplicación.

---

## Arquitectura del Módulo

```text
src/despensa/
├── components/
│   ├── BuscadorIngredientes.jsx      # Barra de búsqueda controlada y lista flotante de sugerencias
│   ├── DespensaView.jsx              # Vista contenedora que conecta los Custom Hooks con los subcomponentes
│   └── ListaDespensa.jsx             # Renderizado declarativo de chips, contador, eliminación individual y vaciado masivo
├── hooks/
│   ├── useDespensa.js                # Hook de estado CRUD asíncrono (listar, agregar, eliminar, vaciar) y Toast
│   └── useIngredienteSearch.js       # Hook de búsqueda reactiva con equivalencias y estado derivado (useMemo)
├── services/
│   ├── despensaServicio.js           # Persistencia asíncrona e inmutable en localStorage con respaldo en memoria
│   └── ingredienteServicio.js        # Consulta asíncrona del catálogo maestro y reglas de equivalencia
├── styles/
│   ├── BuscadorIngredientes.css      # Estilos encapsulados (.despensa-buscador-*) con soporte modo claro/oscuro
│   └── ListaDespensa.css             # Estilos encapsulados (.despensa-lista-*, .despensa-chip-*) con soporte modo claro/oscuro
└── utils/
    ├── equivalenciaNormalizer.js     # Resolución pura e inmutable de sinónimos coloquiales hacia entidades oficiales
    └── normalizarTexto.js            # Normalización pura (normalize('NFD')) insensible a tildes y mayúsculas