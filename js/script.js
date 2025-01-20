const productos = [
    {
        id: 1,
        categoria: 1,
        nombre: 'Pan',
        imagen: 'img/pan.jpg',
        descripcion: 'Pan organico',
        precio: 100,
    },
    {
        id: 2,
        categoria: 2,
        imagen: 'img/pan_blanco.jfif',
        nombre: 'Pan blanco',
        descripcion: 'Pan nagtal',
        precio: 200,
    },
    {
        id: 3,
        categoria: 1,
        imagen: 'img/grillo.jfif',
        nombre: 'Harina',
        descripcion: 'Harina de grillo',
        precio: 300,
    },
    {
        id: 4,
        categoria: 2,
        imagen: 'img/leche.png',
        nombre: 'Leche',
        descripcion: 'Leche organica',
        precio: 400,
    },

    {
        id: 5,
        categoria: 1,
        imagen: 'img/yogur.jpg',
        nombre: 'Yogur',
        descripcion: 'Yogur de frutilla',
        precio: 500,
    },
    {
        id: 6,
        categoria: 2,
        imagen: 'img/coco.jpg',
        nombre: 'Leche de coco',
        descripcion: 'Leche de coco',
        precio: 600,
    },
    {
        id: 7,
        categoria: 1,
        imagen: 'img/arroz.jfif',
        nombre: 'Arroz',
        descripcion: 'Galletas de arroz',
        precio: 700,
    },
    {
        id: 8,
        categoria: 2,
        imagen: 'img/avena.jpg',
        nombre: 'Avena',
        descripcion: 'Avena por kilo',
        precio: 800,
    },
    {
        id: 9,
        categoria: 1,
        imagen: 'img/galleta.jpg',
        nombre: 'Galletas de cereales',
        descripcion: 'Galletas con cereales',
        precio: 900,
    },
];

// Document:
//Se crea una constante d que hace referencia al objeto
const d = document;
// Objetos:
/*Se selecciona el elemento del DOM con el id info-carritoy se almacena en la variable info.
 Probablemente, este elemento se utilizará para mostrar información sobre el carrito.*/
let info = d.querySelector('#info-carrito'); 
/*Similar a la línea anterior, pero para el elemento con id reset. Este elemento podría estar relacionado con reiniciar el carrito*/ 
let reset = d.querySelector('#reset');      
let addBtns = d.querySelectorAll('.add');
let delBtns = d.querySelectorAll('.del');
let filtros = d.querySelectorAll('#filtros a');

//Se declara un objeto llamado carrito con tres propiedades:
let carrito = {
    // Una matriz vacía que probablemente se llenará con identificadores de productos.
    productosIds: [],
   // Una matriz vacía que se llenará con las cantidades correspondientes a cada producto en el carrito
    cantidades: [],
   // Un número que se usará para almacenar el costo total de los productos en el carrito.
    total: 0,
};


const mostrarCarritoUsuario = () => {
    console.clear();
    carrito.productosIds.forEach((productoId, indice) => {
        let cantidad = carrito.cantidades[indice];
        let elProducto = catalogo.filter((producto) => producto.id == productoId)[0];
        // console.log(elProducto);
        console.log(`Producto: ${elProducto.nombre} - Cantidad: ${cantidad} - Precio: $${elProducto.precio}`);
    });
};
const mostrarCarrito = () => {
    info.innerHTML = `
    Productos: ${carrito.productosIds} <br />
    Cantidades: ${carrito.cantidades} (${carrito.cantidades.reduce((acum, n) => acum + n, 0)})<br />
    Total: $${carrito.total}
    `;
};
// Acción de los botones para agregar productos:
for (let btn of addBtns) {
    btn.addEventListener('click', (e) => {
        // Acciones:
            let id = parseInt(e.target.dataset.id)
            let val = parseInt(e.target.dataset.val)
            const indice = carrito.productosIds.indexOf(id)
            if( indice != -1 ){
                carrito.cantidades[indice]++
            }else{
                carrito.productosIds.push(id)
                carrito.cantidades.push(1)
            }
        // Se muestra el detalle del carrito:
        carrito.total = parseInt(carrito.total) + val
        mostrarCarrito();
    });
}
for (let btn of delBtns) {
    btn.addEventListener('click', (e) => {
        // Acciones:
        let id = parseInt(e.target.dataset.id)
        let val = parseInt(e.target.dataset.val)
        const indice = carrito.productosIds.indexOf(id)
        if( indice != -1  ){
            // Verifico si llegó a cero:
            if (carrito.cantidades[indice] > 0) {
                // Si existe, actualizo el índice de la cantidad:
                carrito.cantidades[indice]--;
                // Actualizo el total:
                carrito.total = parseInt(carrito.total) - val;                
            }
        }
        // Se muestra el detalle del carrito:
        mostrarCarrito();
    });
}
// Reseteo:
reset.addEventListener('click', (e) => {
    // Se limpia el carrito:
    carrito = {
        productosIds: [],
        cantidades: [],
        total: 0,
    };
    // Se muestra el detalle del carrito limpio:
    mostrarCarrito();
});

