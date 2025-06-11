// Función para extraer datos del producto
function getProductData(productElement) {
    return {
        id: productElement.getAttribute('data-id'),
        name: productElement.querySelector('h3').textContent,
        price: parseFloat(productElement.querySelector('p').textContent.replace(/[^\d.]/g, ''))
    };
}

// Manejador del carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        if (!productElement) return;

        const product = getProductData(productElement);
        
        // Validación de precio
        if (isNaN(product.price)) {
            console.error('Precio inválido en:', productElement);
            return;
        }

        // Añadir al carrito
        cart.push(product);
        updateCartCount();
        
        // Enviar a GA4
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
        
        console.log('Producto añadido:', product); // Depuración
        alert(`✅ ${product.name} añadido al carrito`);
    });
});

// Función de compra (mejorada)
function completePurchase() {
    if (cart.length === 0) {
        alert('🛒 Tu carrito está vacío');
        return;
    }

    const transactionId = 'T-' + Math.floor(Date.now() / 1000);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Enviar evento de compra
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

    alert(`🎉 Compra exitosa! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCartCount();
}