// Admin login functions

// Function to authenticate admin
function authenticateAdmin(email, password) {
    // Hardcoded admin credentials
    const adminEmail = "sy6220639@gmail.com";
    const adminPassword = "Shivam12";
    
    if (email === adminEmail && password === adminPassword) {
        // Set admin session
        localStorage.setItem('adminSession', JSON.stringify({ authenticated: true, role: "admin" }));
        return true;
    }
    return false;
}

// Function to handle admin login
function handleAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            
            // Authenticate admin
            if (authenticateAdmin(email, password)) {
                showNotification('Login successful!', 'success');
                // Redirect to admin panel
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            } else {
                // Check if it's a student trying to access admin
                try {
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const user = users.find(u => u.email === email && u.password === password);
                    
                    if (user) {
                        // Student trying to access admin panel
                        showNotification('Students cannot access the admin panel!', 'error');
                    } else {
                        // Invalid credentials
                        showNotification('Invalid email or password!', 'error');
                    }
                } catch (error) {
                    showNotification('Invalid email or password!', 'error');
                }
            }
        });
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleAdminLogin();
});