const STORAGE_KEY = "sazon_despensa_personal"

let despensaMemoria = [
    {id: 1, nombre: "Arroz Blanco", categoria: "Granos y Cereales", marca: "General"},
    {id: 3, nombre: "Ajo Fresco" , categoria:"Verduras y Hortalizas" , marca: "General"}
]

function leerStorage() {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            return despensaMemoria.map((item) => ({ ...item }))
        }

        const guardado = window.localStorage.getItem(STORAGE_KEY)
        if (!guardado) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(despensaMemoria))
            return despensaMemoria.map((item) => ({ ...item }))
        }

        const parsed = JSON.parse(guardado)
        return Array.isArray(parsed) ? parsed.map((item) => ({ ...item })) : []
    }   catch {
        return despensaMemoria.map((item) => ({ ...item }))
    }
}

function guardarStorage(lista) {
    despensaMemoria = lista.map((item) => ({ ...item }))
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(despensaMemoria))
        }
    } catch {
        //Respaldo activo en memoria si localStorage no está disponible
    }
}

export async function listarDespensa() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(leerStorage())
        }, 100)
    })
}

export async function agregarIngredienteDespensa(ingrediente) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!ingrediente || typeof ingrediente.id === "undefined") {
                reject(new Error("Ingrediente inválido para registrar en la despensa"))
                return
            }

            const listaActual = leerStorage()
            const yaExiste = listaActual.some((item) => item.id === ingrediente.id)

            if (yaExiste) {
                resolve({ ingrediente: { ...ingrediente }, duplicado: true})
                return
            }

            const nuevoRegistro = { ...ingrediente }
            const nuevaLista = [...listaActual, nuevoRegistro]
            guardarStorage(nuevaLista)

            resolve({ ingrediente: nuevoRegistro, duplicado: false })
        }, 120)
    })
}

export async function eliminarIngredienteDespensa(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof id === "undefined" || id === null) {
                reject(new Error("Identificador de ingrediente inválido para eliminar"))
                return
            }

            const listaActual = leerStorage()
            const ingredienteEliminado = listaActual.find((item) => item.id === id) || null
            const nuevaLista = listaActual.filter((item) => item.id !== id)

            guardarStorage(nuevaLista)
            resolve({
                eliminado: Boolean(ingredienteEliminado),
                ingrediente: ingredienteEliminado
            })
        }, 100)
    })
}

export async function vaciarDespensa() {
    return new Promise((resolve) => {
        setTimeout(() => {
            guardarStorage([])
            resolve({ vaciada: true})
        }, 100)
    })
}