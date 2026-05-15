/**
 * Utility functions used across the application.
 */

function formatPrice(price) {
    return '$' + parseFloat(price).toFixed(2);
}

function truncateText(text, maxLength = 80) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getStockStatus(quantity) {
    if (quantity <= 0) return { class: 'out-of-stock', text: 'Out of Stock' };
    if (quantity <= 10) return { class: 'low-stock', text: `Only ${quantity} left` };
    return { class: 'in-stock', text: 'In Stock' };
}

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

function initNavbar() {
    Cart.updateCartCount();
    Wishlist.updateWishlistCount();
    Auth.updateNavAuth();
    setupMobileMenu();
}

document.addEventListener('DOMContentLoaded', initNavbar);
