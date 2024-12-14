export async function carrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    try {
        const response = await fetch("productos.json");
        const productos = await response.json();

        // Evento para agregar productos al carrito
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains("btnCarrito")) {
                const id = e.target.closest('article').dataset.id; // Obtener el id del producto
                const producto = productos.find((producto) => producto.id == id); // Buscar el producto

                if (!producto) return; // Si no se encuentra el producto, salir

                // Verificar si el producto ya está en el carrito
                const productoExistente = carrito.find(item => item.id == producto.id);

                if (productoExistente) {
                    // Si el producto ya existe, actualizamos la cantidad
                    const cantidadNueva = productoExistente.cantidad + 1;

                    // Verificamos si hay suficiente stock
                    if (cantidadNueva <= producto.stock) {
                        productoExistente.cantidad = cantidadNueva; // Actualizar cantidad en carrito
                    } else {
                        console.log('No hay suficiente stock para este producto');
                        return;
                    }
                } else {
                    // Si el producto no está en el carrito, lo agregamos
                    const { img, titulo, cantidad, precioDescuento, precio, stock } = producto;

                    const productoCarrito = {
                        id: id,
                        img: img,
                        titulo: titulo,
                        cantidad: 1,  
                        precioDescuento: precioDescuento,
                        precio: precio,
                        stock: stock,
                    };
                    carrito.push(productoCarrito); 
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
        });
    } catch (err) {
        console.log('Ocurrió un error:', err);
    }
}
