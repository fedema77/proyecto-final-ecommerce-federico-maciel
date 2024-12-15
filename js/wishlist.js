export async function manejarWishlist(id) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Verificamos si el producto ya está en la wishlist
    const productoExistente = wishlist.find((producto) => producto.id == id);

    if (productoExistente) {
        // Si ya está, lo eliminamos
        const nuevaWishlist = wishlist.filter((producto) => producto.id != id);
        localStorage.setItem("wishlist", JSON.stringify(nuevaWishlist));
        console.log(`Producto ${id} eliminado de la wishlist`);
        // Actualizamos contador de wishlist
        actualizarWishlistContador();
        return;
    } else {
        try {
            // Si no está, buscamos el producto completo desde productos.json
            const response = await fetch("productos.json");
            const productos = await response.json();

            // Buscamos el producto por su ID
            const producto = productos.find((producto) => producto.id == id);

            if (!producto) {
                console.log(`Producto con id ${id} no encontrado`);
                return;
            }

            // Desestructuramos los detalles necesarios del producto
            const { img, titulo, precioDescuento, precio, stock } = producto;

            // Creamos el objeto para la wishlist
            const productoWishlist = {
                id: id,
                img: img,
                titulo: titulo,
                precioDescuento: precioDescuento,
                precio: precio,
                stock: stock,
            };

            // Lo agregamos a la wishlist
            wishlist.push(productoWishlist);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            console.log(`Producto ${id} agregado a la wishlist`);
        } catch (error) {
            console.log("Error al agregar a la wishlist:", error);
        }
    }
    // Actualizamos el contador de la wishlist
    actualizarWishlistContador();
}

// Función para mostrar la wishlist en su página
export function mostrarWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const container = document.querySelector('.itemsWishlist');

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<h2>No hay productos en tu wishlist</h2>";

    }

    // Generar el HTML para cada producto en la wishlist
    wishlist.forEach((producto) => {
        const html = `
            <div class="cardProducto itemWishlist" data-id="${producto.id}">
                <img src="./img/productos/${producto.titulo}.webp" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <div class="precio">
                    <p class="precioRegular">$${producto.precio}</p>
                    <p class="precioDescuento">$${producto.precioDescuento}</p>
                </div>
                <button class="eliminar eliminarWishlist">Eliminar</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Función para actualizar el contador de la wishlist en el header
export function actualizarWishlistContador() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const contador = document.querySelector('.contadorWishlist');

    if (wishlist.length > 0) {
        contador.textContent = wishlist.length;
        contador.style.display = 'inline-block';
    } else {
        contador.style.display = 'none';
    }
}

// Función para eliminar producto de la wishlist
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminarWishlist')) {
        const id = e.target.closest('.cardProducto').dataset.id; // Selector corregido
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const nuevaWishlist = wishlist.filter((producto) => producto.id != id);
        localStorage.setItem('wishlist', JSON.stringify(nuevaWishlist));
        actualizarWishlistContador();
        mostrarWishlist(); // Actualiza la vista
    }
});

