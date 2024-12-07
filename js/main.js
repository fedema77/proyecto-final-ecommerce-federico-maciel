import {validarNewsletter} from './validarNewsletter.js';
import {validarContacto} from './validarContacto.js';

document.addEventListener('DOMContentLoaded', () => {
    validarNewsletter();

    if(document.body.classList.contains('paginaContacto')){
        validarContacto();
    }
});