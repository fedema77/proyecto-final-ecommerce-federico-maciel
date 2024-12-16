export async function manejarWishlist(id) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // Parrafo informativo para alertar sobre productos agregados o eliminados de wishlist
    const cardProducto = document.querySelector(`.cardProducto[data-id="${id}"]`);
    const mensajeNotificador = cardProducto.querySelector(".mensajeExito");

    // Verificamos si el producto ya está en la wishlist
    const productoExistente = wishlist.find((producto) => producto.id == id);

    if (productoExistente) {
        // Si ya está, lo eliminamos
        const nuevaWishlist = wishlist.filter((producto) => producto.id != id);
        localStorage.setItem("wishlist", JSON.stringify(nuevaWishlist));

        // Actualizamos contador de wishlist
        mensajeNotificador.textContent = "Eliminado de Wishlist";
        mensajeNotificador.style.color = "rgb(255, 25, 25)";
        mensajeNotificador.style.display = "block";
        setTimeout(() => {
            mensajeNotificador.style.display = "none";
        }, 3000);
        actualizarWishlistContador();
        return;
    } else {
        try {
            // Si no está, buscamos el producto completo desde productos.json
            const response = await fetch("productos.json");
            const productos = await response.json();

            // Buscamos el producto por su ID
            const producto = productos.find((producto) => producto.id == id);

            if (!producto) return;

            // Desestructuración
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

            // Mostrar mensaje de éxito
            mensajeNotificador.textContent = "Producto agregado a Wishlist";
            mensajeNotificador.style.color = "rgb(8, 231, 38)";
            mensajeNotificador.style.display = "block";
            setTimeout(() => {
                mensajeNotificador.style.display = "none";
            }, 3000);

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
                <button class="agregarAlCarrito">Agregar al Carro</button>
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

// Agregar al carrito y eliminar de wishlist
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("agregarAlCarrito")) {
        const id = e.target.closest(".cardProducto").dataset.id;
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Encontramos el producto en la wishlist
        const producto = wishlist.find((producto) => producto.id == id);

        if (!producto) return;

        // Verificar si ya está en el carrito
        const productoExistente = carrito.find((item) => item.id == producto.id);

        if (productoExistente) {
            // Verificamos si hay stock
            if (productoExistente.cantidad < producto.stock) {
                productoExistente.cantidad++;
            } else {
                alert("No hay suficiente stock disponible.");
                return;
            }
        } else {
            // Si no está, lo agregamos al carrito
            const nuevoProducto = { ...producto, cantidad: 1 };
            carrito.push(nuevoProducto);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Eliminamos el producto de la wishlist
        const nuevaWishlist = wishlist.filter((item) => item.id != id);
        localStorage.setItem("wishlist", JSON.stringify(nuevaWishlist));

        // Actualizamos la vista
        mostrarWishlist();
        actualizarWishlistContador();
        alert("Producto agregado al carrito.");
    }
});

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

