// Authentication functions

// Function to get users from localStorage or use dummy data
function getUsers() {
    const usersData = localStorage.getItem('users');
    if (usersData) {
        return JSON.parse(usersData);
    }
    // Return dummy data if no users in localStorage
    return [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            branch: "CSE",
            cgpa: 8.5
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            password: "password456",
            branch: "ECE",
            cgpa: 7.2
        }
    ];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to get current user
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Function to set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Function to clear current user (logout)
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Function to register a new user
function registerUser(name, email, password, branch, cgpa) {
    // Get existing users
    const users = getUsers();
    
    // Check if user with same email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    
    // Create new user object
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: name,
        email: email,
        password: password, // In a real app, this should be hashed
        branch: branch,
        cgpa: parseFloat(cgpa)
    };
    
    // Add new user to users array
    users.push(newUser);
    
    // Save updated users to localStorage
    saveUsers(users);
    
    // Initialize profile for the new user
    const profile = {
        fullName: name,
        branch: branch,
        cgpa: parseFloat(cgpa),
        skills: '',
        resume: ''
    };
    localStorage.setItem(`profile_${email}`, JSON.stringify(profile));
    
    return newUser;
}

// Function to authenticate user
function loginUser(email, password) {
    // Get users
    const users = getUsers();
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Set as current user
        setCurrentUser(user);
        
        // Initialize profile if it doesn't exist
        const profileData = localStorage.getItem(`profile_${email}`);
        if (!profileData) {
            const profile = {
                fullName: user.name,
                branch: user.branch,
                cgpa: user.cgpa,
                skills: '',
                resume: ''
            };
            localStorage.setItem(`profile_${email}`, JSON.stringify(profile));
        }
        
        return user;
    } else {
        throw new Error("Invalid email or password");
    }
}

// Function to logout user
function logoutUser() {
    clearCurrentUser();
    window.location.href = 'login.html';
}

// DOMContentLoaded event for register page
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const branch = document.getElementById('branch').value;
        const cgpa = document.getElementById('cgpa').value;
        
        try {
            // Register user
            const user = registerUser(name, email, password, branch, cgpa);
            
            // Show success message
            const alertDiv = document.getElementById('alert');
            alertDiv.className = 'alert';
            alertDiv.textContent = 'Registration successful! Redirecting to login...';
            alertDiv.style.display = 'block';
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            // Show error message
            const alertDiv = document.getElementById('alert');
            alertDiv.className = 'alert alert-error';
            alertDiv.textContent = error.message;
            alertDiv.style.display = 'block';
        }
    });
}

// DOMContentLoaded event for login page
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Login user
            const user = loginUser(email, password);
            
            // Show success message
            const alertDiv = document.getElementById('alert');
            alertDiv.className = 'alert';
            alertDiv.textContent = 'Login successful! Redirecting to dashboard...';
            alertDiv.style.display = 'block';
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } catch (error) {
            // Show error message
            const alertDiv = document.getElementById('alert');
            alertDiv.className = 'alert alert-error';
            alertDiv.textContent = error.message;
            alertDiv.style.display = 'block';
        }
    });
}

// Check if user is logged in on pages that require authentication
function checkAuth() {
    const publicPages = ['index.html', 'login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // If not on a public page and user is not logged in, redirect to login
    if (!publicPages.includes(currentPage)) {
        // Check if this is the admin page
        if (currentPage === 'admin.html') {
            // Check if admin is logged in
            const adminSession = localStorage.getItem('adminSession');
            if (adminSession) {
                const session = JSON.parse(adminSession);
                if (session.authenticated === true && session.role === "admin") {
                    // Admin is logged in, allow access
                    return;
                }
            }
            // Not an admin, redirect to login
            window.location.href = 'login.html';
            return;
        }
        
        // For other pages, check if student is logged in
        if (!getCurrentUser()) {
            window.location.href = 'login.html';
        }
    }
}

// Run auth check when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});