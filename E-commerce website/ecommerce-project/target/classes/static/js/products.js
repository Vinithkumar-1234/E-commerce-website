/**
 * Home page - product listing, search, and filtering.
 */
let allProducts = [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupSearch();
    setupCategoryFilters();
});

async function loadProducts() {
    const loading = document.getElementById('loading');

    try {
        allProducts = await API.getAllProducts();
        if (loading) loading.style.display = 'none';
        renderProducts(allProducts);
        renderCategoryFilters();
    } catch (error) {
        if (loading) loading.innerHTML = '<p>Failed to load products. Please refresh the page.</p>';
        console.error(error);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = [
            '<section class="empty-state" style="grid-column:1/-1">',
            '<p class="icon">🔍</p>',
            '<h3>No products found</h3>',
            '<p>Try a different search term or category.</p>',
            '</section>'
        ].join('');
        return;
    }

    grid.innerHTML = products.map(product => createProductCard(product)).join('');
    attachProductCardEvents(products);
}

function createProductCard(product) {
    const inWishlist = Wishlist.isInWishlist(product.id);

    return [
        '<article class="product-card" data-id="' + product.id + '">',
        '<div class="product-card-image">',
        '<img src="' + product.imageUrl + '" alt="' + product.name + '" loading="lazy"',
        ' onerror="this.src=\'https://via.placeholder.com/400x400?text=No+Image\'">',
        '<span class="product-card-badge">' + product.category + '</span>',
        '<button class="btn-wishlist ' + (inWishlist ? 'active' : '') + '" data-id="' + product.id + '" title="Add to wishlist">',
        (inWishlist ? '❤️' : '🤍'),
        '</button>',
        '</div>',
        '<' + 'div class="product-card-body">',
        '<h3>' + product.name + '</h3>',
        '<p class="price">' + formatPrice(product.price) + '</p>',
        '<p class="description">' + truncateText(product.description) + '</p>',
        '<div class="product-card-actions">',
        '<a href="/product-details.html?id=' + product.id + '" class="btn btn-outline">View Details</a>',
        '<button class="btn btn-primary add-to-cart-btn" data-id="' + product.id + '"',
        (product.stockQuantity <= 0 ? ' disabled' : '') + '>',
        (product.stockQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'),
        '</button>',
        '</div>',
        '</div>',
        '</article>'
    ].join('');
}

function attachProductCardEvents(products) {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = products.find(p => p.id == btn.dataset.id);
            if (product) {
                Cart.addItem(product);
                showToast(product.name + ' added to cart!');
            }
        });
    });

    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = products.find(p => p.id == btn.dataset.id);
            if (product) {
                const added = Wishlist.toggleItem(product);
                btn.textContent = added ? '❤️' : '🤍';
                btn.classList.toggle('active', added);
                showToast(added ? 'Added to wishlist!' : 'Removed from wishlist');
            }
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => filterProducts(e.target.value), 300);
    });
}

function filterProducts(searchTerm) {
    let filtered = [...allProducts];

    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    renderProducts(filtered);
}

function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    const categories = ['all', ...new Set(allProducts.map(p => p.category))];
    container.innerHTML = categories.map(cat =>
        '<button class="filter-tag ' + (cat === activeCategory ? 'active' : '') + '" data-category="' + cat + '">' +
        (cat === 'all' ? 'All' : cat) +
        '</button>'
    ).join('');
}

function setupCategoryFilters() {
    document.getElementById('category-filters')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            activeCategory = e.target.dataset.category;
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const searchTerm = document.getElementById('search-input')?.value || '';
            filterProducts(searchTerm);
        }
    });
}
