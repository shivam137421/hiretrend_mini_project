// Dashboard functions for student features

// Function to get companies data from localStorage or use default data
function getCompanies() {
    const companiesData = localStorage.getItem('companies');
    if (companiesData) {
        return JSON.parse(companiesData);
    }
    
    // Default companies data
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
        },
        {
            id: 11,
            name: "Flipkart",
            role: "Software Engineer",
            package: "₹ 28.0 LPA",
            cgpaCutoff: 8.0,
            eligibleBranches: ["CSE", "IT", "AI-ML"]
        }
    ];
}

// Function to save companies to localStorage
function saveCompanies(companies) {
    localStorage.setItem('companies', JSON.stringify(companies));
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

// Function to get bookmarked companies
function getBookmarks() {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

// Function to save bookmarked companies
function saveBookmarks(bookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Function to toggle bookmark for a company
function toggleBookmark(companyId) {
    let bookmarks = getBookmarks();
    const index = bookmarks.indexOf(companyId);
    
    if (index === -1) {
        // Add to bookmarks
        bookmarks.push(companyId);
        showNotification('Company bookmarked successfully!', 'success');
    } else {
        // Remove from bookmarks
        bookmarks.splice(index, 1);
        showNotification('Company removed from bookmarks!', 'success');
    }
    
    saveBookmarks(bookmarks);
    renderCompanies(); // Re-render to update bookmark buttons
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
function renderCompanies(companiesToShow = null) {
    const user = getCurrentUser();
    const bookmarks = getBookmarks();
    const container = document.getElementById('companiesContainer');
    
    const companies = companiesToShow || getCompanies();
    
    if (!companies || companies.length === 0) {
        container.innerHTML = '<p class="no-companies">No companies found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    companies.forEach(company => {
        const eligible = isEligible(user, company);
        const cardClass = eligible ? 'company-card eligible' : 'company-card';
        const isBookmarked = bookmarks.includes(company.id);
        
        const companyCard = document.createElement('div');
        companyCard.className = cardClass;
        companyCard.innerHTML = `
            <h3 class="company-name">${company.name}</h3>
            <div class="company-details">
                <p><strong>Role:</strong> ${company.role}</p>
                <p class="package">${company.package}</p>
                <p><strong>CGPA Cutoff:</strong> ${company.cgpaCutoff}</p>
                <p><strong>Eligible Branches:</strong> ${company.eligibleBranches.join(', ')}</p>
                ${eligible ? '<p class="eligible-tag">✓ You are eligible!</p>' : '<p class="ineligible-tag">✖ Not eligible</p>'}
                ${checkRecommendation(user, company) ? '<p class="recommended-tag">✔ Recommended for You</p>' : ''}
                <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${company.id}">
                    ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                </button>
            </div>
        `;
        
        container.appendChild(companyCard);
    });
    
    // Add event listeners to bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(button => {
        button.addEventListener('click', function() {
            const companyId = parseInt(this.getAttribute('data-id'));
            toggleBookmark(companyId);
        });
    });
}

// Function to filter companies
function filterCompanies() {
    const branchFilter = document.getElementById('branchFilter').value;
    const minPackage = document.getElementById('minPackage').value;
    const maxPackage = document.getElementById('maxPackage').value;
    
    const user = getCurrentUser();
    const allCompanies = getCompanies();
    
    const filteredCompanies = allCompanies.filter(company => {
        // Branch filter
        const branchMatch = branchFilter === 'all' || company.eligibleBranches.includes(branchFilter);
        
        // Package filter (extract numeric value from package string)
        const packageValue = parseFloat(company.package.replace(/[^\d.]/g, ''));
        const minPackageValue = minPackage ? parseFloat(minPackage) : 0;
        const maxPackageValue = maxPackage ? parseFloat(maxPackage) : Infinity;
        const packageMatch = packageValue >= minPackageValue && packageValue <= maxPackageValue;
        
        // CGPA eligibility
        const cgpaMatch = user.cgpa >= company.cgpaCutoff;
        
        return branchMatch && packageMatch && cgpaMatch;
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

// Function to show bookmarked companies
function showBookmarks() {
    const bookmarks = getBookmarks();
    const allCompanies = getCompanies();
    
    const bookmarkedCompanies = allCompanies.filter(company => 
        bookmarks.includes(company.id)
    );
    
    renderCompanies(bookmarkedCompanies);
}

// Function to check if a company is recommended for the user
function checkRecommendation(user, company) {
    // Get user profile data
    const profileData = localStorage.getItem(`profile_${user.email}`);
    if (!profileData) return false;
    
    const profile = JSON.parse(profileData);
    
    // Recommendation logic:
    // 1. User must be eligible (branch and CGPA match)
    // 2. User's branch should match company's eligible branches
    // 3. User's CGPA should be close to company's cutoff (within 0.5)
    
    const branchMatch = company.eligibleBranches.includes(user.branch);
    const cgpaMatch = user.cgpa >= company.cgpaCutoff;
    const closeCgpa = user.cgpa >= (company.cgpaCutoff - 0.5);
    
    return branchMatch && (cgpaMatch || closeCgpa);
}

// Function to render recommended companies
function renderRecommendedCompanies() {
    const user = getCurrentUser();
    const allCompanies = getCompanies();
    
    const recommendedCompanies = allCompanies.filter(company => 
        checkRecommendation(user, company)
    );
    
    // If we have recommended companies, show them
    if (recommendedCompanies.length > 0) {
        renderCompanies(recommendedCompanies);
    } else {
        // If no recommendations, show all companies
        renderCompanies();
    }
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
    
    // Render recommended companies initially
    renderRecommendedCompanies();
    
    // Add event listeners to filters
    document.getElementById('branchFilter').addEventListener('change', filterCompanies);
    document.getElementById('minPackage').addEventListener('input', filterCompanies);
    document.getElementById('maxPackage').addEventListener('input', filterCompanies);
    
    // Add event listener to logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // Add event listener to bookmarks button
    const bookmarksBtn = document.getElementById('bookmarksBtn');
    if (bookmarksBtn) {
        bookmarksBtn.addEventListener('click', showBookmarks);
    }
    
    // Add event listener to show all button
    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
            renderCompanies();
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