//categorias 
for (let filtro of filtros) {
  filtro.addEventListener('click', (e) => {
    e.preventDefault();
    let categoriaSeleccionada = e.target.dataset.cat;
    // Utiliza el método scrollIntoView para desplazarse suavemente a la sección correspondiente
    document.getElementById(`categoria${categoriaSeleccionada}`).scrollIntoView({
      behavior: 'smooth'
    });
  });
}
// Acción de los filtros:
for (let filtro of filtros) {
  filtro.addEventListener('click', (e) => {
    e.preventDefault();
    let categoriaSeleccionada = e.target.dataset.cat;

    // Oculta todos los productos
    for (let producto of productos) {
      document.querySelector(`[data-cat="${producto.categoria}"]`).classList.add('oculto');
    }
    // Muestra los productos de la categoría seleccionada
    document.querySelectorAll(`[data-cat="${categoriaSeleccionada}"]`).forEach((producto) => {
      producto.classList.remove('oculto');
    });
  });
}
// Mostrar carrito inicial:
mostrarCarrito();
const recorrerItemsCarrito = () => {
    carrito.productosIds.forEach((productoId, indice) => {
        let producto = productos.filter((producto) => producto.id == productoId)[0];
        let cantidad = carrito.cantidades[indice];
        console.log(producto, { cantidad });
    });
};
//modal detalles 1
function showProductDetails(productId) {
    let product = productos.find(item => item.id === productId);
    let productDetails = `
      <img src="${product.imagen}" alt="${product.nombre}" width="300px" height="300px">
      <p><strong>${product.nombre}:</strong> <em>$${product.precio}</em></p>
      <p>${product.descripcion}</p>
    `;
    document.getElementById('productDetails').innerHTML = productDetails;
    document.getElementById('productModalLabel').innerText = `Detalles de ${product.nombre}`;
    document.getElementById('addToCartBtn').onclick = function () {
      
      alert(`Producto ${product.nombre} agregado al carrito`);
      $('#productModal').modal('hide');
    };
  }
//modal 2
// Función para mostrar el carrito en la ventana modal
const mostrarCarritoModal = () => {
    let carritoDetails = '';
    carrito.productosIds.forEach((productoId, indice) => {
        let producto = productos.find((item) => item.id === productoId);
        let cantidad = carrito.cantidades[indice];
        carritoDetails += `
          <p><strong>${producto.nombre}:</strong> Cantidad: ${cantidad} - Precio: $${producto.precio * cantidad}</p>
        `;
    });
    // Muestra la cantidad total y el monto total
    carritoDetails += `<p><strong>Total:</strong> Cantidad: ${carrito.cantidades.reduce((acum, n) => acum + n, 0)} - Monto Total: $${carrito.total}</p>`;
    document.getElementById('carritoDetails').innerHTML = carritoDetails;
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
    carrito = {
        productosIds: [],
        cantidades: [],
        total: 0,
    };
    mostrarCarrito();
    $('#carritoModal').modal('hide');
};
// Evento para abrir la ventana modal del carrito
document.getElementById('verCarritoBtn').addEventListener('click', () => {
    mostrarCarritoModal();
});

/*chechbox*/
function realizarCheckout() {
  // Obtener la información del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const lugarEntrega = document.getElementById('lugarEntrega').value;
  const fechaEntrega = document.getElementById('fechaEntrega').value;
  const metodoPago = document.getElementById('metodoPago').value;
  const cuotas = document.getElementById('cuotas').value;
  // Aquí puedes realizar acciones con la información del cliente y del pago
  // Por ejemplo, enviar la información a un servidor, procesar el pago, etc.
  // Limpiar el carrito después del checkout
  vaciarCarrito();
  // Cerrar la ventana modal
  $('#checkoutModal').modal('hide');
  // Puedes redirigir a una página de confirmación o realizar otras acciones según tu flujo de checkout
  alert('¡Checkout realizado con éxito!');
}
/*fin*/

// Función para cancelar el checkout y restaurar la visibilidad de los botones
const cancelarCheckout = () => {
    document.getElementById('verCarritoBtn').classList.remove('oculto');
    document.getElementById('reset').classList.remove('oculto');
    $('#checkoutModal').modal('hide');
};
//parte 2 checkout
const mostrarBotonesCheckout = () => {
};

