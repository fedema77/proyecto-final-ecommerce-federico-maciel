import {actualizarTotales} from './actualizarTotales.js';
import {actualizarContadorCarrito} from './actualizarContadorCarrito.js';

export function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const container = document.querySelector(".itemsCarrito");

    container.innerHTML = "";
    if (carrito.length === 0) {
        container.innerHTML = "<h2>No hay productos en tu carrito</h2>";
    }

    // Recorremos el carrito para mostrar cada producto
    carrito.forEach((producto) => {
        const html = `
            <div class="itemsCarrito" data-id="${producto.id}">
                <div class="contenedorIzq">
                    <img class="imgThumbnail1" src="./img/productos/${producto.titulo}.webp" alt="${producto.titulo}" class="img">
                    <div class="nombreEliminar">
                        <h2>${producto.titulo}</h2>
                        <button class="eliminar">Eliminar</button>
                    </div>
                </div>
                <div class="contendorDer">
                    <div class="selectorCantidad">
                        <button class="decrementar">−</button>
                        <span class="cantidadProducto">${producto.cantidad}</span>
                        <button class="incrementar">+</button>
                    </div>
                    <div class="precio">
                        <p class="precioRegular">$${producto.precio}</p>
                        <p class="precioDescuento">$${producto.precioDescuento}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });

    actualizarTotales(); // Totales del carrito
    actualizarContadorCarrito();
}

// Funciones eliminar, incrementar y decrementar
document.addEventListener('click', (e) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Eliminar un producto
    if (e.target.classList.contains("eliminar")) {
        const id = e.target.closest('.itemsCarrito').dataset.id;
        const nuevoCarrito = carrito.filter((producto) => producto.id != id); 
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); 
        mostrarCarrito();  
    }

    // Incrementar o decrementar la cantidad
    if (e.target.classList.contains("incrementar") || e.target.classList.contains("decrementar")) {
        const id = e.target.closest('.itemsCarrito').dataset.id;
        const producto = carrito.find((producto) => producto.id == id);

        if (!producto) return;

        // Si el clic es sobre el botón de incrementar
        if (e.target.classList.contains("incrementar") && producto.cantidad < producto.stock) {
            producto.cantidad++;  
        }
        // Si el clic es sobre el botón de decrementar
        if (e.target.classList.contains("decrementar") && producto.cantidad > 1) {
            producto.cantidad--;  
        }

        // Actualizamos el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();  // Actualiza carrito en la vista
    }
});
