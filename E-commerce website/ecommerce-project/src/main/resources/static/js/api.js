/**
 * API module - handles all REST API calls to the Spring Boot backend.
 */
const API = {
    BASE_URL: '/api/products',

    async getAllProducts() {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    async getProductById(id) {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Product not found');
        return response.json();
    },

    async searchProducts(keyword) {
        const response = await fetch(`${this.BASE_URL}?search=${encodeURIComponent(keyword)}`);
        if (!response.ok) throw new Error('Search failed');
        return response.json();
    },

    async addProduct(product) {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add product');
        }
        return response.json();
    },

    async updateProduct(id, product) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error('Failed to update product');
        return response.json();
    },

    async deleteProduct(id) {
        const response = await fetch(`${this.BASE_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete product');
        return response.json();
    }
};
