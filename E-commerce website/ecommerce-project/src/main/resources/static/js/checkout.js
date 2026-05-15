/**
 * Checkout page - form validation and order simulation.
 */
document.addEventListener('DOMContentLoaded', () => {
    const items = Cart.getItems();
    if (items.length === 0) {
        window.location.href = '/cart.html';
        return;
    }
    renderOrderSummary(items);
    setupFormValidation();
});

function renderOrderSummary(items) {
    const list = document.getElementById('order-items');
    const totalEl = document.getElementById('order-total');

    if (list) {
        list.innerHTML = items.map(item =>
            '<p><span>' + item.name + ' x' + item.quantity + '</span><span>' + formatPrice(item.price * item.quantity) + '</span></p>'
        ).join('');
    }

    if (totalEl) {
        totalEl.textContent = formatPrice(Cart.getTotalPrice());
    }
}

function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            placeOrder();
        }
    });

    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
}

function validateField(field) {
    const errorEl = document.getElementById(field.id + '-error');
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        message = 'This field is required';
    } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        message = 'Enter a valid email address';
    } else if (field.id === 'phone' && field.value && !/^[0-9+\-\s()]{10,15}$/.test(field.value)) {
        message = 'Enter a valid phone number';
    } else if (field.id === 'pincode' && field.value && !/^[0-9]{5,6}$/.test(field.value)) {
        message = 'Enter a valid pincode (5-6 digits)';
    }

    field.classList.toggle('error', !!message);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.toggle('show', !!message);
    }
    return !message;
}

function validateForm() {
    const fields = document.querySelectorAll('#checkout-form input[required], #checkout-form select[required]');
    let valid = true;
    fields.forEach(field => {
        if (!validateField(field)) valid = false;
    });
    return valid;
}

function placeOrder() {
    const form = document.getElementById('checkout-form');
    const paymentMethod = form.paymentMethod.value;
    const orderId = generateOrderId();

    const order = {
        orderId,
        date: new Date().toISOString(),
        customer: {
            fullName: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            city: form.city.value,
            pincode: form.pincode.value
        },
        paymentMethod,
        items: Cart.getItems(),
        total: Cart.getTotalPrice()
    };

    const orders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
    orders.push(order);
    localStorage.setItem('ecommerce_orders', JSON.stringify(orders));

    Cart.clearCart();
    showOrderConfirmation(orderId, paymentMethod);
}

function showOrderConfirmation(orderId, paymentMethod) {
    const formSection = document.getElementById('checkout-section');
    const confirmSection = document.getElementById('order-confirmation');

    if (formSection) formSection.style.display = 'none';
    if (confirmSection) {
        confirmSection.style.display = 'block';
        document.getElementById('confirm-order-id').textContent = orderId;
        document.getElementById('confirm-payment').textContent = paymentMethod;
    }
}
