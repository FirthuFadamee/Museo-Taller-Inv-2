document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');

    updateCart();

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">&times;</button>`;
            cartItemsContainer.appendChild(li);
        });
        cartTotal.innerText = total.toFixed(2);

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const productIndex = cart.findIndex(item => item.id === productId);
                if (productIndex > -1) {
                    cart.splice(productIndex, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
    }

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart.length = 0; // Limpiar el array cart localmente
        updateCart(); // Actualizar la vista del carrito vacío
    });

    // Aquí podrías tener funciones para agregar productos al carrito
    // y otras operaciones relacionadas según tu implementación.
});
