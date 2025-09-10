// SERVER-SIDE JAVASCRIPT (SECURE - RUNS ON THE NODE.JS SERVER)
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// The REAL secret is safely stored on the server
const SERVER_SECRET_PASSWORD = "never_trust_the_client";
const SERVER_SECRET_MESSAGE = "The nuclear codes are: 123456... jk, but this is from the server!";

// Middleware to parse JSON bodies sent by the client
app.use(express.json());

// Serve static files (our index.html and client-side.js)
app.use(express.static(__dirname));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔐 THE SECURE API ENDPOINT
// This is where the real authentication happens.
app.post('/get-secret', (req, res) => {
    const { password } = req.body; // Get password from the request body

    console.log(`Server received request with password: "${password}"`);

    // 1. Check if password was even provided
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    // 2. SERVER-SIDE VALIDATION (This cannot be bypassed by the user)
    if (password === SERVER_SECRET_PASSWORD) {
    // 3. Only send the secret if the password is correct
        res.json({ secret: SERVER_SECRET_MESSAGE });
    } else {
    // 4. Send a generic error message. Don't hint what was wrong.
        res.status(401).json({ error: 'Invalid credentials. Access denied.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n🔒 Server is running on http://localhost:${PORT}`);
    console.log("👀 Watch the console to see incoming passwords from clients!");
    console.log("\n👉 Try these attacks:");
    console.log("   1. Log in with the correct password: 'opensesame'");
    console.log("   2. View the page source to find the client-side password.");
    console.log("   3. Type `bypassLogin()` in the browser console.");
    console.log("   4. Notice the server still protects the real secret!\n");
});