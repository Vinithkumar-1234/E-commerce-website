/**
 * Wishlist module - manages wishlist items with LocalStorage persistence.
 */
const Wishlist = {
    STORAGE_KEY: 'ecommerce_wishlist',

    getItems() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateWishlistCount();
    },

    addItem(product) {
        const items = this.getItems();
        if (!items.find(item => item.id === product.id)) {
            items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                imageUrl: product.imageUrl,
                category: product.category,
                description: product.description,
                stockQuantity: product.stockQuantity
            });
            this.saveItems(items);
            return true;
        }
        return false;
    },

    removeItem(productId) {
        const items = this.getItems().filter(item => item.id !== productId);
        this.saveItems(items);
    },

    isInWishlist(productId) {
        return this.getItems().some(item => item.id === productId);
    },

    toggleItem(product) {
        if (this.isInWishlist(product.id)) {
            this.removeItem(product.id);
            return false;
        }
        this.addItem(product);
        return true;
    },

    updateWishlistCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        const count = this.getItems().length;
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }
};
