export function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.querySelector('.contadorCarrito');

    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    if (cantidadTotal > 0) {
        contador.textContent = cantidadTotal;
        contador.style.display = 'inline-block'; 
    } else {
        contador.style.display = 'none';
    }
}
