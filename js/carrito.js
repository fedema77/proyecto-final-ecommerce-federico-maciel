export async function carrito(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    try{
        const response = await fetch("productos.json");
        const productos = await response.json();

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains("btnCarrito")){
            const id = e.target.closest('article').dataset.id;

            const producto = productos.find((producto)=>producto.id == id);
            console.log(producto);
        }
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (err) {console.log('Ocurrio un error: ', err)}
}