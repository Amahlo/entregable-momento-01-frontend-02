import { normalizarTexto } from "./normalizarTexto"

export function resolverEquivalencia(terminoOriginal, reglasEquivalencia = {}) {
    const terminoNormalizado = normalizarTexto(terminoOriginal)

    if (!terminoNormalizado) {
        return {
            terminoNormalizado: "",
            terminoOficial: "",
            huboEquivalencia: false,
            aliasDetectado: null
        }
    }

    const entradas = Object.entries(reglasEquivalencia || {})

    for (const [alias, oficial] of entradas) {
        const aliasNormalizado = normalizarTexto(alias)
        if (aliasNormalizado && aliasNormalizado === terminoNormalizado) {
            return {
                terminoNormalizado,
                terminoOficial: normalizarTexto(oficial),
                huboEquivalencia: true,
                aliasDetectado: alias
            }
        }
    }

    if (terminoNormalizado.length >= 3) {
        for (const [alias, oficial] of entradas) {
            const aliasNormalizado = normalizarTexto(alias)
            if (aliasNormalizado && aliasNormalizado.startsWith(terminoNormalizado)) {
                return {
                    terminoNormalizado,
                    terminoOficial: normalizarTexto(oficial),
                    huboEquivalencia: true,
                    aliasDetectado: alias
                }
            }
        }
    }

    return {
        terminoNormalizado,
        terminoOficial: terminoNormalizado,
        huboEquivalencia: false,
        aliasDetectado: null
    }
}