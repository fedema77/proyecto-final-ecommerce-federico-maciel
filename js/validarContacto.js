export function validarContacto(){
    const alertaMensajeNewsletter = document.getElementById('alertaMensajeNewsletter');
    const form = document.getElementById('formContacto');
    const nombreInput = document.getElementById('formInputNombre');
    const emailInputNewsletter = document.getElementById('formInputEmail');
    const telInput = document.getElementById('formInputTel');
    const textoInput = document.getElementById('formInputText');
    const aceptInput = document.getElementById('formCheckAceptacion');

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        let errores = [];
        alertaMensajeNewsletter.style.display = 'none';

        // Valido nombre con al menos 3 letras
        if (nombreInput.value.trim().length < 3){
            errores.push('El nombre debe tener al menos 3 letras.');
        }

        // Valido email
        if (!emailRegex.test(emailInputNewsletter.value.trim())){
            errores.push('Ingresa un correo válido.');
        }
        
        // Validar Teléfono con al menos 6 numeros
        if (telInput.value.trim().length < 6 ){
            errores.push('El teléfono debe tener al menos 6 números.');
        }

        // Validar Texto con al menos 5 letras
        if (textoInput.value.trim().length < 5){
            errores.push('El mensaje debe tener al menos 5 letras');
        }

        // Validar Aceptación de Términos y Condiciones
        if (!aceptInput.checked) {
            errores.push('Debes aceptar los Términos y Condiciones.');
        }

        // Mostrar mensaje de error
        if (errores.length > 0) {
            e.preventDefault();
            alertaMensajeNewsletter.style.display = 'block'; // Muestra la alerta
            alertaMensajeNewsletter.innerHTML = `
                <ul>
                    ${errores.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;
        } else {
            alertaMensajeNewsletter.style.display = 'none'; // Oculta la alerta si no hay errores
            form.reset();
            form.submit();
        }

        
    });
}