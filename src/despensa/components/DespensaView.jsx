import { useState } from "react"
import BuscadorIngredientes from "./BuscadorIngredientes"

function DespensaView() {
    const [ultimoSeleccionado, setUltimoSeleccionado] = useState(null)

    const handleSeleccionarIngrediente = (ingrediente) => {
        setUltimoSeleccionado(ingrediente)
        if (typeof window !== "undefined" && typeof window.showToast === "function") {
            window.showToast(`Ingrediente seleccionado: ${ingrediente.nombre}`)
        }
    }

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
                    Busca y selecciona ingredientes del catálogo para incorporarlos a tu inventario.
                </p>
            </header>

            <BuscadorIngredientes onSeleccionarIngrediente={handleSeleccionarIngrediente} />

            {ultimoSeleccionado && (
                <aside
                    className="p-4 rounded-2xl bg-white dark:bg-sazon-verdeNutresaCard border border-sazon-verdeHoja/30 flex items-center justify-between max-w-xl shadow-xs"
                    aria-live="polite"                    
                >
                    <div>
                        <span className="text-[11px] font-mono-tag uppercase text-sazon-verdeHoja dark:text-sazon-verdeNeon block">
                            Último ingrediente capturado
                        </span>
                        <strong className="font-poppins text-sm text-slate-900 dark:text-white">
                            {ultimoSeleccionado.nombre}
                        </strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">
                            {ultimoSeleccionado.categoria} · {ultimoSeleccionado.marca}
                        </span>
                    </div>
                    <i className="bi bi-check-circle-fill text-sazon-verdeHoja dark:text-sazon-verdeNeon text-xl"></i>
                </aside>
            )}
        </section>
    )
}

export default DespensaView