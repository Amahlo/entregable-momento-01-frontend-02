import { useEffect, useMemo, useState } from 'react'
import { listarEquivalencias, listarIngredientes } from '../services/ingredienteServicio'
import { normalizarTexto } from '../utils/normalizarTexto'
import { resolverEquivalencia } from '../utils/equivalenciaNormalizer'

export function useIngredienteSearch() {
    const [ingredientes, setIngredientes] = useState([])
    const [equivalencia, setEquivalencia] = useState({})
    const [terminoBusqueda, setTerminoBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let activo = true

        async function cargarDatosBusqueda() {
            try {
                setCargando(true)
                setError(null)
                const [datosIngredientes, datosEquivalencias] = await Promise.all([
                    listarIngredientes(),
                    listarEquivalencias()
                ])

                if (activo) {
                    setIngredientes(Array.isArray(datosIngredientes) ? datosIngredientes : [])
                    setEquivalencia(datosEquivalencias || {})
                }
            }   catch {
                if (activo) {
                    setError('No fue posible cargar el catálogo ni las equivalencias de ingredientes')
                }
            }   finally {
                if (activo) {
                    setCargando(false)
                }
            }
        }

        cargarDatosBusqueda()

        return () => {
            activo = false
        }
    }, [])

    const sugerencias = useMemo(() => {
        const resolucion = resolverEquivalencia(terminoBusqueda, equivalencia)
        if (!resolucion.terminoNormalizado) return []

        return ingredientes.filter((ingrediente) => {
            const nombreNormalizado = normalizarTexto(ingrediente.nombre)
            const categoriaNormalizada = normalizarTexto(ingrediente.categoria)
            const marcaNormalizada = normalizarTexto(ingrediente.marca)

            if (resolucion.huboEquivalencia) {
                return nombreNormalizado.includes(resolucion.terminoOficial)
            }

            return (
                nombreNormalizado.includes(resolucion.terminoNormalizado) ||
                categoriaNormalizada.includes(resolucion.terminoNormalizado) ||
                marcaNormalizada.includes(resolucion.terminoNormalizado)
            )
        })
        .map((ingrediente) => ({
            ...ingrediente,
            equivalenciaAplicada: resolucion.huboEquivalencia ? resolucion.aliasDetectado : null
        }))
    }, [ingredientes, equivalencia, terminoBusqueda])

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