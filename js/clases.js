//Objetos que van a ir al carrito
class productoCarrito {
    constructor(id, nombre, precio, talle, cantidad, foto) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.talle = talle;
      this.cantidad = cantidad;
      this.foto = foto;
    }
  
    IVA() {
      return this.precio * this.cantidad * 0.22;
    }
    precioSinIVA(){
      return this.precio - this.precio * 0.22;
    }
    subtotal(){
      return (this.precioSinIVA() * this.cantidad);
    }
    precioFinal() {
      return (this.precio * this.cantidad);
    }
  }