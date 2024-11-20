document.addEventListener("DOMContentLoaded", () => {
    // Live validation for Nome
    const nome = document.getElementById('nome');
    const nomeFeedback = nome.nextElementSibling;
    nome.addEventListener('input', () => {
        if (nome.value.trim().length < 2) {
            nomeFeedback.textContent = 'O nome deve ter pelo menos 2 caracteres.';
            nomeFeedback.style.color = 'red';
        } else {
            nomeFeedback.textContent = 'Nome válido!';
            nomeFeedback.style.color = 'green';
        }
    });

    // Live validation for Sobrenome
    const sobrenome = document.getElementById('sobrenome');
    const sobrenomeFeedback = sobrenome.nextElementSibling;
    sobrenome.addEventListener('input', () => {
        if (sobrenome.value.trim().length < 2) {
            sobrenomeFeedback.textContent = 'O sobrenome deve ter pelo menos 2 caracteres.';
            sobrenomeFeedback.style.color = 'red';
        } else {
            sobrenomeFeedback.textContent = 'Sobrenome válido!';
            sobrenomeFeedback.style.color = 'green';
        }
    });

    // Live validation for Email
    const email = document.getElementById('email');
    const emailFeedback = email.nextElementSibling;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    email.addEventListener('input', () => {
        if (!emailPattern.test(email.value)) {
            emailFeedback.textContent = 'Digite um e-mail válido.';
            emailFeedback.style.color = 'red';
        } else {
            emailFeedback.textContent = 'E-mail válido!';
            emailFeedback.style.color = 'green';
        }
    });

    // Live validation for Senha
    const senha = document.getElementById('senha');
    const senhaFeedback = senha.nextElementSibling;
    senha.addEventListener('input', () => {
        if (senha.value.trim().length < 6) {
            senhaFeedback.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            senhaFeedback.style.color = 'red';
        } else {
            senhaFeedback.textContent = 'Senha válida!';
            senhaFeedback.style.color = 'green';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cadastro = document.querySelector('#cadastro');

    cadastro.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Check validity of each field
        const nome = document.getElementById('nome');
        const sobrenome = document.getElementById('sobrenome');
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');

        const nomeValid = nome.value.trim().length >= 2;
        const sobrenomeValid = sobrenome.value.trim().length >= 2;
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
        const senhaValid = senha.value.trim().length >= 6;

        if (!nomeValid || !sobrenomeValid || !emailValid || !senhaValid) {
            alert("Por favor, corrija os erros antes de enviar.");
            return;
        }

        // If all validations pass, prepare data for API call
        const cadastroDados = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            email: email.value,
            senha: senha.value
        };

        try {
            const response = await fetch('/api/routeCadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cadastroDados)
            });

            const resultado = await response.json();

            if (response.ok) {
                console.log('Cadastro finalizado com sucesso');
                cadastro.reset();
                window.location.href = '/cadastro-aprovado';
            } else {
                alert(`Erro: ${resultado.message}`);
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
        }
    });
});
