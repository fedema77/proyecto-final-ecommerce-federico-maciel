export function validarNewsletter(){
    const botonEnviar = document.getElementById('enviar');
    const emailInputNewsletter = document.getElementById('emailInputNewsletter');
    const alertaMensajeNewsletter = document.getElementById('alertaMensajeNewsletter');

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Evento de clic en el botón
    botonEnviar.addEventListener('click', () => {
        const email = emailInputNewsletter.value.trim(); // Obtener y limpiar el valor del input
        
        if (emailRegex.test(email)) {
            // Correo válido
            alertaMensajeNewsletter.textContent = 'Correo enviado correctamente';
            alertaMensajeNewsletter.classList.add('mostrar', 'correcto');
            alertaMensajeNewsletter.classList.remove('error');
            emailInputNewsletter.value = ''; // Limpiar el input
        } else {
            // Correo inválido
            alertaMensajeNewsletter.textContent = 'Por favor, ingresa un correo válido';
            alertaMensajeNewsletter.classList.add('mostrar', 'error');
            alertaMensajeNewsletter.classList.remove('correcto');
        }
        // Ocultar el mensaje después de 3 segundos
        setTimeout(()=>{
            alertaMensajeNewsletter.classList.remove('mostrar');
        }, 3000);
    });
}