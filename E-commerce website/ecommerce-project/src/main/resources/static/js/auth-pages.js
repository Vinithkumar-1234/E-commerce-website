/**
 * Login and signup page handlers.
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const result = Auth.login(loginForm.email.value, loginForm.password.value);
        if (result.success) {
            showToast('Welcome back, ' + result.user.name + '!');
            setTimeout(() => window.location.href = '/index.html', 1000);
        } else {
            showToast(result.message, 'error');
        }
    });

    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (signupForm.password.value !== signupForm.confirmPassword.value) {
            showToast('Passwords do not match', 'error');
            return;
        }
        const result = Auth.signup(signupForm.name.value, signupForm.email.value, signupForm.password.value);
        if (result.success) {
            showToast('Account created! Welcome, ' + result.user.name + '!');
            setTimeout(() => window.location.href = '/index.html', 1000);
        } else {
            showToast(result.message, 'error');
        }
    });
});
