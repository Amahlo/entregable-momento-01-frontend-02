import "../styles/ListaDespensa.css"

const ListaDespensa = ({ ingredientes = [], cargando = false, error = null }) => {
  return (
    <section className="despensa-lista-seccion" aria-labelledby="despensa-lista-titulo">
        <header className="despensa-lista-header"> 
            <h3 id="despensa-lista-titulo" className="despensa-lista-titulo">
                Ingredientes disponibles en tu despensa
            </h3>
            <span className="despensa-lista-contador" aria-live="polite">
                {ingredientes.length} {ingredientes.length === 1 ? "ingrediente" : "ingredientes"}
            </span>
        </header>

        {cargando && error && (
            <p className="despensa-lista-estado despensa-lista-error" role="alert">
                {error}
            </p>
        )}

        {!cargando && !error && ingredientes.length > 0 && (
            <ul className="despensa-chips-contenedor">
                {ingredientes.map((ingrediente) => (
                    <li key={ingrediente.id} className="despensa-chip">
                        <i className="bi bi-check2-circle despensa-chip-icono" aria-hidden="true"></i>
                        <span className="despensa-chip-nombre">{ingrediente.nombre}</span>
                        <span className="despensa-chip-categoria">{ingrediente.categoria}</span>
                    </li>
                ))}
            </ul>
        )}
    </section>
  )
}
export default ListaDespensa