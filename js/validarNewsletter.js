export function validarNewsletter(){
    const botonEnviar = document.getElementById('enviar');
    const emailInput = document.getElementById('emailInput');
    const alertaMensaje = document.getElementById('alertaMensaje');

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Evento de clic en el botón
    botonEnviar.addEventListener('click', () => {
        const email = emailInput.value.trim(); // Obtener y limpiar el valor del input
        
        if (emailRegex.test(email)) {
            // Correo válido
            alertaMensaje.textContent = 'Correo enviado correctamente';
            alertaMensaje.classList.add('mostrar', 'correcto');
            alertaMensaje.classList.remove('error');
            emailInput.value = ''; // Limpiar el input
        } else {
            // Correo inválido
            alertaMensaje.textContent = 'Por favor, ingresa un correo válido';
            alertaMensaje.classList.add('mostrar', 'error');
            alertaMensaje.classList.remove('correcto');
        }
        // Ocultar el mensaje después de 3 segundos
        setTimeout(()=>{
            alertaMensaje.classList.remove('mostrar');
        }, 3000);
    });
}