let cart = [];

// Función para añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            name: button.parentElement.querySelector('h3').textContent,
            price: parseFloat(button.parentElement.querySelector('p').textContent.replace('$', ''))
        };

        cart.push(product);
        updateCartCount();
        
        // Evento GA4 para añadir al carrito (con datos REALES)
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
        
        alert(`${product.name} añadido al carrito!`);
    });
});

// Función para finalizar compra (ejecutar esto al hacer clic en "Comprar")
function completePurchase() {
    if(cart.length === 0) return;
    
    const transactionId = 'T-' + Date.now(); // ID único
    const totalValue = cart.reduce((sum, product) => sum + product.price, 0);
    
    // Evento GA4 de compra (con datos REALES)
    gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: totalValue,
        currency: 'USD',
        items: cart.map(product => ({
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: 1
        }))
    });
    
    alert(`Compra realizada por $${totalValue}! ID: ${transactionId}`);
    cart = [];
    updateCartCount();
}

// Actualizar contar
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}