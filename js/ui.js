// UI functions for animations, theme, and notifications

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        // Remove from DOM after transition
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    // Save theme preference to localStorage
    const isLightTheme = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    
    // Update theme toggle button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = isLightTheme ? '🌙' : '☀️';
    }
}

// Function to load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }
    
    // Update theme toggle button icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
    }
}

// Function to initialize theme toggle
function initThemeToggle() {
    // Load saved theme
    loadSavedTheme();
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Add to body
    document.body.appendChild(themeToggle);
    
    // Add event listener
    themeToggle.addEventListener('click', toggleTheme);
}

// Function to initialize reports page
function initReportsPage() {
    // Add event listener to back button
    const backBtn = document.getElementById('reportsBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }
    
    // Add event listeners to download buttons
    const downloadButtons = document.querySelectorAll('.report-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Report downloaded successfully!', 'success');
        });
    });
}

// Function to initialize statistics page
function initStatisticsPage() {
    // Add event listener to back button
    const backBtn = document.getElementById('statsBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }
}

// Function to initialize UI components
function initUI() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize reports page if on reports page
    if (document.getElementById('reportsPage')) {
        initReportsPage();
    }
    
    // Initialize statistics page if on statistics page
    if (document.getElementById('statisticsPage')) {
        initStatisticsPage();
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initUI();
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showNotification, toggleTheme, loadSavedTheme };
}