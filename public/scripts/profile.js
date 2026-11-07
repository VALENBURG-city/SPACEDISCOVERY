document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();


    document.getElementById('show-register').onclick = () => {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'flex';
    };

    document.getElementById('show-login').onclick = () => {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'flex';
    };


    document.getElementById('btn-login').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.status === 'ok') {
            checkAuthStatus();
        } else {
            alert(data.message);
        }
    };


    document.getElementById('btn-register').onclick = async () => {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (data.status === 'ok') {
            checkAuthStatus();
        } else {
            alert(data.message);
        }
    };


    document.getElementById('btn-logout').onclick = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        checkAuthStatus();
    };
});

async function checkAuthStatus() {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    if (data.status === 'ok') {

        document.getElementById('auth-forms').style.display = 'none';
        document.getElementById('profile-info').style.display = 'block';
        document.getElementById('profile-name').textContent = data.user.name;
    } else {

        document.getElementById('auth-forms').style.display = 'block';
        document.getElementById('profile-info').style.display = 'none';
        document.getElementById('login-form').style.display = 'flex';
        document.getElementById('register-form').style.display = 'none';
    }
}