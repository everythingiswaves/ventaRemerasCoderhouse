//Actualizar el DOM con el nuevo array de carrito
function actualizarCarritoADOM() {
  storageACarrito();

  if (productosLocal.length == 0) {
    $("#div-tabla-carrito").append(
      `<h3 id="noProductos"> No hay productos en el carrito</h3>`
    );
  } else {
    $("#noProductos").remove();
  }

  //Elimino todos los nodos existentes con JQUERY
  $(".producto-carrito").remove();
  $(".precioFinal-carrito").remove();

  //Creo los nuevos nodos recorriendo la lista de carrito actualizada en local storage
  for (let i = 0; i < productosLocal.length; i++) {
    let divId = "carrito" + String(i);
    let idBtn = "btn" + String(i);
    //Agrego los divs con la informacion de los produtos del carrito
    $("#tabla-carrito").append(`<tr class="producto-carrito" id=${divId}>
                                    <td><img class="imgCarrito" src="../${productosLocal[i].foto}"></td>
                                    <td>${productosLocal[i].nombre} ${ productosLocal[i].talle}</td>
                                    <td>${productosLocal[i].precioSinIVA()}</td>
                                    <td>${
                                      productosLocal[i].cantidad
                                    }</td>
                                    <td>${productosLocal[i].subtotal()}</td>
                                    <td>${productosLocal[i].IVA()}</td>
                                    <td>${productosLocal[i].precioFinal()}</td>
                                    <td><button class="botonEliminar" id=${idBtn}>Eliminar</button></td>
                                  </tr>
                                  `);

    //Creo listeners para botones de eliminar
    crearListenerBtnCarrito(idBtn);
  }
  if (productosLocal.length !== 0) {
    //Agrego el precio final
    $("#tabla-carrito").append(`<tr class="precioFinal-carrito">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total</td>
                                    <td>${calcularTotal(productosLocal)}</td>
                                    <td><button id="botonPagar">Pagar</button></td>
                                  </tr>
                                  `);
  }
  //Limpia el carrrito despues de que paga
  $("#botonPagar").on("click", function () {
    limpiarCarrito();
    mostrarModal();
    $(".closeModalCarrito")[0].onclick = function () {
      $("#myModalCarrito")[0].style.display = "none";
    };
  });
}

//Crear lsiteners para botones de elimianr
function crearListenerBtnCarrito(id) {
  $(`#${id}`).on("click", sacarDeCarrito);
}

function actualizarCarritoLocal(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoADOM();
}

//Eliminar el producto del array carrito y del DOM
function sacarDeCarrito(e) {
  //Obtenemos el elemento desde el cual se disparó el evento
  let boton = e.target;
  let id = boton.id;
  //Nos quedamos solo con el numero del ID
  let index = id.substring(3);

  carrito.splice(index, 1);

  //Despues que actulizamos el carrito volvemos a actualizar el DOM
  $(`#carrito${index}`).fadeOut("slow", function () {
    actualizarCarritoLocal(carrito);
  });
}

//Calcular el precio total de la compra
function calcularTotal(carrito) {
  //Recorrer el array de productos en el carrito, calcular su precio final y sumarlo todo
  let precioTotal = 0;
  for (const producto of carrito) {
    precioTotal += producto.precioFinal();
  }
  return precioTotal;
}

//Eliminar todos los productos del carrito
function limpiarCarrito() {
  carrito = [];
  actualizarCarritoLocal(carrito);
}

function mostrarModal() {
  $("#myModalCarrito").slideDown("1000");
}
//Cada vez que se recarga la pagina se toma lo que este guardado y esta ready
//en el local y se grega al DOM y el array carrito
$(() => {
  actualizarCarritoADOM();
  carrito = Array.from(productosLocal);
});
