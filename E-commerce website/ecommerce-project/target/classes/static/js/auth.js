/**
 * Auth module - mock session-based authentication using sessionStorage.
 */
const Auth = {
    SESSION_KEY: 'ecommerce_user',

    getUser() {
        const data = sessionStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    isLoggedIn() {
        return this.getUser() !== null;
    },

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const sessionUser = { name: user.name, email: user.email };
            sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }
        return { success: false, message: 'Invalid email or password' };
    },

    signup(name, email, password) {
        const users = JSON.parse(localStorage.getItem('ecommerce_users') || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        users.push({ name, email, password });
        localStorage.setItem('ecommerce_users', JSON.stringify(users));

        const sessionUser = { name, email };
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
        return { success: true, user: sessionUser };
    },

    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
    },

    updateNavAuth() {
        const user = this.getUser();
        const loginLink = document.getElementById('nav-login');
        const userInfo = document.getElementById('nav-user');

        if (loginLink && userInfo) {
            if (user) {
                loginLink.style.display = 'none';
                userInfo.style.display = 'flex';
                userInfo.innerHTML = '<span>Hi, ' + user.name.split(' ')[0] + '</span> ' +
                    '<button class="btn btn-sm btn-secondary" onclick="Auth.logout(); location.reload();">Logout</button>';
            } else {
                loginLink.style.display = 'list-item';
                userInfo.style.display = 'none';
            }
        }
    }
};
