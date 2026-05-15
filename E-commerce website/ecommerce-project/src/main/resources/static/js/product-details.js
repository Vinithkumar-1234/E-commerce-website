/**
 * Product details page logic.
 */
let currentProduct = null;
let quantity = 1;

const TAG = 'div';

document.addEventListener('DOMContentLoaded', async () => {
    const productId = getUrlParam('id');
    if (!productId) {
        window.location.href = '/index.html';
        return;
    }
    await loadProductDetails(productId);
});

async function loadProductDetails(id) {
    const container = document.getElementById('product-details-container');
    const loading = document.getElementById('loading');

    try {
        currentProduct = await API.getProductById(id);
        if (loading) loading.style.display = 'none';
        renderProductDetails(currentProduct);
    } catch (error) {
        if (container) {
            container.innerHTML = '';
            const empty = document.createElement('section');
            empty.className = 'empty-state';
            empty.innerHTML = '<p class="icon">😕</p><h3>Product not found</h3>';
            const link = document.createElement('a');
            link.href = '/index.html';
            link.className = 'btn btn-primary';
            link.textContent = 'Back to Products';
            empty.appendChild(link);
            container.appendChild(empty);
        }
    }
}

function renderProductDetails(product) {
    const container = document.getElementById('product-details-container');
    const stock = getStockStatus(product.stockQuantity);
    const inWishlist = Wishlist.isInWishlist(product.id);

    container.innerHTML = '';
    const section = document.createElement('section');
    section.className = 'product-details';

    const imageCol = document.createElement(TAG);
    imageCol.className = 'product-details-image';
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.onerror = function () { this.src = 'https://via.placeholder.com/600x600?text=No+Image'; };
    imageCol.appendChild(img);

    const infoCol = document.createElement(TAG);
    infoCol.className = 'product-details-info';
    infoCol.innerHTML = [
        '<span class="category">' + product.category + '</span>',
        '<h1>' + product.name + '</h1>',
        '<p class="price">' + formatPrice(product.price) + '</p>',
        '<span class="stock-status ' + stock.class + '">● ' + stock.text + '</span>',
        '<p class="full-description">' + product.description + '</p>'
    ].join('');

    const qtyRow = document.createElement(TAG);
    qtyRow.className = 'quantity-selector';
    qtyRow.innerHTML = '<label for="quantity">Quantity:</label>';

    const qtyControls = document.createElement(TAG);
    qtyControls.className = 'quantity-controls';
    qtyControls.innerHTML = [
        '<button type="button" id="qty-decrease">−</button>',
        '<input type="number" id="quantity" value="1" min="1" max="' + product.stockQuantity + '">',
        '<button type="button" id="qty-increase">+</button>'
    ].join('');
    qtyRow.appendChild(qtyControls);

    const actions = document.createElement(TAG);
    actions.className = 'detail-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-primary btn-lg';
    addBtn.id = 'add-to-cart-btn';
    addBtn.textContent = 'Add to Cart';
    addBtn.disabled = product.stockQuantity <= 0;

    const wishBtn = document.createElement('button');
    wishBtn.className = 'btn btn-outline btn-lg';
    wishBtn.id = 'wishlist-btn';
    wishBtn.textContent = inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist';

    const backLink = document.createElement('a');
    backLink.href = '/index.html';
    backLink.className = 'btn btn-secondary btn-lg';
    backLink.textContent = '← Back to Products';

    actions.append(addBtn, wishBtn, backLink);
    infoCol.append(qtyRow, actions);
    section.append(imageCol, infoCol);
    container.appendChild(section);

    setupDetailActions();
}

function setupDetailActions() {
    document.getElementById('qty-decrease')?.addEventListener('click', () => updateQuantity(-1));
    document.getElementById('qty-increase')?.addEventListener('click', () => updateQuantity(1));
    document.getElementById('quantity')?.addEventListener('change', (e) => {
        quantity = Math.max(1, Math.min(parseInt(e.target.value) || 1, currentProduct?.stockQuantity || 1));
        e.target.value = quantity;
    });

    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
        if (currentProduct) {
            Cart.addItem(currentProduct, quantity);
            showToast(currentProduct.name + ' (x' + quantity + ') added to cart!');
        }
    });

    document.getElementById('wishlist-btn')?.addEventListener('click', () => {
        if (currentProduct) {
            const added = Wishlist.toggleItem(currentProduct);
            document.getElementById('wishlist-btn').textContent = added ? '❤️ In Wishlist' : '🤍 Add to Wishlist';
            showToast(added ? 'Added to wishlist!' : 'Removed from wishlist');
        }
    });
}

function updateQuantity(delta) {
    const input = document.getElementById('quantity');
    const max = currentProduct?.stockQuantity || 1;
    quantity = Math.max(1, Math.min(quantity + delta, max));
    if (input) input.value = quantity;
}
