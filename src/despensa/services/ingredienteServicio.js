const INGREDIENTES = [
  { id: 1, nombre: 'Arroz Blanco', categoria: 'Granos y Cereales', marca: 'General' },
  { id: 2, nombre: 'Aceite Vegetal', categoria: 'Aceites y Grasas', marca: 'General' },
  { id: 3, nombre: 'Ajo Fresco', categoria: 'Verduras y Hortalizas', marca: 'General' },
  { id: 4, nombre: 'Atún en Agua Van Camps', categoria: 'Enlatados', marca: 'General' },
  { id: 5, nombre: 'Café Molido Sello Rojo', categoria: 'Bebidas Calientes', marca: 'Sello Rojo' },
  { id: 6, nombre: 'Cebolla Cabezona Roja', categoria: 'Verduras y Hortalizas', marca: 'General' },
  { id: 7, nombre: 'Chocolate de Mesa Corona', categoria: 'Bebidas Calientes', marca: 'Corona' },
  { id: 8, nombre: 'Crema de Leche', categoria: 'Lácteos', marca: 'General' },
  { id: 9, nombre: 'Espagueti Clásico Doria', categoria: 'Pastas', marca: 'Doria' },
  { id: 10, nombre: 'Frijol Cargamanto Rojo', categoria: 'Granos y Cereales', marca: 'General' },
  { id: 11, nombre: 'Galletas Saltín Noel', categoria: 'Panadería y Galletas', marca: 'Noel' },
  { id: 12, nombre: 'Harina de Maíz Precocida', categoria: 'Harinas', marca: 'General' },
  { id: 13, nombre: 'Jamón de Pavo Pietrán', categoria: 'Carnes Frías', marca: 'Pietrán' },
  { id: 14, nombre: 'Leche Entera', categoria: 'Lácteos', marca: 'General' },
  { id: 15, nombre: 'Limón Tahití', categoria: 'Frutas', marca: 'General' },
  { id: 16, nombre: 'Maíz Tierno Dulce Zenú', categoria: 'Enlatados', marca: 'Zenú' },
  { id: 17, nombre: 'Orégano Seco', categoria: 'Especias y Condimentos', marca: 'General' },
  { id: 18, nombre: 'Pechuga de Pollo', categoria: 'Proteínas', marca: 'General' },
  { id: 19, nombre: 'Plátano Maduro', categoria: 'Frutas y Verduras', marca: 'General' },
  { id: 20, nombre: 'Queso Campesino', categoria: 'Lácteos', marca: 'General' },
  { id: 21, nombre: 'Salchicha Tradicional Zenú', categoria: 'Carnes Frías', marca: 'Zenú' },
  { id: 22, nombre: 'Tomate Chonto Maduro', categoria: 'Verduras y Hortalizas', marca: 'General' }
]

export async function listarIngredientes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(INGREDIENTES.map((item) => ({ ...item })))
        }, 150)
    })
}