// Function to fetch the welcome message
async function fetchWelcomeMessage() {
    try {
        const response = await fetch('/api/routeWelcome');

        if (response.ok) {
            const data = await response.json();
            document.getElementById('welcomeMessage').textContent = data.message;
        } else if (response.status === 401) {
            alert("Usuário não autenticado. Por favor, faça login novamente.");
            window.location.href = '/login';
        } else {
            console.error('Erro ao carregar a mensagem de boas-vindas');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchWelcomeMessage);
