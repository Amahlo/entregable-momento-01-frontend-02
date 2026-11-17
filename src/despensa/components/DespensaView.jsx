import { useDespensa } from "../hooks/useDespensa"
import BuscadorIngredientes from "./BuscadorIngredientes"
import ListaDespensa from "./ListaDespensa"

const DespensaView = () => {
    const {
        ingredientes,
        cargando,
        guardando,
        error,
        agregarIngrediente,
        eliminarIngrediente,
        vaciarTodo
    } = useDespensa()

    return (
        <section className="space-y-6">
            <header className="border-b border-slate-200 dark:border-white/10 pb-4 space-y-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tag font-bold uppercase tracking-wider text-sazon-verdeHoja dark:text-sazon-verdeNeon">
                    <i className="bi bi-box-seam" aria-hidden="true"></i>
                    <span>Célula 3 · Mi Despensa Virtual</span>
                </span>
                <h2 className="font-poppins font-extrabold text-2xl text-slate-900 dark:text-white m-0">
                    Gestión de Ingredientes en el Hogar
                </h2>
                <p className="font-inter text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0">
                   Busca y selecciona ingredientes del catálogo para incorporarlos a tu inventario 
                </p>
            </header>

            <BuscadorIngredientes 
                onSeleccionarIngrediente={agregarIngrediente}
                guardando={guardando}
            />

            <ListaDespensa 
                ingredientes={ingredientes}
                cargando={cargando}
                guardando={guardando}
                error={error}
                onEliminarIngrediente={eliminarIngrediente}
                onVaciarDespensa={vaciarTodo}
            />
        </section>
    )
}
export default DespensaView