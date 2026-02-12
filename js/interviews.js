// Interviews management functions

// Function to get interview data (using dummy data for now)
function getInterviews() {
    // In a real application, this would fetch from a server
    // For this demo, we'll use static dummy data
    
    return [
        {
            id: 1,
            company: "TCS",
            role: "Software Engineer",
            result: "Selected",
            date: "2024-01-10",
            mode: "Online",
            type: "Past"
        },
        {
            id: 2,
            company: "Infosys",
            role: "Systems Engineer",
            result: "Pending",
            date: "2026-01-15",
            mode: "Offline",
            type: "Upcoming"
        },
        {
            id: 3,
            company: "Wipro",
            role: "Project Engineer",
            result: "Rejected",
            date: "2023-12-20",
            mode: "Online",
            type: "Past"
        },
        {
            id: 4,
            company: "Accenture",
            role: "Associate Software Engineer",
            result: "Pending",
            date: "2026-01-20",
            mode: "Offline",
            type: "Upcoming"
        },
        {
            id: 5,
            company: "Cognizant",
            role: "Programmer Analyst",
            result: "Selected",
            date: "2023-11-25",
            mode: "Online",
            type: "Past"
        },
        {
            id: 6,
            company: "Capgemini",
            role: "Analyst",
            result: "Pending",
            date: "2026-01-25",
            mode: "Offline",
            type: "Upcoming"
        }
    ];
}

// Function to render upcoming interviews
function renderUpcomingInterviews() {
    const interviews = getInterviews().filter(interview => interview.type === "Upcoming");
    const container = document.getElementById('upcomingInterviewsContainer');
    
    if (!interviews || interviews.length === 0) {
        container.innerHTML = '<p class="no-interviews">No upcoming interviews scheduled.</p>';
        return;
    }
    
    // Sort interviews by date (soonest first)
    interviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    container.innerHTML = '';
    
    interviews.forEach(interview => {
        const interviewElement = document.createElement('div');
        interviewElement.className = 'interview-card';
        
        // Format date
        const formattedDate = new Date(interview.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        interviewElement.innerHTML = `
            <h3 class="interview-company">${interview.company}</h3>
            <div class="interview-details">
                <p><strong>Role:</strong> ${interview.role}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Mode:</strong> ${interview.mode}</p>
            </div>
        `;
        
        container.appendChild(interviewElement);
    });
}

// Function to render past interviews
function renderPastInterviews() {
    const interviews = getInterviews().filter(interview => interview.type === "Past");
    const container = document.getElementById('pastInterviewsContainer');
    
    if (!interviews || interviews.length === 0) {
        container.innerHTML = '<p class="no-interviews">No past interviews found.</p>';
        return;
    }
    
    // Sort interviews by date (newest first)
    interviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = '';
    
    interviews.forEach(interview => {
        const interviewElement = document.createElement('div');
        interviewElement.className = 'interview-card';
        
        // Format date
        const formattedDate = new Date(interview.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Determine result class
        let resultClass = '';
        if (interview.result === 'Selected') {
            resultClass = 'result-selected';
        } else if (interview.result === 'Rejected') {
            resultClass = 'result-rejected';
        } else {
            resultClass = 'result-pending';
        }
        
        interviewElement.innerHTML = `
            <h3 class="interview-company">${interview.company}</h3>
            <div class="interview-details">
                <p><strong>Role:</strong> ${interview.role}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Result:</strong> <span class="${resultClass}">${interview.result}</span></p>
            </div>
        `;
        
        container.appendChild(interviewElement);
    });
}

// Initialize interviews page
function initInterviewsPage() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Render interviews
    renderUpcomingInterviews();
    renderPastInterviews();
    
    // Add event listener to back button
    document.getElementById('interviewsBackBtn').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initInterviewsPage();
});