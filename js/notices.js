// Notices management functions

// Function to get notices data (using dummy data for now)
function getNotices() {
    // In a real application, this would fetch from a server
    // For this demo, we'll use static dummy data
    
    return [
        {
            id: 1,
            title: "Campus Placement Drive - TCS",
            description: "TCS is conducting campus placements for 2024 batch. Eligible students from CSE, IT, and ECE branches can participate.",
            date: "2024-01-15",
            category: "Company"
        },
        {
            id: 2,
            title: "Resume Writing Workshop",
            description: "Join our resume writing workshop conducted by industry experts on January 20th, 2024. Limited seats available.",
            date: "2024-01-10",
            category: "College"
        },
        {
            id: 3,
            title: "Internship Opportunities at Infosys",
            description: "Summer internship program for 2nd and 3rd year students. Application deadline is February 1st, 2024.",
            date: "2024-01-05",
            category: "Company"
        },
        {
            id: 4,
            title: "Aptitude Test Guidelines",
            description: "Updated guidelines for aptitude tests in placement drives. Please review the new pattern before appearing for tests.",
            date: "2023-12-28",
            category: "College"
        },
        {
            id: 5,
            title: "Google Recruitment Drive",
            description: "Google is visiting our campus for SDE positions. Pre-registration required through the portal by January 25th.",
            date: "2024-01-12",
            category: "Company"
        },
        {
            id: 6,
            title: "Group Discussion Tips Session",
            description: "Learn effective group discussion techniques in our interactive session on January 22nd, 2024.",
            date: "2024-01-08",
            category: "College"
        }
    ];
}

// Function to render notices
function renderNotices() {
    const notices = getNotices();
    const container = document.getElementById('noticesContainer');
    
    if (!notices || notices.length === 0) {
        container.innerHTML = '<p class="no-notices">No notices found.</p>';
        return;
    }
    
    // Sort notices by date (newest first)
    notices.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = '';
    
    notices.forEach(notice => {
        const noticeElement = document.createElement('div');
        noticeElement.className = 'notice-card';
        
        // Format date
        const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        noticeElement.innerHTML = `
            <div class="notice-header">
                <h3 class="notice-title">${notice.title}</h3>
                <span class="notice-category ${notice.category.toLowerCase()}">${notice.category}</span>
            </div>
            <p class="notice-description">${notice.description}</p>
            <p class="notice-date">${formattedDate}</p>
        `;
        
        container.appendChild(noticeElement);
    });
}

// Initialize notices page
function initNoticesPage() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Render notices
    renderNotices();
    
    // Add event listener to back button
    document.getElementById('noticesBackBtn').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNoticesPage();
});