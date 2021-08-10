//Traer el array del local storage al array carrito
function storageACarrito() {
  let almacenados = JSON.parse(localStorage.getItem("carrito"));
  //Reinicio el array del storage para volver a llenarlo
  productosLocal.splice(0, productosLocal.length);
  if (almacenados) {
    //primero checkeo que tenga algo para poder iterarlo
    for (const objeto of almacenados) {
      productosLocal.push(
        new productoCarrito(
          objeto.id,
          objeto.nombre,
          objeto.precio,
          objeto.talle,
          objeto.cantidad,
          objeto.foto
        )
      );
    }
  }

  //Agrego el numero de productos en el carito
  $(".botonCarrito").text(`Carrito(${productosLocal.length})`)
}
