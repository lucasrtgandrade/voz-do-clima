document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#loginForm');

    // Get feedback elements for live validation
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const emailFeedback = emailInput.nextElementSibling;
    const senhaFeedback = senhaInput.nextElementSibling;

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Live validation for Email
    emailInput.addEventListener('input', () => {
        if (!emailPattern.test(emailInput.value)) {
            emailFeedback.textContent = 'Digite um e-mail válido.';
            emailFeedback.style.color = 'red';
        } else {
            emailFeedback.textContent = '';
        }
    });

    // Live validation for Senha (Password)
    senhaInput.addEventListener('input', () => {
        if (senhaInput.value.trim().length < 6) {
            senhaFeedback.textContent = '';
            senhaFeedback.style.color = 'red';
        } else {
            senhaFeedback.textContent = '';
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Check validity of each field
        const emailValid = emailPattern.test(emailInput.value);
        const senhaValid = senhaInput.value.trim().length >= 6;

        if (!emailValid || !senhaValid) {
            alert("Por favor, corrija os erros antes de enviar.");
            return;
        }

        // Get values
        const email = emailInput.value;
        const senha = senhaInput.value;

        // Object for sending data
        const dadosLogin = {
            email: email,
            senha: senha
        };

        // API call using fetch()
        try {
            const response = await fetch('/api/routeLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            });

            if(response.ok) {
                window.location.href = "/home-user";
            } else {
                const result = await response.json();
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocorreu um erro");
        }
    });
});
