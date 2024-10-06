document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Save the credentials in localStorage
    let savedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
    savedCredentials.push({ username: username, password: password });
    localStorage.setItem('credentials', JSON.stringify(savedCredentials));

    // Clear the form inputs
    document.getElementById('passwordForm').reset();

    // Display saved credentials
    displaySavedCredentials();
});

function displaySavedCredentials() {
    const savedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
    const credentialsDiv = document.getElementById('savedCredentials');
    credentialsDiv.innerHTML = ''; // Clear previous content

    savedCredentials.forEach((cred, index) => {
        const p = document.createElement('p');
        p.className = 'credential-item';  // Add class for transition delay

        // Create a span to display asterisks for the password
        const passwordSpan = document.createElement('span');
        passwordSpan.textContent = '*'.repeat(cred.password.length);

        // Create a "View" button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.className = 'view-btn';
        viewButton.addEventListener('click', function() {
            if (passwordSpan.textContent === '*'.repeat(cred.password.length)) {
                passwordSpan.textContent = cred.password; // Show actual password
                viewButton.textContent = 'Hide';
            } else {
                passwordSpan.textContent = '*'.repeat(cred.password.length); // Hide password
                viewButton.textContent = 'View';
            }
        });

        // Display username and password (hidden by default)
        p.textContent = `Username: ${cred.username}, Password: `;
        p.appendChild(passwordSpan);
        p.appendChild(viewButton);

        credentialsDiv.appendChild(p);
    });
}

// Initial call to display saved credentials when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displaySavedCredentials();

    // Add transition delay for content to show up smoothly
    const credentialItems = document.querySelectorAll('.credential-item');
    credentialItems.forEach(item => {
        item.style.transition = 'opacity 1ms ease-in-out';
        item.style.opacity = 0;

        setTimeout(() => {
            item.style.opacity = 1;
        }, 1);
    });
});
