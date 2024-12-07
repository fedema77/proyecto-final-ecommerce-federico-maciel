
document.addEventListener('DOMContentLoaded', () => {
    // Validar mail en el footer
    const botonEnviar = document.getElementById('enviar');
    const emailInput = document.getElementById('emailInput');
    const msjSatisfactorio = document.getElementById('alertaMensaje');

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Evento de clic en el botón
    botonEnviar.addEventListener('click', () => {
        const email = emailInput.value.trim(); // Obtener y limpiar el valor del input
        
        if (emailRegex.test(email)) {
            // Correo válido
            msjSatisfactorio.textContent = 'Correo enviado correctamente';
            msjSatisfactorio.classList.add('mostrar', 'correcto');
            msjSatisfactorio.classList.remove('error');
            emailInput.value = ''; // Limpiar el input
        } else {
            // Correo inválido
            msjSatisfactorio.textContent = 'Por favor, ingresa un correo válido';
            msjSatisfactorio.classList.add('mostrar', 'error');
            msjSatisfactorio.classList.remove('correcto');
        }
        // Ocultar el mensaje después de 3 segundos
        setTimeout(()=>{
            msjSatisfactorio.classList.remove('mostrar');
        }, 3000);
    });

    // Cambiar cantidad de productos
    document.querySelectorAll('.selectorCantidad').forEach(selector => {
        // Dentro de cada selector, identificamos los botones y el span de cantidad
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

});
