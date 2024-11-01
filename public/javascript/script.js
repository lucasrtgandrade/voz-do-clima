document.addEventListener("DOMContentLoaded", () => {
    const cadastro = document.querySelector('#cadastro');

    cadastro.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get values
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Objeto para armazenar os dados
        const cadastroDados = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha
        }

        // Chamada API usando fetch()
        try {
            const response = await fetch('/api/cadastro', {
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
                window.location.href = '../cadastro.html';
            } else {
                alert(`Erro: ${resultado.message}`);
            }
        } catch (error) {
            console.log ("Erro:", error);
            alert("Ocorreu um erro");
        }
    });
});