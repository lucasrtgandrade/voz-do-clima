// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user in the "database"
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});