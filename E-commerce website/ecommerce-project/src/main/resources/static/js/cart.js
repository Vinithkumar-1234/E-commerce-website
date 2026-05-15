/**
 * Cart module - manages shopping cart with LocalStorage persistence.
 */
const Cart = {
    STORAGE_KEY: 'ecommerce_cart',

    getItems() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateCartCount();
    },

    addItem(product, quantity = 1) {
        const items = this.getItems();
        const existing = items.find(item => item.id === product.id);

        if (existing) {
            existing.quantity = Math.min(existing.quantity + quantity, product.stockQuantity || 99);
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                imageUrl: product.imageUrl,
                quantity: quantity,
                stockQuantity: product.stockQuantity
            });
        }

        this.saveItems(items);
        return items;
    },

    updateQuantity(productId, quantity) {
        const items = this.getItems();
        const item = items.find(i => i.id === productId);

        if (item) {
            if (quantity <= 0) {
                return this.removeItem(productId);
            }
            item.quantity = Math.min(quantity, item.stockQuantity || 99);
            this.saveItems(items);
        }
        return items;
    },

    removeItem(productId) {
        const items = this.getItems().filter(item => item.id !== productId);
        this.saveItems(items);
        return items;
    },

    clearCart() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateCartCount();
    },

    getTotalItems() {
        return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice() {
        return this.getItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getTotalItems();
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }
};
