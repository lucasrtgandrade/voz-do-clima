document.getElementById('cep').addEventListener('input', function () {
    const input = this.value.replace(/\D/g, ''); // Remove any non-digit characters
    const cepError = document.getElementById('cep-error');

    // Format input to 00000-000
    if (input.length > 5) {
        this.value = `${input.slice(0, 5)}-${input.slice(5, 8)}`;
    } else {
        this.value = input;
    }

    // Show feedback while typing
    if (input.length < 8) {
        cepError.textContent = 'Digite pelo menos 8 números.';
        cepError.style.color = 'red';
    } else {
        cepError.textContent = '';
    }
});

document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, ''); // Clean CEP input
    const cepError = document.getElementById('cep-error');

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // If CEP is found
                    document.getElementById('logradouro').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    cepError.textContent = 'CEP válido!';
                    cepError.style.color = 'green';
                } else {
                    // If CEP is not found
                    cepError.textContent = 'CEP não encontrado.';
                    cepError.style.color = 'red';
                }
            })
            .catch(() => {
                // If there is an error fetching the API
                cepError.textContent = 'Erro ao buscar o CEP.';
                cepError.style.color = 'red';
            });
    } else {
        // If input is invalid
        cepError.textContent = 'CEP inválido. Digite exatamente 8 números.';
        cepError.style.color = 'red';
    }
});


// document.getElementById('cep').addEventListener('input', function () {
//     const input = this.value.replace(/\D/g, ''); // Remove any non-digit characters
//     if (input.length > 5) {
//         this.value = `${input.slice(0, 5)}-${input.slice(5, 8)}`; // Format as 00000-000
//     } else {
//         this.value = input; // Allow typing until 5 digits
//     }
// });
//
// document.getElementById('cep').addEventListener('blur', function() {
//     const cep = this.value.replace(/\D/g, '');
//     const cepError = document.getElementById('cep-error');
//
//     if (cep.length === 8) {
//         fetch(`https://viacep.com.br/ws/${cep}/json/`)
//             .then(response => response.json())
//             .then(data => {
//                 if (!data.erro) {
//                     document.getElementById('logradouro').value = data.logradouro;
//                     document.getElementById('bairro').value = data.bairro;
//                     cepError.textContent = '';
//                 } else {
//                     cepError.textContent = 'CEP não encontrado.';
//                 }
//             })
//             .catch(() => {
//                 cepError.textContent = 'Erro ao buscar o CEP.';
//             });
//     } else {
//         cepError.textContent = 'CEP inválido.';
//     }
// });

function enviarSolicitacao() {
    // Get the feedback message div by its ID
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Display the feedback message div
    feedbackMessage.style.display = 'block';
}

// Attach the function to the button's click event
document.getElementById('enviarSolicitacao').addEventListener('click', enviarSolicitacao);
