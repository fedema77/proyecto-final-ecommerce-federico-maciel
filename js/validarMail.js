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
            msjSatisfactorio.style.display = 'block';
            msjSatisfactorio.textContent = 'Correo enviado correctamente';
            msjSatisfactorio.style.color = 'rgb(8, 231, 38)'; // Color verde
            emailInput.value = ''; // Limpiar el input
        } else {
            // Correo inválido
            msjSatisfactorio.style.display = 'block';
            msjSatisfactorio.textContent = 'Por favor, ingresa un correo válido';
            msjSatisfactorio.style.color = 'tomato'; // Color rojo
        }
    });
});
