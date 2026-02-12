// Main dashboard functions

// Function to get companies data
function getCompanies() {
    // In a real app, this would come from an API
    return [
        {
            id: 1,
            name: "TCS",
            role: "Software Engineer",
            package: "₹ 7.5 LPA",
            cgpaCutoff: 7.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE"]
        },
        {
            id: 2,
            name: "Infosys",
            role: "Systems Engineer",
            package: "₹ 6.5 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE", "ME"]
        },
        {
            id: 3,
            name: "Wipro",
            role: "Project Engineer",
            package: "₹ 5.5 LPA",
            cgpaCutoff: 6.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE", "ME", "CE"]
        },
        {
            id: 4,
            name: "Accenture",
            role: "Associate Software Engineer",
            package: "₹ 6.0 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE"]
        },
        {
            id: 5,
            name: "Cognizant",
            role: "Programmer Analyst",
            package: "₹ 6.5 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE"]
        },
        {
            id: 6,
            name: "Capgemini",
            role: "Analyst",
            package: "₹ 7.0 LPA",
            cgpaCutoff: 7.0,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 7,
            name: "HCL Technologies",
            role: "Software Developer",
            package: "₹ 5.0 LPA",
            cgpaCutoff: 6.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE", "ME"]
        },
        {
            id: 8,
            name: "Amazon",
            role: "Software Development Engineer",
            package: "₹ 35.0 LPA",
            cgpaCutoff: 8.5,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 9,
            name: "Microsoft",
            role: "Software Engineer",
            package: "₹ 45.0 LPA",
            cgpaCutoff: 9.0,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 10,
            name: "Google",
            role: "Software Engineer",
            package: "₹ 50.0 LPA",
            cgpaCutoff: 9.2,
            eligibleBranches: ["CSE", "IT"]
        }
    ];
}

// Function to get current user
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Function to check if user is eligible for a company
function isEligible(user, company) {
    return user.cgpa >= company.cgpaCutoff && company.eligibleBranches.includes(user.branch);
}

// Function to render user info
function renderUserInfo() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userBranch').textContent = user.branch;
        document.getElementById('userCGPA').textContent = user.cgpa;
    }
}

// Function to render companies
function renderCompanies(companiesToShow) {
    const user = getCurrentUser();
    const container = document.getElementById('companiesContainer');
    
    if (!companiesToShow || companiesToShow.length === 0) {
        container.innerHTML = '<p class="no-companies">No companies found matching your criteria.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    companiesToShow.forEach(company => {
        const eligible = isEligible(user, company);
        const cardClass = eligible ? 'company-card eligible' : 'company-card';
        
        const companyCard = document.createElement('div');
        companyCard.className = cardClass;
        companyCard.innerHTML = `
            <h3 class="company-name">${company.name}</h3>
            <div class="company-details">
                <p><strong>Role:</strong> ${company.role}</p>
                <p class="package">${company.package}</p>
                <p><strong>CGPA Cutoff:</strong> ${company.cgpaCutoff}</p>
                <p><strong>Eligible Branches:</strong> ${company.eligibleBranches.join(', ')}</p>
                ${eligible ? '<p class="eligible-tag">✓ You are eligible!</p>' : ''}
            </div>
        `;
        
        container.appendChild(companyCard);
    });
}

// Function to filter companies
function filterCompanies() {
    const branchFilter = document.getElementById('branchFilter').value;
    const cgpaFilter = parseFloat(document.getElementById('cgpaFilter').value) || 0;
    
    const user = getCurrentUser();
    const allCompanies = getCompanies();
    
    const filteredCompanies = allCompanies.filter(company => {
        const branchMatch = branchFilter === 'all' || company.eligibleBranches.includes(branchFilter);
        const cgpaMatch = user.cgpa >= company.cgpaCutoff;
        return branchMatch && cgpaMatch;
    });
    
    renderCompanies(filteredCompanies);
}

// Function to populate branch filter options
function populateBranchFilter() {
    const user = getCurrentUser();
    if (!user) return;
    
    const branchFilter = document.getElementById('branchFilter');
    branchFilter.innerHTML = '';
    
    // Add "All Branches" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Branches';
    branchFilter.appendChild(allOption);
    
    // Add user's branch
    const userBranchOption = document.createElement('option');
    userBranchOption.value = user.branch;
    userBranchOption.textContent = user.branch;
    branchFilter.appendChild(userBranchOption);
    
    // Add other branches from companies
    const allCompanies = getCompanies();
    const allBranches = [...new Set(allCompanies.flatMap(company => company.eligibleBranches))];
    
    allBranches.forEach(branch => {
        if (branch !== user.branch) {
            const option = document.createElement('option');
            option.value = branch;
            option.textContent = branch;
            branchFilter.appendChild(option);
        }
    });
}

// Initialize dashboard
function initDashboard() {
    const user = getCurrentUser();
    
    // If no user is logged in, redirect to login
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Render user info
    renderUserInfo();
    
    // Populate branch filter
    populateBranchFilter();
    
    // Render all companies initially
    renderCompanies(getCompanies());
    
    // Add event listeners to filters
    document.getElementById('branchFilter').addEventListener('change', filterCompanies);
    document.getElementById('cgpaFilter').addEventListener('input', filterCompanies);
    
    // Add event listener to logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the dashboard page
    if (document.getElementById('dashboard')) {
        initDashboard();
    }
});