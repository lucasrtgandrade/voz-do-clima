document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Object for sending data
        const loginData = {
            email: email,
            password: password
        };

        // API call using fetch()
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Login successful');
                alert('Welcome!');
                // Redirect or set a token in local storage/session storage
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        }
    });
});
