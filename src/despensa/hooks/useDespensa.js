import { useState, useEffect, useCallback } from "react";
import { listarDespensa, agregarIngredienteDespensa, eliminarIngredienteDespensa, vaciarDespensa} from "../services/despensaServicio"

function notificar(mensaje) {
    if (typeof window !== "undefined" && typeof window.showToast === "function") {
        window.showToast(mensaje)
    }
}

export function useDespensa() {
    const [ingredientes, setIngredientes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let activo = true

        async function cargarDespensa() {
            setCargando(true)
            setError(null)
            try {
                const datos = await listarDespensa()
                if (activo) {
                    setIngredientes(Array.isArray(datos) ? datos : [])
                }
            } catch (err) {
              if (activo) {
                setError(err?.message || "No fue posible cargar los ingredientes de tu despensa")
              }     
            } finally {
                if (activo) {
                    setCargando(false)
                }
            }
        }

        cargarDespensa()

        return () => {
            activo = false
        }
    }, [])

    const agregarIngrediente = useCallback(async (ingrediente) => {
    setGuardando(true)
    setError(null)

    try {
        const { ingrediente: registrado, duplicado } = await agregarIngredienteDespensa(ingrediente)

        if (duplicado) {
        notificar(`"${registrado.nombre}" ya está en tu despensa`)
        return { ok: true, duplicado: true }
        }

        setIngredientes((prev) => [...prev, registrado])
        notificar(`Ingrediente agregado: ${registrado.nombre}`)
        return { ok: true, duplicado: false }
    } catch (err) {
        const mensajeError = err?.message || 'Error al registrar el ingrediente en la despensa.'
        setError(mensajeError)
        notificar(mensajeError)
        return { ok: false, duplicado: false }
    } finally {
        setGuardando(false)
    }
  }, [])

  const eliminarIngrediente = useCallback(async (id) => {
    setGuardando(true)
    setError(null)

    try {
        const { eliminado, ingrediente } = await eliminarIngredienteDespensa(id)

        if (eliminado) {
        setIngredientes((prev) => prev.filter((item) => item.id !== id))
        notificar(`Ingrediente eliminado: ${ingrediente.nombre}`)
        }

      return { ok: true, eliminado }  
    } catch (err) {
        const mensajeError = err?.message || "Error al eliminar el ingrediente de la despensa"
        setError(mensajeError)
        notificar(mensajeError)
        return { ok: false, eliminado: false }
    }   finally {
        setGuardando(false)
    }
  }, [])

  const vaciarTodo = useCallback(async () => {
    setGuardando(true)
    setError(null)

    try {
        await vaciarDespensa()
        setIngredientes([])
        notificar("Se vació tu despensa personal")
        return { ok: true }
    } catch (err) {
        const mensajeError = err?.message || "Error al vaciar la despensa."
        setError(mensajeError)
        notificar(mensajeError)
        return { ok: false }
    } finally {
        setGuardando(false)
    }
  }, [])

  return {
    ingredientes,
    cargando,
    guardando,
    error,
    agregarIngrediente,
    eliminarIngrediente,
    vaciarTodo
  }
}