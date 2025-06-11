// Inicialización del carrito
let cart = [];

// Función para extraer datos del producto
function getProductData(productElement) {
    return {
        id: productElement.getAttribute('data-id'),
        name: productElement.querySelector('h3')?.textContent?.trim() || 'Producto sin nombre',
        price: parseFloat(productElement.querySelector('p')?.textContent?.replace(/[^\d.]/g, '') || 0)
    };
}

// Actualiza el contador del carrito en el DOM
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

// Manejador para añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        if (!productElement) return;

        const product = getProductData(productElement);

        // Validación básica
        if (!product.id || isNaN(product.price)) {
            console.error('❌ Producto inválido:', product);
            alert('Hubo un error al agregar el producto al carrito.');
            return;
        }

        // Añadir producto al carrito
        cart.push(product);
        updateCartCount();

        // Evento GA4: add_to_cart
        gtag('event', 'add_to_cart', {
            currency: 'USD',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price,
                quantity: 1
            }]
        });

        console.log('✅ Producto añadido al carrito:', product);
        alert(`✅ ${product.name} añadido al carrito`);
    });
});

// Función para finalizar compra
function completePurchase() {
    if (cart.length === 0) {
        alert('🛒 Tu carrito está vacío');
        return;
    }

    const transactionId = 'T-' + Math.floor(Date.now() / 1000);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Evento GA4: purchase
    gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: total,
        currency: 'USD',
        items: cart.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: 1
        }))
    });

    console.log('🎉 Compra realizada:', { transactionId, total, items: cart });

    alert(`🎉 Compra exitosa! Total: $${total.toFixed(2)}`);

    // Reiniciar carrito
    cart = [];
    updateCartCount();
}
// Enviar evento view_item_list al cargar productos
        window.addEventListener('DOMContentLoaded', () => {
            const productCards = document.querySelectorAll('.product');
            const items = [];

            productCards.forEach(product => {
                const name = product.querySelector('h3').innerText;
                const priceText = product.querySelector('p').innerText.replace('$', '');
                const price = parseFloat(priceText);
                const id = product.getAttribute('data-id');

                items.push({
                    item_id: id,
                    item_name: name,
                    price: price,
                    quantity: 1
                });
            });

            gtag('event', 'view_item_list', {
                currency: 'USD',
                item_list_name: 'Tienda N&D Styles',
                items: items
            });
        });
