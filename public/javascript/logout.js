// logout.js

// Logout function
function logout() {
    fetch('/api/routeLogout', { method: 'POST' })
        .then(() => {
            window.location.href = '/login';
        })
        .catch((error) => console.error('Erro ao sair:', error));
}
