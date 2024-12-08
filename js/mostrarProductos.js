export async function mostrarProductos(){
    try{
        const response = await fetch("productos.json");
        const data = await response.json();

        const article = document.querySelector(".cardProductoOferta");
        article.innerHTML = "";

        const productosLimitados = data.slice(0, 4);

        productosLimitados.forEach((producto) => {
            const html = `
                <article class="cardProducto">
                <img src="./img/productos/${producto.titulo}.webp" alt="">
                <h3>${producto.titulo}</h3>
                <p class="productoDescripción">${producto.descripcion}</p>
                <div class="precio">
                    <p class="precioRegular">$${producto.precio}</p>
                    <p class="precioDescuento">$${producto.precioDescuento}</p>
                </div>
                <div class="botones">
                    <a href="./producto.html" class="btnCarrito">Ver más</a>
                    <button class="wishlist">
                        <svg stroke="currentColor" stroke-width="0.5" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m49.2944 25.7212c-7.42-7.4199-19.4501-7.4199-26.8701 0-7.4199 7.42-7.4199 19.4501 0 26.8701l25.2079 25.2093c1.1715 1.1716 3.0708 1.1717 4.2425.0003l25.2109-25.2063c7.4199-7.4199 7.4199-19.4501 0-26.87-7.4189-7.4189-19.4465-7.42-26.8667-.0034l-.0034.0034c-.2534.2534-.6677.2501-.9211-.0034zm25.6699 24.7521c6.2484-6.2484 6.2484-16.379 0-22.6274s-16.3791-6.2484-22.6275 0l-.4588.4589c-1.1716 1.1716-3.0711 1.1716-4.2427 0l-.4622-.4623c-6.2484-6.2483-16.379-6.2483-22.6274 0-6.2484 6.2484-6.2484 16.3791 0 22.6275l23.0865 23.0867c1.1715 1.1715 3.0708 1.1716 4.2424.0003z" fill="rgb(0,0,0)" fill-rule="evenodd"></path></svg>
                    </button>
                </div>
                </article>
            `;
            article.innerHTML += html;
        });

        
    } catch (err) {console.log('Ocurrio un error: ', err)}
}