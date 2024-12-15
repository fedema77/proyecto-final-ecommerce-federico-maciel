import { actualizarContadorCarrito } from "./actualizarContadorCarrito.js";

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

                const mensajeNotificador = e.target.closest(".cardProducto").querySelector(".mensajeExito");

                if (productoExistente) {
                    // Si el producto ya existe, actualizamos la cantidad
                    const cantidadNueva = productoExistente.cantidad + 1;

                    // Verificamos si hay suficiente stock
                    if (cantidadNueva <= productoExistente.stock) {
                        productoExistente.cantidad = cantidadNueva;
                        mensajeNotificador.textContent = "Producto agregado al carrito";
                        mensajeNotificador.style.color = "rgb(8, 231, 38)";
                        mensajeNotificador.style.display = "block";
                    } else {
                        mensajeNotificador.textContent = "No hay más stock disponible";
                        mensajeNotificador.style.color = "rgb(255, 25, 25)";
                        mensajeNotificador.style.display = "block";
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
                actualizarContadorCarrito();

                // Ocultamos el mensaje después de 3 segundos
                setTimeout(() => {
                    mensajeNotificador.style.display = "none";
                }, 3000);
            }
        });
    } catch (err) {
        console.log('Ocurrió un error:', err);
    }
}
