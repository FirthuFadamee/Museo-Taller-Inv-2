document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const clearCartButton = document.getElementById('clear-cart');

    updateCartCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.innerText = cartItems.length;
    }

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        updateCartCount(); // Actualiza el contador de productos al vaciar el carrito
    });

    // Aquí podrías tener más funcionalidades relacionadas con el carrito
});
