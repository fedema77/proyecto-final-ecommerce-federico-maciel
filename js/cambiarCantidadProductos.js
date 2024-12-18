export function cambiarCantidadProductos(){
    document.querySelectorAll('.selectorCantidad').forEach(selector => {
        const incrementarBtn = selector.querySelector('.incrementar');
        const decrementarBtn = selector.querySelector('.decrementar');
        const cantidadProducto = selector.querySelector('.cantidadProducto');
    
        // Convertimos el texto actual del span en número
        let cantidad = parseInt(cantidadProducto.textContent, 10);
    
        // Evento para incrementar la cantidad
        incrementarBtn.addEventListener('click', () => {
            cantidad++;
            cantidadProducto.textContent = cantidad;
        });
    
        // Evento para decrementar la cantidad (sin permitir valores menores a 1)
        decrementarBtn.addEventListener('click', () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadProducto.textContent = cantidad;
            }
        });
    });
}