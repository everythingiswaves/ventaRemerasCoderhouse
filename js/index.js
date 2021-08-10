
//Ordenar la lista de productos a la venta
function alfabetico(array) {
  array.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    } else if (a.nombre < b.nombre) {
      return -1;
    } else {
      return 0;
    }
  });
  mostrarProductosVenta()
}
function menorMayor(array) {
  array.sort(function (a, b) {
    if (a.precio > b.precio) {
      return 1;
    } else if (a.precio < b.precio) {
      return -1;
    } else {
      return 0;
    }
  });
  mostrarProductosVenta()
}
function mayorMenor(array) {
  array.sort(function (a, b) {
    if (a.precio > b.precio) {
      return -1;
    } else if (a.precio < b.precio) {
      return 1;
    } else {
      return 0;
    }
  });
  mostrarProductosVenta()
}

//Agregar los prodcutos creados al array carrito
function agregarProductoACarrito(producto) {
  carrito.push(producto);
}

function actualizarCarritoLocal(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Agregar el producto nuevo al carrito y al DOM
function formACarrito(e) {
  //Cancelamos el comportamiento del evento
  e.preventDefault();
  //Obtenemos el elemento desde el cual se disparó el evento
  let formulario = e.target;

  let id = carrito.length; //le damos el id del numero siguiente en el array
  let foto = formulario.children[0].alt;
  let nombre = formulario.children[1].children[0].value;
  let precio = parseInt(formulario.children[2].children[1].value);
  let cantidad = parseInt(formulario.children[3].children[1].value);
  let talle = formulario.children[4].children[1].value;
  

  agregarProductoACarrito(
    new productoCarrito(id, nombre, precio, talle, cantidad, foto)
  );

  //Agrego el numero de productos en el carito en el logo del carrito
  $(".botonCarrito").text(`Carrito(${carrito.length})`)

  actualizarCarritoLocal(carrito);  
}

function mostrarProductosVenta() {
  //Elimino todos los nodos existentes con JQUERY
  $("#divProductos").empty();

  //Creo los nuevos nodos recorriendo la lista de productos a la venta
  for (let i = 0; i < productosVenta.length; i++) {
    let idBtn = "btnPV" + String(i);
    //Agrego los divs con la informacion de los produtos del carrito
    $("#divProductos")
      .append(`<div class="productos-item" id=${productosVenta[i].id}>
                                    <img id="fotoPV${i}" src="media/${productosVenta[i].foto}.jpeg" alt=${productosVenta[i].foto}>
                                    <h3 id="nombrePV${i}">${productosVenta[i].nombre}</h3>
                                    <p id="precioPV${i}">$UY ${productosVenta[i].precio}</p>
                                    <div>
                                    <button class="botonAgregar" id=${idBtn}>Agregar</button>
                                    </div>
                                  </div>`);

    //Creo listeners para botones de eliminar
    crearListenerBtnAgregar(idBtn);
  }
}

function crearListenerBtnAgregar(id) {
  //nos quedamos olo con el numero del ID
  let index = id.substring(5);
  $(`#${id}`).on("click", { value: index }, actualizarModal);
}

function actualizarModal(e) {
  let index = e.data.value;
  //borro todo el content del modal anterior
  $(".modal-content").empty();

  //Info del producto para agregar
  let nombre = $(`#nombrePV${index}`).text();
  let precio = $(`#precioPV${index}`).text();
  let foto =  $(`#fotoPV${index}`).attr('src');

  precio = parseInt(precio.substring(4));

  //Agrego la info del producto en un for al dom para confirmar pedido
  $(".modal-content").append(`<form id="form" action="">
                            <img class="imgModal" src="${foto}" alt="${foto}">
                            <div>
                            <input id="nombreForm" disabled="true" value="${nombre}">
                            </div>
                            <div>
                            <label for="precioForm">UY$</label>
                            <input id="precioForm" disabled="true" value="${precio}">
                            </div>
                            <div>
                            <label for="cantidad">Cantidad:</label>
                            <input type="number" id="cantidadForm" name="cantidad" min="1" value="1">
                            </div>
                            <div>
                            <label for="talle">Talle:</label>
                            <select id="talle" name="talle">
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                            </select>
                            </div>
                            <div>
                            <input class="confirmar" type="submit" value="Confirmar">
                            </div>
                            </form>`);

  //listener para el boton de confirmar al carrito
  $("#form").submit(formACarrito);

  //Agrego al DOM el boton de cerrar
  $(".modal-content").prepend(`<span class="closeModal">&times;</span>`);

  // Cuando cliceko en la X o en confirmar se cierra el modal
  $(".confirmar")[0].onclick = function () {
    $("#myModal")[0].style.display = "none";
  };
  $(".closeModal")[0].onclick = function () {
    $("#myModal")[0].style.display = "none";
  };
  //Mostrar el modal
  $("#myModal").slideDown("1000", function () {
    $(".confirmar").fadeIn("1500");
  });
}

//CUando esta ready
$(() => {
  //por default los dejo en orden alfabetico
  alfabetico(productosVenta)
  //mostrarProductosVenta();

  storageACarrito();
  //Para siempre tener la info guardada en local
  carrito = Array.from(productosLocal);

  //Listener para ordenar los prductos

  $("#mayorMenor").click(function(){
    mayorMenor(productosVenta);
  } );

  $("#menorMayor").click(function(){
    menorMayor(productosVenta);
  } );

  $("#alfabetico").click(function(){
    alfabetico(productosVenta);
  } );
  
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == $("#myModal")[0]) {
    $("#myModal")[0].display = "none";
  }
};