import {validarNewsletter} from './validarNewsletter.js';
import {validarContacto} from './validarContacto.js';
import {cantidadProductos} from './cantidadProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    validarNewsletter();

    if(document.body.classList.contains('paginaContacto')){
        validarContacto();
    }

    if(document.body.classList.contains('productos') ||
       document.body.classList.contains('carrito') ||
       document.body.classList.contains('checkout')){
            cantidadProductos();
    }
});