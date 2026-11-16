import { useState } from 'react'
import { useIngredienteSearch } from '../hooks/useIngredienteSearch'
import '../styles/BuscadorIngredientes.css'

function BuscadorIngredientes({ onSeleccionarIngrediente, guardando = false }) {
  const {
    terminoBusqueda,
    setTerminoBusqueda,
    sugerencias,
    cargando,
    error,
    limpiarBusqueda,
  } = useIngredienteSearch()

  const [listaAbierta, setListaAbierta] = useState(false)

  const handleChange = (e) => {
    setTerminoBusqueda(e.target.value)
    setListaAbierta(true)
  }

  const handleSeleccion = async (ingrediente) => {
    if (guardando) return

    if (typeof onSeleccionarIngrediente === 'function') {
      const resultado = await onSeleccionarIngrediente(ingrediente)
      if (resultado && resultado.ok === false) {
        return
      }
    }

    limpiarBusqueda()
    setListaAbierta(false)
  }

  const handleLimpiar = () => {
    limpiarBusqueda()
    setListaAbierta(false)
  }

  const hayConsulta = terminoBusqueda.trim().length > 0
  const mostrarDesplegable = listaAbierta && hayConsulta

  return (
    <section className="despensa-buscador-contenedor" aria-label="Búsqueda de ingredientes">
      <label
        className="despensa-buscador-label"
        htmlFor="despensa-buscador-input"
      >
        Agregar ingrediente a tu despensa
      </label>

      <div className="despensa-buscador-campo">
        <i className="bi bi-search despensa-buscador-icono" aria-hidden="true"></i>

        <input
          id="despensa-buscador-input"
          className="despensa-buscador-input"
          type="search"
          value={terminoBusqueda}
          onChange={handleChange}
          onFocus={() => setListaAbierta(true)}
          placeholder="Buscar ingrediente..."
          autoComplete="off"
          aria-expanded={mostrarDesplegable}
          aria-controls="despensa-sugerencias-lista"
          aria-autocomplete="list"
        />

        {hayConsulta && (
          <button
            type="button"
            className="despensa-buscador-limpiar"
            onClick={handleLimpiar}
            aria-label="Limpiar búsqueda"
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        )}
      </div>

      {mostrarDesplegable && (
        <ul
          id="despensa-sugerencias-lista"
          className="despensa-buscador-lista"
          role="listbox"
        >
          {cargando && (
            <li className="despensa-buscador-estado">
              Cargando catálogo de ingredientes...
            </li>
          )}

          {!cargando && error && (
            <li className="despensa-buscador-estado" role="alert">
              {error}
            </li>
          )}

          {!cargando && !error && sugerencias.length === 0 && (
            <li className="despensa-buscador-estado">
              No se encontraron ingredientes para "{terminoBusqueda.trim()}".
            </li>
          )}

          {!cargando &&
            !error &&
            sugerencias.map((ingrediente) => (
              <li key={ingrediente.id} role="option" aria-selected="false">
                <button
                  type="button"
                  className="despensa-buscador-item"
                  disabled={guardando}
                  onClick={() => handleSeleccion(ingrediente)}
                >
                  <span>
                    <span className="despensa-buscador-item-nombre">
                      {ingrediente.nombre}
                    </span>
                    <span className="despensa-buscador-item-categoria">
                      {ingrediente.categoria}
                    </span>
                  </span>

                  <span className="despensa-buscador-item-marca">
                    {ingrediente.marca}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}

export default BuscadorIngredientes