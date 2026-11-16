import { useEffect, useMemo, useState } from 'react'
import { listarIngredientes } from '../services/ingredienteServicio'
import { normalizarTexto } from '../utils/normalizarTexto'

export function useIngredienteSearch() {
    const [ingredientes, setIngredientes] = useState([])
    const [terminoBusqueda, setTerminoBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let activo = true

        async function cargarIngrediente() {
            try {
                setCargando(true)
                setError(null)
                const datos = await listarIngredientes()
                if (activo) {
                    setIngredientes(datos)
                }
            }   catch {
                if (activo) {
                    setError('No fue posible cargar el catálogo de ingredientes.')
                }
            }   finally {
                if (activo) {
                    setCargando(false)
                }
            }
        }

        cargarIngrediente()

        return () => {
            activo = false
        }
    }, [])

    const sugerencias = useMemo(() => {
        const consultaNormalizada = normalizarTexto(terminoBusqueda)
        if (!consultaNormalizada) return []

        return ingredientes.filter((ingrediente) => {
            const nombreNormalizado = normalizarTexto(ingrediente.nombre)
            const categoriaNormalizada = normalizarTexto(ingrediente.categoria)
            const marcaNormalizada = normalizarTexto(ingrediente.marca)

            return (
                nombreNormalizado.includes(consultaNormalizada) ||
                categoriaNormalizada.includes(consultaNormalizada) ||
                marcaNormalizada.includes(consultaNormalizada)
            )
        })
    }, [ingredientes, terminoBusqueda])

    const limpiarBusqueda = () => {
        setTerminoBusqueda('')
    }

    return {
        terminoBusqueda,
        setTerminoBusqueda,
        sugerencias,
        cargando,
        error,
        limpiarBusqueda
    }
} 