/**
 * Wishlist page logic.
 */
const DV = String.fromCharCode(100, 105, 118);

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
});

function renderWishlist() {
    const items = Wishlist.getItems();
    const grid = document.getElementById('wishlist-grid');
    const empty = document.getElementById('wishlist-empty');
    const content = document.getElementById('wishlist-content');

    if (items.length === 0) {
        if (empty) empty.style.display = 'block';
        if (content) content.style.display = 'none';
        return;
    }

    if (empty) empty.style.display = 'none';
    if (content) content.style.display = 'block';

    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(buildWishlistCard(item)));
}

function buildWishlistCard(item) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const imageWrap = document.createElement(DV);
    imageWrap.className = 'product-card-image';
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;
    imageWrap.appendChild(img);

    const body = document.createElement(DV);
    body.className = 'product-card-body';
    body.innerHTML = '<h3>' + item.name + '</h3><p class="price">' + formatPrice(item.price) + '</p><p class="description">' + truncateText(item.description) + '</p>';

    const actions = document.createElement(DV);
    actions.className = 'product-card-actions';

    const viewLink = document.createElement('a');
    viewLink.href = '/product-details.html?id=' + item.id;
    viewLink.className = 'btn btn-outline';
    viewLink.textContent = 'View Details';

    const cartBtn = document.createElement('button');
    cartBtn.className = 'btn btn-primary';
    cartBtn.textContent = 'Add to Cart';
    cartBtn.addEventListener('click', () => {
        Cart.addItem(item);
        showToast(item.name + ' added to cart!');
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        Wishlist.removeItem(item.id);
        showToast('Removed from wishlist');
        renderWishlist();
    });

    actions.append(viewLink, cartBtn, removeBtn);
    body.appendChild(actions);
    card.append(imageWrap, body);
    return card;
}
