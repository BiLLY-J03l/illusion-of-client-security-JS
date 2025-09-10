// CLIENT-SIDE JAVASCRIPT (INSECURE - RUNS IN THE BROWSER)
const correctPassword = "opensesame"; // 🚨 BAD: Secret is exposed in client code!
const loginForm = document.getElementById('loginForm');
const loginPanel = document.getElementById('loginPanel');
const adminPanel = document.getElementById('adminPanel');
const loginMessage = document.getElementById('loginMessage');
const clientResult = document.getElementById('clientResult');

// Function to handle the form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the page from reloading
    const enteredPassword = document.getElementById('passwordInput').value;

    // 🚨 CLIENT-SIDE AUTHENTICATION CHECK (THIS IS THE VULNERABILITY)
    if (enteredPassword === correctPassword) {
        unlockAdminPanel();
        loginMessage.textContent = "Client: Access Granted!";
        loginMessage.style.color = "green";
    } else {
        loginMessage.textContent = "Client: Access Denied!";
        loginMessage.style.color = "red";
    }
});

// Function to "unlock" the admin panel on the client side
function unlockAdminPanel() {
    loginPanel.style.display = 'none';
    adminPanel.style.display = 'block';
    clientResult.textContent = "✅ Granted via Client";
    clientResult.style.color = "green";
}

// Function to ask the server for the real secret (demonstrates server-side security)
// async makes the function return a promise
async function fetchServerSecret() {
    const enteredPassword = document.getElementById('passwordInput').value; 
    // In a real bypass, this field might be empty. We send whatever we have.

    try {
        const response = await fetch('/get-secret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: enteredPassword })
        });

        const data = await response.json();
        const serverResultElement = document.getElementById('serverResult');

        if (response.ok) {
            serverResultElement.textContent = `✅ ${data.secret}`;
            serverResultElement.style.color = "green";
        } else {
            serverResultElement.textContent = `❌ ${data.error}`;
            serverResultElement.style.color = "red";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('serverResult').textContent = "Failed to contact server.";
    }
}

// 🚨 EASY BYPASS: Let's also just expose a global function to make bypassing trivial.
// A hacker can just type this in the console to unlock the panel!
window.bypassLogin = function() {
    console.log("Bypassing client-side login...");
    unlockAdminPanel();
    loginMessage.textContent = "Bypassed via Console!";
};