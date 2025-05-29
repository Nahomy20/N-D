<<<<<<< HEAD
// Carrito de compras
let cart = [];

// Añadir producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.parentElement.querySelector('h3').textContent;
        const productPrice = button.parentElement.querySelector('p').textContent;
        
        cart.push({
            id: productId,
            name: productName,
            price: productPrice
        });

        updateCartCount();
        alert(`${productName} añadido al carrito!`);
    });
});

// Actualizar contador del carrito
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// (Opcional) Enviar evento a Google Analytics cuando se añade al carrito
function sendGAEvent(productName) {
    gtag('event', 'add_to_cart', {
        items: [{
            item_name: productName
        }]
    });
=======
// Carrito de compras
let cart = [];

// Añadir producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        const productName = button.parentElement.querySelector('h3').textContent;
        const productPrice = button.parentElement.querySelector('p').textContent;
        
        cart.push({
            id: productId,
            name: productName,
            price: productPrice
        });

        updateCartCount();
        alert(`${productName} añadido al carrito!`);
    });
});

// Actualizar contador del carrito
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// (Opcional) Enviar evento a Google Analytics cuando se añade al carrito
function sendGAEvent(productName) {
    gtag('event', 'add_to_cart', {
        items: [{
            item_name: productName
        }]
    });
>>>>>>> 823719cfb7e90921632278f70e6fb7fee39594b6
}