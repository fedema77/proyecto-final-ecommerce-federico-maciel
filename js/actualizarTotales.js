// Función para actualizar el subtotal y total del carrito
export function actualizarTotales() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;

    // Sumamos el subtotal de los productos en el carrito
    carrito.forEach((producto) => {
        subtotal += producto.cantidad * producto.precioDescuento;
    });

    const total = subtotal;

    // Actualizamos los totales en el HTML
    document.querySelector('.precioSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.precioTotal').textContent = `$${total.toFixed(2)}`;
};