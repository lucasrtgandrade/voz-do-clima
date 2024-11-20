document.getElementById('numero').addEventListener('input', function () {
    const numeroError = document.getElementById('numero-error');
    const input = this.value.replace(/\D/g, ''); // Remove non-numeric characters
    this.value = input; // Update input value with only numbers

    // Provide immediate feedback
    if (input === '') {
        numeroError.textContent = 'Por favor, digite o número.';
        numeroError.style.color = 'red';
    } else {
        numeroError.textContent = '';
    }
});

document.getElementById('numero').addEventListener('blur', function () {
    const numeroError = document.getElementById('numero-error');
    const input = this.value;

    if (input === '') {
        // Show feedback if the field is empty
        numeroError.textContent = 'Este campo é obrigatório.';
        numeroError.style.color = 'red';
    } else {
        // Show success feedback
        numeroError.textContent = 'Número válido!';
        numeroError.style.color = 'green';
    }
});
