const templateCard = document.getElementById('template-card').content;
const varitasContainer = document.getElementById('varitasContainer');
const fragment = document.createDocumentFragment();
const templateCart = document.getElementById('template-cart').content;
const cartContainer = document.getElementById('cartContainer');
const footerContainer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const addToCartBadge =document.getElementById('addToCartBadge');
const navLinks = document.querySelectorAll('.nav-link');

let cart = {};

//hacer fetch de productos luego de que carga la web
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();

  //si existe un cart en local storage, lo muestra
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    displayCart(cart);
  }

});

//añadir objetos al carrito al hacer click en "agregar"
varitasContainer.addEventListener('click', (event) => {
  addToCart(event);
  

});



cartContainer.addEventListener('click', (event) => {

  //restar item desde el boton -
  if (event.target.classList.contains("btn-minus")) {
    let id = event.target.parentElement.parentElement.getAttribute('data-id')
    cart[id].quantity--;

    //borrar item si la cantidad es 0
    if (cart[id].quantity === 0) {
      delete cart[id];
    }
    displayCart(cart)


  } else if (event.target.classList.contains("btn-plus")) { //sumar item desde el boton +
    let id = event.target.parentElement.parentElement.getAttribute('data-id')
    cart[id].quantity++;
    displayCart(cart)
  } 
    event.stopPropagation();

  });

 

  //fetch de la api de productos
const fetchProducts = async () => {
  try {
    const res = await fetch('https://my-json-server.typicode.com/DaianaArena/ollivanders-json/products');
    const products = await res.json();

    displayProducts(products);


  } catch (error) {
    console.log(error);
  }
};

//mostrar productos desde el dom
function displayProducts  (products) {
  products.forEach(product => {


    templateCard.querySelector('h3').textContent = product.name;
    templateCard.querySelector('img').src = product.image;
    templateCard.querySelector('p').textContent = product.description;
    templateCard.querySelector('h4').textContent = `$`+product.price;
    templateCard.querySelector('span').textContent = product.house;
    templateCard.querySelector('button').setAttribute('data-id', product.id);


    //Elegir el color del badge dependiendo de la casa
    templateCard.querySelector('span').removeAttribute('class')
    templateCard.querySelector('span').setAttribute('class', 'badge');

    switch (product.house) {
      case 'Griffindor':
        templateCard.querySelector('span').classList.add('bg-danger');
        break;
      case 'Slytherin':
         templateCard.querySelector('span').classList.add('bg-success');
        break;
      case 'Ravenclaw':
        templateCard.querySelector('span').classList.add('bg-info');
        break;
      case 'Hufflepuff':
        templateCard.querySelector('span').classList.add('bg-warning');
        break;
    }


    let newCard = templateCard.cloneNode(true);
    fragment.appendChild(newCard);
  });

  varitasContainer.appendChild(fragment);
}

//añade al carrito solo si tocan en el boton "agregar"
const addToCart = (event) => {


 if (event.target.classList.contains("btn-primary")) {
    setCart(event.target.parentElement);

    //mensaje de agregado al carrito

    addToCartBadge.style.display = 'block';
    setTimeout(function(){
      addToCartBadge.style.display = 'none';
    }, 1000);

  }
  event.stopPropagation();
}

//crea el objeto producto y lo añade al carrito
const setCart = object => {

  const product = {
    id: object.querySelector('button').getAttribute('data-id'),
    name: object.querySelector('h3').textContent,
    price: object.querySelector('h4').textContent,
    quantity: 1

  }

  if  (cart.hasOwnProperty(product.id)) {
    cart[product.id].quantity++;


  } else {
    cart[product.id] = product;
  }

  displayCart(cart);
}

//muestra el carrito desde el dom
function displayCart(cart) {

  cartContainer.innerHTML = '';
  for (let key in cart) {
    let product = cart[key];
    templateCart.querySelector("tr").setAttribute('data-id', product.id);
    templateCart.getElementById('id').textContent = product.id;

    templateCart.getElementById('nombre').textContent = product.name;
    templateCart.querySelector('span').textContent = product.quantity;
    templateCart.getElementById('precio').textContent = product.price;
    templateCart.getElementById('total').textContent = `$`+ (product.quantity * parseInt(product.price.substring(1), 10));

    let addProductToCart = templateCart.cloneNode(true);
    fragment.appendChild(addProductToCart);
    
  }
  cartContainer.appendChild(fragment);
  displayFooter(cart);

  // guardar carrito en local storage
  localStorage.setItem('cart', JSON.stringify(cart));

}


//muestra el footer desde el dom
function displayFooter(cart) {
  footerContainer.innerHTML = '';
  if (Object.keys(cart).length === 0) {
    footerContainer.innerHTML = '<th scope="row" colspan="5" class="text-danger">Carrito vacío - Comience a comprar!</th>';

  } else {
    let total = 0;
    let precioFinal = 0;
    for (let key in cart) {
      let product = cart[key];
      total += product.quantity
      precioFinal += product.quantity * parseInt(product.price.substring(1), 10);
    }
    
    templateFooter.getElementById('totalProductos').textContent = total;
    templateFooter.getElementById('precioFinal').textContent = precioFinal;

    const footerClone = templateFooter.cloneNode(true);
    fragment.appendChild(footerClone);
    footerContainer.appendChild(fragment);


    //borrar carrito al hacer click en "vaciar carrito"
    const vaciarCarrito = document.getElementById("vaciar-carrito")
    vaciarCarrito.addEventListener('click', (event) => {
      cart = {};
      displayCart(cart);
    });

  }
  

}

//mostrar secciones
function goToHome() {
  document.getElementById('inicio').style.display = 'block';
  document.getElementById('varitas').style.display = 'none';
  document.getElementById('carrito').style.display = 'none';
}

function goToStore() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('varitas').style.display = 'block';
  document.getElementById('carrito').style.display = 'none';
}

function goToCart() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('varitas').style.display = 'none';
  document.getElementById('carrito').style.display = 'block';
}

//cerrar menu al hacer click en un link