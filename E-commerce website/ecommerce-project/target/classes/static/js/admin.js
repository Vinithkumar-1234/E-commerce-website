/**
 * Admin panel - CRUD operations for products.
 */
let editingProductId = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadAdminProducts();
    setupModal();
    document.getElementById('add-product-btn')?.addEventListener('click', () => openModal());
});

async function loadAdminProducts() {
    const tbody = document.getElementById('admin-products-body');
    const loading = document.getElementById('loading');

    try {
        const products = await API.getAllProducts();
        if (loading) loading.style.display = 'none';

        tbody.innerHTML = products.map(p => [
            '<tr>',
            '<td><img class="product-thumb" src="' + p.imageUrl + '" alt="' + p.name + '"></td>',
            '<td>' + p.name + '</td>',
            '<td>' + p.category + '</td>',
            '<td>' + formatPrice(p.price) + '</td>',
            '<td>' + p.stockQuantity + '</td>',
            '<td>',
            '<button class="btn btn-sm btn-outline edit-btn" data-id="' + p.id + '">Edit</button> ',
            '<button class="btn btn-sm btn-danger delete-btn" data-id="' + p.id + '">Delete</button>',
            '</td>',
            '</tr>'
        ].join('')).join('');

        attachAdminEvents(products);
    } catch (error) {
        if (loading) loading.textContent = 'Failed to load products';
    }
}

function attachAdminEvents(products) {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = products.find(p => p.id == btn.dataset.id);
            if (product) openModal(product);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Delete this product?')) {
                try {
                    await API.deleteProduct(btn.dataset.id);
                    showToast('Product deleted');
                    await loadAdminProducts();
                } catch (e) {
                    showToast('Failed to delete product', 'error');
                }
            }
        });
    });
}

function setupModal() {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');

    document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const product = {
            name: form.name.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            imageUrl: form.imageUrl.value,
            stockQuantity: parseInt(form.stockQuantity.value)
        };

        try {
            if (editingProductId) {
                await API.updateProduct(editingProductId, product);
                showToast('Product updated');
            } else {
                await API.addProduct(product);
                showToast('Product added');
            }
            closeModal();
            await loadAdminProducts();
        } catch (err) {
            showToast(err.message || 'Operation failed', 'error');
        }
    });
}

function openModal(product = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('modal-title');

    editingProductId = product ? product.id : null;
    title.textContent = product ? 'Edit Product' : 'Add New Product';

    form.name.value = product?.name || '';
    form.description.value = product?.description || '';
    form.price.value = product?.price || '';
    form.category.value = product?.category || '';
    form.imageUrl.value = product?.imageUrl || '';
    form.stockQuantity.value = product?.stockQuantity ?? '';

    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('product-modal')?.classList.remove('show');
    document.getElementById('product-form')?.reset();
    editingProductId = null;
}
