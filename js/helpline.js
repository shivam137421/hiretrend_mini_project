// Helpline and FAQ functions

// Function to get FAQ data (using dummy data)
function getFAQs() {
    return [
        {
            id: 1,
            question: "How to apply for companies?",
            answer: "To apply for companies, browse the available companies on your dashboard. You can filter companies based on your branch and package preferences. Click on any company to view details. If you're eligible, you'll see a '✓ You are eligible!' tag. Bookmark companies you're interested in, and contact the Training & Placement Cell for the application process."
        },
        {
            id: 2,
            question: "How are recommendations generated?",
            answer: "Recommendations are generated based on your profile information including your branch, CGPA, and skills. The system matches your qualifications with company requirements. Companies that closely match your profile and for which you meet the eligibility criteria will be marked as 'Recommended for You'."
        },
        {
            id: 3,
            question: "How to upload resume?",
            answer: "To upload your resume, go to your Profile page. Scroll down to the 'Resume Upload' section. Click on the file input field, select a PDF file from your device, and then click the 'Upload Resume' button. Your resume will be saved and you'll see a confirmation message."
        },
        {
            id: 4,
            question: "Who can access admin panel?",
            answer: "Only authorized administrators can access the admin panel. The admin panel is used to manage company listings, view placement statistics, and generate reports. Students do not have access to the admin panel. If you believe you should have admin access, contact the system administrator."
        },
        {
            id: 5,
            question: "How to update my profile information?",
            answer: "To update your profile information, navigate to the 'My Profile' section from your dashboard. Here you can edit your personal details including your full name, branch, CGPA, and skills. Make sure to click 'Save Profile' after making changes to ensure your information is updated."
        },
        {
            id: 6,
            question: "What do the different interview result statuses mean?",
            answer: "In the Interviews section, you'll see three statuses: 'Selected' (green) means you've been chosen for the position; 'Rejected' (red) means you were not selected; and 'Pending' (orange) means the company is still reviewing applications or you have an upcoming interview."
        }
    ];
}

// Function to render FAQs
function renderFAQs() {
    const faqs = getFAQs();
    const container = document.getElementById('faqContainer');
    
    if (!faqs || faqs.length === 0) {
        container.innerHTML = '<p class="no-faqs">No FAQs available at the moment.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.innerHTML = `
            <div class="faq-question" data-id="${faq.id}">
                <h3>${faq.question}</h3>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer" id="faq-answer-${faq.id}">
                <p>${faq.answer}</p>
            </div>
        `;
        
        container.appendChild(faqElement);
    });
    
    // Add event listeners to FAQ questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const answer = document.getElementById(`faq-answer-${id}`);
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer) {
                    otherAnswer.classList.remove('open');
                }
            });
            
            document.querySelectorAll('.faq-toggle').forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.textContent = '+';
                }
            });
            
            // Toggle current FAQ answer
            answer.classList.toggle('open');
            toggle.textContent = answer.classList.contains('open') ? '-' : '+';
        });
    });
}

// Initialize helpline page
function initHelplinePage() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Render FAQs
    renderFAQs();
    
    // Add event listener to back button
    document.getElementById('helplineBackBtn').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHelplinePage();
});