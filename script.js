// 1. Permite crear el listado de productos y carga lo guardado en una lista en el navegador
let lista = JSON.parse(localStorage.getItem("misCompras")) || [];

// 2. Función que permite agregar un nuevo producto
function agregarProducto() {
    let nombre = document.getElementById("name").value;
    let cantidad = document.getElementById("qty").value;

    if (nombre === "") return alert("Debe ingresar producto");

    // El productoe se guarda como un "objeto" con nombre, cantidad deseada y estado que se encuentre sea este ppr comprar o comprado
    lista.push({ nombre: nombre, cantidad: cantidad, comprado: false });
    
    document.getElementById("name").value = ""; // Limpiar el cuadro de texto
    guardarYRefrescar();
}

// 3. Función que permite enlistar en pantalla los productos
function dibujarLista() {
    let htmlLista = document.getElementById("lista-productos");
    htmlLista.innerHTML = ""; // Borramos todo para volver a dibujarlo actualizado

    lista.forEach((prod, indice) => {
        htmlLista.innerHTML += `
            <li class="${prod.comprado ? 'comprado' : ''}">
                <span onclick="marcar(${indice})">${prod.nombre} (x${prod.qty || prod.cantidad})</span>
                <button onclick="eliminar(${indice})">❌</button>
            </li>
        `;
    });
    actualizarContadores();
}

// 4. Detalle de funciones que permite seleccionar el item ya comprado o eliminar
function marcar(indice) {
    lista[indice].comprado = !lista[indice].comprado;
    guardarYRefrescar();
}

function eliminar(indice) {
    lista.splice(indice, 1); // Permite eliminar el producto de la lista
    guardarYRefrescar();
}

// 5. Guardar en la memoria del navegador el listado que se va generando de productos (LocalStorage)
function guardarYRefrescar() {
    localStorage.setItem("misCompras", JSON.stringify(lista));
    dibujarLista();
}

function actualizarContadores() {
    document.getElementById("total").innerText = lista.length;
    document.getElementById("comprados").innerText = lista.filter(p => p.comprado).length;
}

// Permite enlistar los items que estamos guardando
dibujarLista();