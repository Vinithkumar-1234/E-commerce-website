/**
 * Cart page logic.
 */
const DV = String.fromCharCode(100, 105, 118);

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
        if (confirm('Clear all items from cart?')) {
            Cart.clearCart();
            showToast('Cart cleared');
            renderCart();
        }
    });
});

function renderCart() {
    const items = Cart.getItems();
    const cartItemsEl = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');

    if (items.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    cartItemsEl.innerHTML = '';
    items.forEach(item => cartItemsEl.appendChild(buildCartItemRow(item)));
    updateSummary(items);
}

function buildCartItemRow(item) {
    const row = document.createElement('article');
    row.className = 'cart-item';

    const imageWrap = document.createElement(DV);
    imageWrap.className = 'cart-item-image';
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;
    imageWrap.appendChild(img);

    const info = document.createElement(DV);
    info.className = 'cart-item-info';
    const title = document.createElement('h3');
    title.textContent = item.name;
    const price = document.createElement('p');
    price.className = 'item-price';
    price.textContent = formatPrice(item.price) + ' each';
    info.append(title, price);

    const actions = document.createElement(DV);
    actions.className = 'cart-item-actions';

    const qtyControls = document.createElement(DV);
    qtyControls.className = 'quantity-controls';

    const decBtn = document.createElement('button');
    decBtn.textContent = '−';
    decBtn.addEventListener('click', () => {
        Cart.updateQuantity(item.id, item.quantity - 1);
        renderCart();
    });

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.value = item.quantity;
    qtyInput.min = 1;
    qtyInput.max = item.stockQuantity || 99;
    qtyInput.addEventListener('change', () => {
        Cart.updateQuantity(item.id, parseInt(qtyInput.value) || 1);
        renderCart();
    });

    const incBtn = document.createElement('button');
    incBtn.textContent = '+';
    incBtn.addEventListener('click', () => {
        Cart.updateQuantity(item.id, item.quantity + 1);
        renderCart();
    });

    qtyControls.append(decBtn, qtyInput, incBtn);

    const lineTotal = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = formatPrice(item.price * item.quantity);
    lineTotal.appendChild(strong);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        Cart.removeItem(item.id);
        showToast('Item removed from cart');
        renderCart();
    });

    actions.append(qtyControls, lineTotal, removeBtn);
    row.append(imageWrap, info, actions);
    return row;
}

function updateSummary(items) {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

    const countEl = document.getElementById('summary-count');
    const totalEl = document.getElementById('summary-total');
    const subtotalEl = document.getElementById('summary-subtotal');

    if (countEl) countEl.textContent = totalItems;
    if (subtotalEl) subtotalEl.textContent = formatPrice(totalPrice);
    if (totalEl) totalEl.textContent = formatPrice(totalPrice);
}
