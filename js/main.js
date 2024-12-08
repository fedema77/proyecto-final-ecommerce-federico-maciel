import {validarNewsletter} from './validarNewsletter.js';
import {validarContacto} from './validarContacto.js';
import {cantidadProductos} from './cantidadProductos.js';
import {mostrarProductos} from './mostrarProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    // Todo el sitio
    validarNewsletter();

    // Página de Inicio
    if(document.body.classList.contains('home'));
        mostrarProductos();

    // Página de Contacto
    if(document.body.classList.contains('paginaContacto')){
        validarContacto();
    }

    // Página de Producto, Carrito, Checkout
    if(document.body.classList.contains('productos') ||
       document.body.classList.contains('carrito') ||
       document.body.classList.contains('checkout')){
            cantidadProductos();
    }
});