import "../styles/ListaDespensa.css"

const ListaDespensa = ({ 
    ingredientes = [], 
    cargando = false,
    guardando = false,
    error = null,
    onEliminarIngrediente,
    onVaciarDespensa
}) => {
  const hayIngredientes = ingredientes.length > 0

  return (
    <section className="despensa-lista-seccion" aria-labelledby="despensa-lista-titulo">
        <header className="despensa-lista-header"> 
            <h3 id="despensa-lista-titulo" className="despensa-lista-titulo">
                Ingredientes disponibles en tu despensa
            </h3>

            <div className="despensa-lista-acciones">
                <span className="despensa-lista-contador" aria-live="polite">
                    {ingredientes.length} {ingredientes.length === 1 ? "ingrediente" : "ingredientes"}
                </span>

                {!cargando && hayIngredientes && typeof onVaciarDespensa === "function" && (
                    <button
                        type="button"
                        className="despensa-lista-vaciar"
                        disabled={guardando}
                        onClick={onVaciarDespensa}
                        aria-label="Vaciar todos los ingredientes de la despensa"
                    >
                        <i className="bi bi-trash3" aria-hidden="true"></i>
                        <span>Vaciar despensa</span>
                    </button>
                )}
            </div>
        </header>

        {cargando && (
            <p className="despensa-lista-estado">
                Cargando tu despensa personal...
            </p>
        )}

        {!cargando && error && (
            <p className="despensa-lista-estado despensa-lista-error" role="alert">
                {error}
            </p>
        )}

        {!cargando && !error && !hayIngredientes && (
            <p className="despensa-lista-estado">
                Tu despensa está vacía. Usa el buscador superior para agregar ingredientes
            </p>
        ) }

        {!cargando && !error && ingredientes.length > 0 && (
            <ul className="despensa-chips-contenedor">
                {ingredientes.map((ingrediente) => (
                    <li key={ingrediente.id} className="despensa-chip">
                        <i className="bi bi-check2-circle despensa-chip-icono" aria-hidden="true"></i>
                        <span className="despensa-chip-nombre">{ingrediente.nombre}</span>
                        <span className="despensa-chip-categoria">{ingrediente.categoria}</span>

                        {typeof onEliminarIngrediente === "function" && (
                            <button
                            type="button"
                            className="despensa-chip-eliminar"
                            disabled={guardando}
                            onClick={() => onEliminarIngrediente(ingrediente.id)}
                            aria-label={`Eliminar ${ingrediente.nombre} de la despensa`}
                            title={`Eliminar ${ingrediente.nombre}`}
                            >
                                <i className="bi bi-x" aria-hidden="true"></i>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        )}
    </section>
  )
}
export default ListaDespensa