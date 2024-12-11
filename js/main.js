import {validarNewsletter} from './validarNewsletter.js';
import {validarContacto} from './validarContacto.js';
import {cambiarCantidadProductos} from './cambiarCantidadProductos.js';
import {mostrarProductos} from './mostrarProductos.js';
import {carrito} from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
    // Todo el sitio
    validarNewsletter();

    // Página de Inicio
    if(document.body.classList.contains('home')){
        mostrarProductos(".cardProductoOferta", "Ofertas", 4);
        mostrarProductos(".cardProductoMasVendido", "Más Vendidos", 8);
        mostrarProductos(".cardExploraProductos", null,12);
        carrito();
    }

    // Página de Ofertas
    if(document.body.classList.contains('Ofertas')){
        mostrarProductos(".cardProductoOferta", "Ofertas", 12);
        carrito();
    }

    // Página de Contacto
    if(document.body.classList.contains('paginaContacto')){
        validarContacto();
    }

    // Página de Producto, Carrito, Checkout
    if(document.body.classList.contains('productos') ||
       document.body.classList.contains('carrito') ||
       document.body.classList.contains('checkout')){
        cambiarCantidadProductos();
            carrito();
    }
});