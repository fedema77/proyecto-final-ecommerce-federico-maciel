document.addEventListener('DOMContentLoaded', () => {
    const botonEnviar = document.getElementById('enviar');
    const emailInput = document.getElementById('emailInput');
    const msjSatisfactorio = document.getElementById('envioSatisfactorio');

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
});
